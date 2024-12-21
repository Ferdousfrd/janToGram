import Layout from '@/components/layout';
import * as React from 'react';

interface IProfileProps {
  // Add props here if needed
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <Layout>
      <div>Profile Component</div>
    </Layout>
  );
};

export default Profile;