import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileEntry, UserProfile } from "@/types";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img3 from "@/assets/images/img3.jpg";
import { Input } from "@/components/ui/input";

interface IEditProfileProps {
  // Add props here if needed
}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, userId, userBio, displayName, photoURL } = location.state;
  const [data, setData] = React.useState<UserProfile>({
    userId,
    userBio,
    displayName,
    photoURL,
  });
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });

  const updateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Edit Profile
          </h3>
          <div className="p-8">
            <form onSubmit={updateProfile}>
              <div>
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <div className="mb-4">
                  <img
                    src={data.photoURL ? data.photoURL : img3}
                    alt="avatar"
                    className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                  />
                </div>
                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
                {/*passing some props to upload the files & get cdn links and the output of the files that are uploaded*/}
              </div>
              <div className="flex flex-col ">
                <Label className="mb-4 " htmlFor="displayName">
                  Display Name
                </Label>
                <Input
                  className="mb-8"
                  id="displayName"
                  placeholder="Enter Name"
                  value={data.displayName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, displayName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col ">
                <Label className="mb-4 " htmlFor="userBio">
                  Profile Bio
                </Label>
                <Textarea
                  className="mb-8"
                  id="userBio"
                  placeholder="What's in your mind?"
                  value={data.userBio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData({ ...data, userBio: e.target.value })
                  }
                />
              </div>

              <Button className="mt-4 w-32 mr-8" type="submit">
                Update
              </Button>
              <Button
                variant="destructive"
                className="mt-4 w-32 mr-8"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
