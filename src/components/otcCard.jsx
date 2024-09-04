/* eslint-disable react/prop-types */
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import "../styles/otcCard.css";

const OTCcard = ({ data }) => {
  const {
    contractAddress,
    forAmount,
    forTotalValue,
    name,
    pricePerToken,
    progressPercentage,
    partialFull,
    sellingAmount,
    timeAgo,
  } = data;

  return (
    <div className="w-auto overflow-hidden rounded-lg shadow bg-opacity-20 bg-[#333232] flex flex-col h-full">
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex px-3 xxl:px-4 pt-3 pb-1 justify-between items-center">
          <div className="flex items-center">
            <div className="md:w-16 md:h-15 w-16 h-15 overflow-hidden rounded-full">
              <img
                src="/assets/images/bong.jpeg"
                alt="token-img"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ps-3">
              <h3 className="text-white text-2xl">{name}</h3>
              <div className="flex flex-wrap gap-y-1 ">
                <span className="text-gray-500 text-xs rounded-md p-1 custon-gray-bg">
                  {contractAddress}
                </span>
                <span className="text-gray-500 text-xs ms-1 rounded-md p-1 custon-gray-bg">
                  {partialFull}
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="custon-text stroke-current"
                strokeWidth="9"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-green-400 progress-ring__circle stroke-current"
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
        </div>

        <div className="flex justify-between items-center py-1">
          <div className="flex flex-col px-5">
            <span className="custom-gray font-bold text-sm">SELLING</span>
            <div className="flex items-center mt-1">
              <span className="text-xl me-2 text-gray-300">{sellingAmount}</span>
              <div className="w-5 h-5 overflow-hidden rounded-full">
                <img
                  src="/assets/images/bong.jpeg"
                  alt="token-img"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <span className="custom-gray">${pricePerToken}/Token</span>
          </div>

          <GoArrowRight color="#2a2f3d" className="font-bold" size={25} />

          <div className="flex flex-col px-6">
            <span className="custom-gray font-bold text-sm text-right">FOR</span>
            <div className="flex items-center mt-1">
              <span className="text-xl me-2 text-indigo-600">{forTotalValue}</span>
              <div className="w-5 h-5 overflow-hidden rounded-full">
                <img
                  src="/assets/images/Solana_logo.png"
                  alt="token-img"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <span className="custom-gray text-right">${forAmount}</span>
          </div>
        </div>

        <div className="border-t border-gray-800 flex justify-between items-center px-6 my-0 py-2">
          <span className="custom-gray">{timeAgo}</span>
          <Link
            to={`token-sale/${name}`}
            state={data}
            className="bg-gray-600 bg-opacity-35 custom-gray font-bold py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-green-700 hover:text-white"
          >
            <span>Buy</span>
            <GoArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTCcard;
