import  { useState } from "react";
import { FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";

import "../styles/otcCard.css";
const OTCcard = () => {
  const [progressPercentage, setprogressPercentage] = useState(70);
  return (
    <div className="max-w-md   overflow-hidden  rounded-lg shadow bg-custom-color">
      <div className="grid grid-rows-3 ">
        <div className="flex px-6 pt-6 pb-1 justify-between items-center">
          <div className="flex items-center">
            <div className="md:w-16 md:h-16  w-16 h-15 overflow-hidden rounded-full">
              <img
                src="/assets/images/bong.jpeg"
                alt="token-img"
                className="object-cover w-half h-half"
              />
            </div>
            <div className="ps-3">
              <h3 className="text-white text-2xl">Bonk</h3>
              <span className="text-gray-500 text-xs rounded-md p-1 custon-gray-bg">
                CA: DezX...B@63
              </span>
              <span className="text-gray-500 text-xs ms-1 rounded-md p-1 custon-gray-bg">
                PARTIAL FULL
              </span>
            </div>
          </div>

          {/* <div
            class="radial-progress text-primary w-12 h-12   rounded-full overflow-hidden"
            style={{ "--value": 20 }}
            role="progressbar"
          >
            20%
          </div> */}

          <div className="relative w-16 h-16 bg-custom-color">
            <svg className="w-full h-full bg-custom-color" viewBox="0 0 100 100">
              <circle
                className=" custon-text stroke-current"
                strokeWidth="9"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-green-400 bg-custom-color  progress-ring__circle stroke-current "
                strokeWidth="9"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={`calc(251.2 - (251.2 * ${progressPercentage}) / 100)`}
              ></circle>

              <text
                x="50"
                y="50"
                fontFamily="Verdana"
                fontSize="18"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#5c5d6c"
              >
                {progressPercentage}%
              </text>
            </svg>
          </div>
          {/* <div><RadialProgressBar  progress={100}/></div> */}
        </div>
        {/* second row */}
        <div className="flex  justify-between items-center">
          <span>
            {" "}
            <div className="flex flex-col px-6">
              <span className=" custom-gray font-bold text-sm ">SELLING</span>
              <div className="flex items-center mt-1">
                <span className="text-xl me-2 text-gray-300">8,000 </span>{" "}
                <div className="w-5 h-5 overflow-hidden rounded-full">
                  <img
                    src="/assets/images/bong.jpeg"
                    alt="token-img"
                    className="object-cover w-half h-half"
                  />
                </div>
              </div>
              <span className=" custom-gray">$0.555/Token</span>
            </div>
          </span>
          <span>
            <GoArrowRight color="#2a2f3d" className="font-bold" size={25} />
          </span>

          <span>
            {" "}
            <div className="flex flex-col px-6">
              <span className=" custom-gray font-bold text-sm text-right ">
                FOR
              </span>
              <div className="flex items-center mt-1">
                <span className="text-xl me-2 text-indigo-600">63.2298</span>{" "}
                <div className="w-5 h-5 overflow-hidden rounded-full">
                  <img
                    src="/assets/images/Solana_logo.png"
                    alt="token-img"
                    className="object-cover w-half h-half"
                  />
                </div>
              </div>
              <span className=" custom-gray text-right">$4,440</span>
            </div>
          </span>
        </div>

        <div className="border-t border-gray-800 flex justify-between items-center px-6 py-0 my-0 max-h-">
          <span className=" custom-gray ">8m ago</span>
          <span className="">
            <button className="custon-gray-bg custom-gray font-bold py-3 px-4 rounded-xl flex items-center transition duration-300 ease-in-out hover:bg-green-700 hover:text-white">
              <span>Buy</span>
              <GoArrowRight class="ml-2" size={20} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};



export default OTCcard;