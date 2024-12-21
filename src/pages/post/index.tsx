import Layout from "@/components/layout";
import * as React from "react";

interface ICreatePostProps {
  // Add props here if needed
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
  return (
    <Layout>
      <div>CreatePost Component</div>
    </Layout>
  );
};

export default CreatePost;
