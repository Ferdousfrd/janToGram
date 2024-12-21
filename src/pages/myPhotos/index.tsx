import Layout from "@/components/layout";
import * as React from "react";

interface IMyPhotosProps {
  // Add props here if needed
}

const MyPhotos: React.FunctionComponent<IMyPhotosProps> = (props) => {
  return (
    <Layout>
      <div>MyPhotos Component</div>
    </Layout>
  );
};

export default MyPhotos;
