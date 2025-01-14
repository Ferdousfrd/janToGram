import * as React from "react";
import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";
import { getAllUsers } from "@/repository/user.service";
import { ProfileResponse } from "@/types";
import { useUserAuth } from "@/context/userAuthContext";

interface IStoriesProps {
  // Add props here if needed
}

const Stories: React.FunctionComponent<IStoriesProps> = () => {
  const { user } = useUserAuth();
  const [suggestedUser, setSuggestedUser] = React.useState<ProfileResponse[]>(
    []
  );

  const getSuggestedUsers = async (userId: string) => {
    const response = (await getAllUsers(userId)) || [];
    console.log("the Suggetsed Users response is ", response);
    setSuggestedUser(response);
  };

  React.useEffect(() => {
    if (user?.uid != null) {
      getSuggestedUsers(user.uid);
    }
  }, []);

  const renderUsers = () => {
    return suggestedUser.map((item) => {
      return (
        <div className="flex flex-row items-center mb-4 border-gray-400 justify-start">
          <span className="mr-2">
            <img
              src={item?.photoURL ? item.photoURL : img1}
              className="w-20 h-20 rounded-full border-2 border-slate-800 object-cover mr-4"
            />
          </span>
        </div>
      );
    });
  };

  return <div className="flex justify-start">{renderUsers()}</div>;
};

export default Stories;
