import Layout from "@/components/layout";
import * as React from "react";

interface IHomeProps {
  // Add props here if needed
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
};

export default Home;
