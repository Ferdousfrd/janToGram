import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import { FileEntry, Post } from "@/types";
import * as React from "react";

interface ICreatePostProps {
  // Add props here if needed
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
  // refrence for logged in user
  const { user } = useUserAuth();
  // state for the files that we will upload to uploadcare. Initital is empty arrray
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  // post state and initial value
  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  });
  // handle submission func for the form
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("fileEntry", fileEntry);
    console.log("createPost", post);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Create Post
          </h3>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col ">
                <Label className="mb-4 " htmlFor="caption">
                  Photo Caption
                </Label>
                <Textarea
                  className="mb-8"
                  id="caption"
                  placeholder="What's in your mind?"
                  value={post.caption}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="mb-4" htmlFor="photo">
                  Photos
                </Label>
                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />{" "}
                {/*passing some props to upload the files & get cdn links and the output of the files that are uploaded*/}
              </div>
              <Button className="mt-8 w-32" type="submit">
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
