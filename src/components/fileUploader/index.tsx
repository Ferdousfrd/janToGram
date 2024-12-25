import * as React from "react";
import {
  FileUploaderRegular,
  OutputCollectionState,
  OutputCollectionStatus,
  OutputFileEntry,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { FileEntry } from "@/types";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry,
  onChange,
}) => {
  // State to store uploaded files
  const [uploadedFiles, setUploadedFiles] = React.useState<
    OutputFileEntry<"success">[]
  >([]);

  // handle removeCLick on img
  const handleRemoveClick = React.useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
    [fileEntry.files, onChange]
  );

  // Handle file upload event
  const handleFileUpload = (
    event: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">
  ) => {
    // Get the uploaded files from the event's successEntries
    const newFiles = event.successEntries;
    console.log("Uploaded files:", newFiles);

    // Update the state with the newly uploaded files
    setUploadedFiles(newFiles);

    // Call the onChange prop function to update parent with the new files
    onChange({ files: newFiles });
  };

  // Reset uploader state after the upload process
  const resetUploaderState = () => {
    // This will reset the internal uploader state and clear files
    setUploadedFiles([]); // Clear the local state for uploaded files
  };

  // Reset uploader event (clear all files) when files are uploaded
  React.useEffect(() => {
    if (uploadedFiles.length > 0) {
      // Reset uploader state when files are uploaded
      resetUploaderState();
    }
  }, [uploadedFiles]);

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, url, camera, dropbox"
        classNameUploader="uc-light"
        pubkey="c43cf7a57c2290179887"
        multiple={true}
        confirmUpload={false}
        removeCopyright={true}
        imgOnly={true}
        onChange={handleFileUpload} // Attach the event handler here
      />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/
              `}
            />

            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800  rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
