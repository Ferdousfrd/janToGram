import * as React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

interface IFileUploaderProps {
  // Add props here if needed
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = (props) => {
  return (
    <div>
      <FileUploaderRegular
         sourceList="local, url, camera, dropbox"
         classNameUploader="uc-light"
         pubkey="c43cf7a57c2290179887"
      />
    </div>
  );
};

export default FileUploader;