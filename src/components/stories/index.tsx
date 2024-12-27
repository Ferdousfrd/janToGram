import * as React from "react";
import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";

interface IStoriesProps {
  // Add props here if needed
}

const Stories: React.FunctionComponent<IStoriesProps> = (props) => {
  return (
    <div className="flex justify-between">
      <img
        src={img1}
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={img2}
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={img3}
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
       <img
        src={img1}
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
       <img
        src={img1}
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
    </div>
  );
};

export default Stories;
