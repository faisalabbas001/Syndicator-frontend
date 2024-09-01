import { useLocation } from "react-router-dom"

// import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { FiExternalLink, FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { FiGlobe, FiX, FiSend } from 'react-icons/fi';
const TokenSale = () => {
    const location = useLocation();
    const stateData = location.state;
    console.log(stateData)
    const progressPercentage = 43;
  return (
    <div className="bg-transparent text-white p-1 py-3 sm:p-6 min-h-screen flex flex-col lg:flex-row justify-between gap-3 sm:gap-9 ">
      {/* Left Section */}
      <div className=" w-full lg:w-3/5">
      <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 md:p-6 rounded-lg rounded-b-none shadow-md mb-[2px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
            <img height={45} width={45} src="/SyndicatorLogoPackage/Icon/Icon.png" alt="Icon" />
         <div className=" ms-0 sm:ms-1">
         <h2 className="text-xl font-semibold flex items-center">
            MACH7
            <sup className=" ms-2 pt-2">#1</sup>
            </h2>
            <p className="text-xs text-blue-600 font-semibold">PARTIAL FILL</p>
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
        <span className=" ms-auto text-gray-400">MACH7</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Token Symbol: </p>
        <span className=" ms-auto text-gray-400">M7</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Token Contract:  </p>
        <span className=" ms-auto text-gray-400 inline-flex">0x9863FFFA....8974FF<FiExternalLink className="ml-1 text-blue-600 text-[16px]" /></span>
        </div>
       
      </div>
    </div>

        <div className="bg-opacity-30 bg-[#5e5d5d] relative text-white w-full p-2 sm:p-3 md:p-6  shadow-md mb-[2px]">
          <div className="flex justify-between px-0 sm:px-3">
            <p className="text-gray-400">Offering</p>
            <p className="text-gray-400">For</p>
          </div>
          <div className="flex justify-between px-0 sm:px-3 ">
            <p className="font-semibold inline-flex items-center">100,000,000.00 M7 <span> <img height={15} width={15} src="/SyndicatorLogoPackage/Icon/Icon.png" alt="icon image" /></span></p>
            <p className="font-semibold inline-flex items-center">0.553 ETH <span> <img height={20} width={20} src="/assets/images/Ethereum_logo.png" alt="icon image" /></span></p>
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
        <p className="mb-1 text-stone-300 font-semibold">Remaining Tokens: </p>
        <span className=" ms-auto text-gray-400">60,000,000 M7</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Offer ID: </p>
        <span className=" ms-auto text-gray-400">M7</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Creator:  </p>
        <span className=" ms-auto text-gray-400">1</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Offer Price/Token:  </p>
        <span className=" ms-auto text-gray-400">0.000055 ETH</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Market Price/Token:  </p>
        <span className=" ms-auto text-gray-400">0.0001 ETH</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Price Difference:  </p>
        <span className=" ms-auto text-red-600">10% ABOVE MARKET</span>
        </div>
        <div className=" flex justify-between items-center">
        <p className="mb-2 text-stone-300 font-semibold">Minimum Fill:  </p>
        <span className=" ms-auto text-gray-400">1 M7</span>
        </div>
      </div>
        </div>
        <button className="bg-gray-500 opacity-75 w-full py-2 rounded-lg rounded-t-none">Back</button>
      </div>

      {/* Right Section */}
      <div className="w-full mt-3 sm:mt-0 lg:w-2/5">
      <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 flex items-center justify-between rounded-lg rounded-b-none shadow-md mb-[2px]">
      <div className=" inline-flex items-center sm:ps-2">
        <img height={25} width={25} src="/SyndicatorLogoPackage/Icon/Icon.png" alt=" icon logo" />
      <h2 className="text-lg font-semibold ms-0 sm:ms-1 ">MACH7 / ETH</h2>
      </div>
      <div className=" flex flex-col items-end sm:pe-2">
            <p className=" text-gray-500">Price/Token</p>
            <p>$0.00553</p>
      </div>
      </div>
        <div className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 md:p-6  shadow-md mb-[1px]">
         <div className=" relative">
             <div className="bg-black bg-opacity-45 rounded-lg rounded-b-none mb-[1px]">
                 <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between"> <p className=" text-blue-500 text-xs font-semibold">BUYING</p> <p className=" text-gray-400  text-xs"><span className=" text-[11px]">MAX</span> <strong className=" ms-1 text-white"> 800,000,0</strong></p></div>
                 <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between pb-7"> <p className="text-xl font-semibold text-stone-300">102,241.424</p> <p className=" text-gray-400  text-xs"><img height={25} width={25} src="/SyndicatorLogoPackage/Icon/Icon.png" alt="icon logo" /></p></div> 
             </div>
             <div className="bg-black bg-opacity-45 rounded-lg rounded-t-none ">
                 <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between"> <p className=" text-blue-500 text-xs font-semibold">FOR</p> <p className=" text-gray-400  text-xs"><span className=" text-[11px]">BALANCE</span> <strong className=" ms-1 text-white"> 1.2345</strong></p></div>
                 <div className=" flex pt-2 px-2  sm:px-6 items-center justify-between pb-7"> <p className="text-xl font-semibold text-stone-300">0.0052</p> <p className=" text-gray-400  text-xs"><img height={25} width={25} src="/assets/images/Ethereum_logo.png" alt="icon logo" /></p></div> 
             </div>
             <span className=" text-lg absolute top-[72px] left-[45%] text-blue-500 border-2 rounded-full border-blue-500 p-1"><FiArrowDown/></span>
         </div>
         <div className="flex flex-col mt-6">
  <div className="relative w-full h-[2px] bg-gray-300 rounded-full">
    <div className="absolute top-0 left-0 h-full bg-[#00e641] rounded-full" style={{ width: `${progressPercentage}%` }}></div>
    
    {/* Circles */}
    <div className="absolute -top-[7px] left-0 flex justify-between w-full">
      <div className="w-4 h-4 bg-[#00e641] rounded-full"></div>
      <div className="w-4 h-4 bg-[#00e641]  rounded-full"></div>
      <div className="w-4 h-4 bg-[#00e641] rounded-full"></div>
      <div className="w-4 h-4 border-2 bg-slate-600 border-gray-400 rounded-full"></div>
      <div className="w-4 h-4 border-2 bg-slate-600 border-gray-400 rounded-full"></div>
    </div>
  </div>
  
  <div className="flex justify-between mt-2 ms-1 text-gray-400">
    <p className=" text-xs ">0%</p>
    <p className=" text-xs">25%</p>
    <p className=" text-xs">50%</p>
    <p className=" text-xs">75%</p>
    <p className=" text-xs">100%</p>
  </div>
</div>

        </div>
        <button className="bg-blue-500 w-full py-3 mb-3 font-semibold rounded-lg text-stone-100 rounded-t-none">Execute Order</button>
        <h3 className="bg-opacity-30 bg-[#5e5d5d] text-white w-full p-2 sm:p-3 font-bold rounded-lg rounded-b-none shadow-md mb-[1px]"><span className=" ps-1 sm:ps-4">Recent Orders</span></h3>
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
            <span className="text-gray-400 inline-flex items-center">0x9F..84FF<FiExternalLink className="ml-1 text-blue-600 text-[16px]" /></span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d]  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
        <span className=" text-gray-400">2h ago</span>
            <span>43M M7</span>
            <span>0.001034 ETH</span>
            <span className="text-gray-400 inline-flex items-center">0x9F..84FF<FiExternalLink className="ml-1 text-blue-600 text-[16px]" /></span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d]  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
        <span className=" text-gray-400">3h ago</span>
            <span>34M M7</span>
            <span>0.000119 ETH</span>
            <span className="text-gray-400 inline-flex items-center">0x9F..84FF<FiExternalLink className="ml-1 text-blue-600 text-[16px]" /></span>
        </div>
        <div className="bg-opacity-30 bg-[#5e5d5d] rounded-lg rounded-t-none  px-4 py-[6px] flex justify-between text-sm mb-[1px]">
        <span className=" text-gray-400">4h ago</span>
            <span>29M M7</span>
            <span>0.000213 ETH</span>
            <span className="text-gray-400 inline-flex items-center">0x9F..84FF<FiExternalLink className="ml-1 text-blue-600 text-[16px]" /></span>
        </div>
      </div>
    </div>
  )
}

export default TokenSale