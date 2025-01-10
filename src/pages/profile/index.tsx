import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse, Post, ProfileInfo, ProfileResponse } from "@/types";
import * as React from "react";
import img3 from "@/assets/images/img3.jpg";
import { Button } from "@/components/ui/button";
import { Edit2Icon, HeartIcon } from "lucide-react";
import { getPostByUserId } from "@/repository/post.service";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/repository/user.service";

interface IProfileProps {
  // Add props here if needed
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const { user } = useUserAuth();

  const navigate = useNavigate();
  // initial user information stored in firebase data
  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    userBio: "Please update your bio...",
    photoURL: user?.photoURL ? user.photoURL : "",
    displayName: user?.displayName ? user.displayName : "Guest_User",
  };
  const [userInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);

  // getting the data for all the posts user created
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const getAllPost = async (id: string) => {
    try {
      // getting a snapshot or all the data stored in dbb by the given user id
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];

      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The reposnse is ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No fetched doc");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // rendering the posts using data
  const renderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.photos[0].uuid} className="relative">
          <div className="absolute group transition-all duration-150 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} Likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos[0].cdnUrl}/-/scale_crop/300x300/center/`}
            alt="Uploaded"
          />
        </div>
      );
    });
  };

  // getting user profile info from user collection in db
  const getUserProfileInfo = async (userId: string) => {
    const data: ProfileResponse = (await getUserProfile(userId)) || {};
    if (data.displayName) {
      setUserInfo(data);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  // editProfile func
  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex flex-row items-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo.photoURL ? userInfo.photoURL : img3}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
              <div>
                <div className="text-xl ml-3">{userInfo.displayName}</div>
                <div className="text-sm ml-3">
                  {user?.email ? user.email : ""}
                </div>
              </div>
            </div>
            <div className="mb-4">{userInfo.userBio}</div>
            <div className="">
              <Button onClick={editProfile}>
                <Edit2Icon className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            <div className="pt-8">
              <h2 className="mb-5">My Posts</h2>
              <div className=" grid grid-cols-2 md:grid-cols-3 gap-2">
                {data ? renderPost() : <div>....Loading!</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
