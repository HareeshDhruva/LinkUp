import React,{useRef} from "react";
import { featureData } from "../../data";

const Feature = () => {

  return (
    <div className="w-[80%] max-md:w-[90%] m-auto space-y-20 text-black">
      <h1 className="text-center uppercase text-[2.5rem] max-md:my-6 my-12 font-bold text-[#12141d] max-md:text-[1.5rem]">
        feature
      </h1>
      <div className="flex gap-5 justify-center max-md:flex-col max-md:text-[0.7rem] text-[.9rem]">
        {featureData.map((data,index) => (
          <div key={index} className="w-[300px] m-auto flex flex-col items-center p-4 justify-center shadow-lg bg-[#3EE4CA] rounded-lg">
            <img src={data.image} alt="" className="w-20 h-20" />
            <p className="max-md:w-full rounded-lg p-2 text-start flex text-balance items-center">
              {data.data}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
