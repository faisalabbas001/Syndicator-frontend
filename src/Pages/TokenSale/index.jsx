/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";

// import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { FiExternalLink, FiArrowRight, FiArrowDown } from "react-icons/fi";
import { FiGlobe, FiX, FiSend } from "react-icons/fi";
import { formater } from "../../BlockChainContext/helper";
import {
  getTokenImage,
  getTokenSymbol,
  getTokenName,
  // checkFill
} from "../../utils/ReuseFuntions";
import { useEffect, useState } from "react";

const TokenSale = () => {
  const location = useLocation();
  const stateData = location.state;
  const [tooltip, setTooltip] = useState(null);
  const [PartialFillChunkSize, SetPartialFillChunkSize] = useState(1);
  const [BuyingValue, SetBuyingValue] = useState(formater(stateData.amount));
  const [ForValue, SetForValue] = useState(formater(stateData.requested_assets[0].chunk_size));
  const Navigate = useNavigate();



  // Function to handle hover for tooltip
  const handleClick = (e) => {
    const bar = e.target.getBoundingClientRect();
    // console.log(bar)
    const clickPosition = e.clientX - bar.left;
    const barWidth = bar.width;
    const newChunkSize = Math.round((clickPosition / barWidth) * stateData.CalculatedChunkSize);
    SetPartialFillChunkSize(newChunkSize <= 1 ? 1 : newChunkSize);
  };

  // Function to handle hover for tooltip
  const handleMouseMove = (e) => {
    const bar = e.target.getBoundingClientRect();
    const hoverPosition = e.clientX - bar.left;
    const barWidth = bar.width;
    const hoverChunkSize = Math.round((hoverPosition / barWidth) * stateData.CalculatedChunkSize);
    setTooltip({
      position: hoverPosition,
      chunkSize: hoverChunkSize <= 1 ? 1 : hoverChunkSize,
    });
  };

  const handleMouseLeave = () => setTooltip(null);
  console.log(PartialFillChunkSize);
  console.log("stateData", stateData);

  const progressPercentage = 43;

  if (stateData && stateData.requested_assets.length === 1) {
    stateData.selectedChain = stateData.requested_assets[0];
  }
  console.log("stateData", stateData);

  useEffect(() => {
    const formattedChunkSize = Number(formater(stateData.selectedChain.chunk_size));
    const formattedAmount = Number(formater(stateData.amount));
    console.log("formattedChunkSize:", formattedChunkSize);
    console.log("formattedAmount:", formattedAmount);
    console.log("PartialFillChunkSize:", PartialFillChunkSize);
  
    const calculatedBuyingValue = (formattedAmount * PartialFillChunkSize) / 100;
    console.log("calculatedBuyingValue:", calculatedBuyingValue);
    
    const fullBuyingValue = calculatedBuyingValue.toString();
    const calculatedForValue = (formattedChunkSize * PartialFillChunkSize) / 100;
    const fullForValue = calculatedForValue.toString();
  
    SetBuyingValue(fullBuyingValue); 
    SetForValue(fullForValue);
  }, [PartialFillChunkSize, stateData.amount, stateData.requested_assets]);
  

  return (
    <div className="bg-transparent text-white p-1 py-3 sm:p-6 min-h-screen flex flex-col lg:flex-row justify-between gap-3 sm:gap-9 ">
      {/* Left Section */}
      <div className=" w-full lg:w-3/5">
        <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 md:p-6 rounded-lg rounded-b-none shadow-md mb-[2px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                height={45}
                width={45}
                src={getTokenImage(stateData.owned_asset.asset_address)}
                className="rounded-full"
                alt="Icon"
              />
              <div className=" ms-0 sm:ms-1">
                <h2 className="text-xl font-semibold flex items-center">
                  {getTokenName(stateData.owned_asset.asset_address)}
                  <sup className=" ms-2 pt-2">#1</sup>
                </h2>
                <p className="text-xs text-blue-600 font-semibold">
                  {/* PARTIAL FILL */}
                  {stateData.amount.toString() ===
                  stateData.owned_asset.chunk_size.toString()
                    ? "Entire Fill"
                    : "Partial Fill"}
                </p>
              </div>
              {/* circle  */}
              <div className="relative w-12 h-12 ms-0 sm:ms-2 ">
                <svg className="w-full h-full " viewBox="0 0 100 100">
                  <circle
                    className=" custon-text stroke-current"
                    strokeWidth="9"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-blue-500  progress-ring__circle stroke-current "
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
                    fontSize="23"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#ffffff"
                  >
                    {progressPercentage}
                  </text>
                </svg>
              </div>
            </div>
            <div className="flex space-x-1 me-0 sm:me-1">
              <div className="w-9 h-9 bg-black bg-opacity-45 rounded-lg flex text-[1.8rem] text-gray-600 items-center justify-center cursor-pointer">
                <FiGlobe />
              </div>
              <div className="w-9 h-9 bg-black bg-opacity-45 rounded-lg flex text-[1.8rem] text-gray-600 items-center justify-center cursor-pointer">
                <FiX />
              </div>
              <div className="w-9 h-9 bg-black bg-opacity-45 rounded-lg flex text-[1.8rem] text-gray-600 items-center justify-center cursor-pointer">
                <FiSend />
              </div>
            </div>
          </div>
          <div className="text-sm px-0 sm:px-3 pt-1">
            <div className=" flex justify-between items-center mb-1">
              <p className="mb-1 text-stone-300 font-semibold">Token Name: </p>
              <span className=" ms-auto text-gray-400">
                {" "}
                {getTokenName(stateData.owned_asset.asset_address)}
              </span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">
                Token Symbol:{" "}
              </p>
              <span className=" ms-auto text-gray-400">
                {" "}
                {getTokenSymbol(stateData.owned_asset.asset_address)}
              </span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">
                Token Contract:{" "}
              </p>
              <span className=" ms-auto text-gray-400 inline-flex">
                {stateData.owned_asset.asset_address.slice(0, 7)}....
                {stateData.owned_asset.asset_address.slice(-5)}
                <FiExternalLink className="ml-1 text-blue-600 text-[16px]" />
              </span>
            </div>
          </div>
        </div>

        <div className="bg-opacity-30 bg-[#5e5d5d] relative text-white w-full p-2 sm:p-3 md:p-6  shadow-md mb-[2px]">
          <div className="flex justify-between px-0 sm:px-3">
            <p className="text-gray-400">Offering</p>
            <p className="text-gray-400">For</p>
          </div>
          <div className="flex justify-between px-0 sm:px-3 ">
            <p className="font-semibold inline-flex items-center">
              {formater(stateData.amount)}{" "}
              {getTokenSymbol(stateData.owned_asset.asset_address)}{" "}
              <span>
                {" "}
                <img
                  height={15}
                  width={15}
                  src={getTokenImage(stateData.owned_asset.asset_address)}
                  alt="icon image"
                />
              </span>
            </p>
            <p className="font-semibold inline-flex items-center">
              {formater(stateData.selectedChain.chunk_size)}{" "}
              {getTokenSymbol(stateData.selectedChain.asset_address)}{" "}
              <span>
                {" "}
                <img
                  height={20}
                  width={20}
                  src={getTokenImage(stateData.selectedChain.asset_address)}
                  className="ms-1 rounded-full"
                />
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center px-0 sm:px-3">
            <p className="text-gray-400">Price / Token</p>
            <p className="text-gray-400">Created</p>
          </div>
          <div className="flex justify-between items-center px-0 sm:px-3">
            <p className="font-semibold">$0.00553</p>
            <p>1h ago</p>
          </div>
          <div className="flex justify-center absolute top-2/4 left-2/4">
            <FiArrowRight className="text-3xl rounded-full p-1 text-blue-600 border-2 border-blue-600" />
          </div>
        </div>

        <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 md:p-6 shadow-md mb-[1px]">
          <div className="text-sm px-0 sm:px-3 pt-1">
            <div className=" flex justify-between items-center mb-1">
              <p className="mb-1 text-stone-300 font-semibold">
                Remaining Tokens:{" "}
              </p>
              <span className=" ms-auto text-gray-400">60,000,000 M7</span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">Offer ID: </p>
              <span className=" ms-auto text-gray-400">M7</span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">Creator: </p>
              <span className=" ms-auto text-gray-400">1</span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">
                Offer Price/Token:{" "}
              </p>
              <span className=" ms-auto text-gray-400">0.000055 ETH</span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">
                Market Price/Token:{" "}
              </p>
              <span className=" ms-auto text-gray-400">0.0001 ETH</span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">
                Price Difference:{" "}
              </p>
              <span className=" ms-auto text-red-600">10% ABOVE MARKET</span>
            </div>
            <div className=" flex justify-between items-center">
              <p className="mb-2 text-stone-300 font-semibold">
                Minimum Fill:{" "}
              </p>
              <span className=" ms-auto text-gray-400">1 M7</span>
            </div>
          </div>
        </div>
        <button onClick={()=>Navigate("/")}  className="bg-gray-500 opacity-75 w-full py-2 rounded-lg rounded-t-none">
          Back
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full mt-3 sm:mt-0 lg:w-2/5">
        <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 flex items-center justify-between rounded-lg rounded-b-none shadow-md mb-[2px]">
          <div className=" inline-flex items-center sm:ps-2">
            <img
              height={25}
              width={25}
              src={getTokenImage(stateData.owned_asset.asset_address)}
              className="rounded-full"
              alt=" icon logo"
            />
            <h2 className="text-lg font-semibold ms-0 sm:ms-1 ">
              {" "}
              {getTokenSymbol(stateData.owned_asset.asset_address)} /{" "}
              {getTokenSymbol(stateData.selectedChain.asset_address)}
            </h2>
          </div>
          <div className=" flex flex-col items-end sm:pe-2">
            <p className=" text-gray-500">Price/Token</p>
            <p>$0.00553</p>
          </div>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 md:p-6  shadow-md mb-[1px]">
          <div className=" relative">
            <div className="bg-black bg-opacity-45 rounded-lg rounded-b-none mb-[1px]">
              <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between">
                {" "}
                <p className=" text-blue-500 text-xs font-semibold">
                  BUYING
                </p>{" "}
                <p className=" text-gray-400  text-xs">
                  <span className=" text-[11px]">MAX</span>{" "}
                  <strong className=" ms-1 text-white"> 800,000,0</strong>
                </p>
              </div>
              <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between pb-7">
                {" "}
                <p className="text-xl font-semibold text-stone-300">
                  {BuyingValue}
                </p>{" "}
                <p className=" text-gray-400  text-xs">
                  <img
                    height={25}
                    width={25}
                    src={getTokenImage(stateData.owned_asset.asset_address)}
                    className="rounded-full"
                    alt="icon logo"
                  />
                </p>
              </div>
            </div>
            <div className="bg-black bg-opacity-45 rounded-lg rounded-t-none ">
              <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between">
                {" "}
                <p className=" text-blue-500 text-xs font-semibold">FOR</p>{" "}
                <p className=" text-gray-400  text-xs">
                  <span className=" text-[11px]">BALANCE</span>{" "}
                  <strong className=" ms-1 text-white"> 1.2345</strong>
                </p>
              </div>
              <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between pb-7">
                {" "}
                <p className="text-xl font-semibold text-stone-300">
                  {ForValue}
                </p>{" "}
                <p className=" text-gray-400  text-xs">
                  <img
                    height={25}
                    width={25}
                    src={getTokenImage(stateData.selectedChain.asset_address)}
                    className="rounded-full"
                    alt="icon logo"
                  />
                </p>
              </div>
            </div>
            <span className=" text-lg absolute top-[72px] left-[45%] text-blue-500 border-2 rounded-full border-blue-500 p-1">
              <FiArrowDown />
            </span>
          </div>
          {/* Progress bar */}
          <div className="flex relative w-full flex-col mt-6">
            {/* Progress bar container */}
            <div className="w-full z-50 h-5 relative flex items-center">
              <style>{`
        .progress-bar::after {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          height: 2px;
          background-color: #00e641;
          border-radius: 999px;
          width: ${Math.floor(PartialFillChunkSize/stateData.CalculatedChunkSize*100)}%;
          z-index: 999;
        }
      `}</style>
              <div
                className=" w-full h-[2px] bg-gray-300 bg-opacity-30 rounded-full progress-bar"
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Filled part of the progress bar */}

                {/* Circles for fixed breakpoints */}

                {/* Tooltip for hover value */}
                {tooltip && (
                  <div
                    className="absolute -top-8 text-white bg-gray-800 p-1 rounded-md"
                    style={{
                      left: `${tooltip.position}px`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {tooltip.chunkSize}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-[1px]  left-0 bg-opacity-100 flex justify-between w-full">
              {[1,  stateData.CalculatedChunkSize].map((value) => (
                <div
                  key={value}
                  className={`w-4 h-4 ${
                    PartialFillChunkSize >= value
                      ? 'bg-[#00e641]'
                      : 'bg-slate-600 border-gray-400 bg-opacity-100'
                  } cursor-pointer bg-opacity-100 rounded-full`}
                ></div>
              ))}
            </div>

            {/* Labels below the progress bar */}
            <div className="flex justify-between mb-1 ms-1 text-gray-400">
              <p className="text-xs">1</p>
              
              <p className="text-xs">{stateData.CalculatedChunkSize}</p>
            </div>
          </div>
          {/* End of progress bar */}
        </div>
        <button className="bg-blue-500 w-full py-3 mb-3 font-semibold rounded-lg text-stone-100 rounded-t-none">
          Execute Order
        </button>
        <h3 className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 font-bold rounded-lg rounded-b-none shadow-md mb-[1px]">
          <span className=" ps-1 sm:ps-4">Recent Orders</span>
        </h3>
        <div className=" px-3 py-[6px] flex text-gray-500 text-sm mb-[1px]">
          <span>Timestamp</span>
          <span className=" ms-[4%]">Amount</span>
          <span className=" ms-[9%]">Paid</span>
          <span className=" ms-auto sm:ms-[24%]">Taker</span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d]  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
          <span className=" text-gray-400">1h ago</span>
          <span>40M M7</span>
          <span>0.000034 ETH</span>
          <span className="text-gray-400 inline-flex items-center">
            0x9F..84FF
            <FiExternalLink className="ml-1 text-blue-600 text-[16px]" />
          </span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d]  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
          <span className=" text-gray-400">2h ago</span>
          <span>43M M7</span>
          <span>0.001034 ETH</span>
          <span className="text-gray-400 inline-flex items-center">
            0x9F..84FF
            <FiExternalLink className="ml-1 text-blue-600 text-[16px]" />
          </span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d]  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
          <span className=" text-gray-400">3h ago</span>
          <span>34M M7</span>
          <span>0.000119 ETH</span>
          <span className="text-gray-400 inline-flex items-center">
            0x9F..84FF
            <FiExternalLink className="ml-1 text-blue-600 text-[16px]" />
          </span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d] rounded-lg rounded-t-none  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
          <span className=" text-gray-400">4h ago</span>
          <span>29M M7</span>
          <span>0.000213 ETH</span>
          <span className="text-gray-400 inline-flex items-center">
            0x9F..84FF
            <FiExternalLink className="ml-1 text-blue-600 text-[16px]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TokenSale;
