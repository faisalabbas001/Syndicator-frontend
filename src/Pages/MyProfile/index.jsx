import { BiCheckboxSquare } from "react-icons/bi"; 
import { RiBarChartGroupedLine } from "react-icons/ri"; 
import { AiOutlineArrowUp } from "react-icons/ai"; 
import { FaEthereum } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import "../../App.css"
import { useState } from "react";
import OTCcard from "../../components/otcCard";

const OrdersData = [
  {
    "name": "Bonk",
    "tokenImage": "/bong.jpeg",
    "contractAddress": "DezX...B@63",
    "partialFull": "PARTIAL FULL",
    "progressPercentage": 82,
    "sellingAmount": 8000,
    "pricePerToken": 0.555,
    "forAmount": 63.2298,
    "forTokenImage": "/Solana_logo.png",
    "forTotalValue": 4440,
    "timeAgo": "8m ago"
  },
  {
    "name": "Solana",
    "tokenImage": "/Solana_logo.png",
    "contractAddress": "SoLa...8G@28",
    "partialFull": "PARTIAL FULL",
    "progressPercentage": 90,
    "sellingAmount": 15000,
    "pricePerToken": 25.3,
    "forAmount": 380000,
    "forTokenImage": "/Ethereum_logo.png",
    "forTotalValue": 10000000,
    "timeAgo": "15m ago"
  }
]

const MyProfile = () => {
   const [IsORderOpen, setIsOrderOpen] = useState(true);
   const [IsOrderHistory,SetIsOrderHistory]= useState(false)

  function ClickToCopy() {
    let copyText = document.getElementById("myInput").textContent;
    navigator.clipboard.writeText(copyText);
    
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied" ;
}
  function ChangeText() {
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy";
  }
  return (
    <>
      <div className=" h-full w-full bg-transparent p-1 sm:p-4 ">
        {/* First Section  */}

        <div className=" flex w-auto  items-center gap-3">
          <div className=" rounded-full">
            <img
              className=" rounded-full"
              height={60}
              width={60}
              src="/assets/images/bong.jpeg"
              alt="Crypto Logo"
            />
          </div>
          <div className=" flex flex-col ">
            <div className=" flex gap-2 items-center">
            <p className=" font-semibold text-[1.24rem] " id="myInput">
              0xd4...7jd8{" "}
            </p>
            <div className="tooltip">
              <span className=" inline-flex text-gray-500 cursor-pointer" onClick={ClickToCopy} onMouseOut={ChangeText}>
              <span className="tooltiptext" id="myTooltip">Copy to clipboard</span>
                <FaRegCopy />
              </span>
              </div>
            </div>
            <p className=" text-gray-500 text-[13px] border border-gray-700 rounded text-center w-fit   pe-2">
              {" "}
              <span className=" inline-flex ps-2 text-gray-500">
                <FaEthereum />
              </span>{" "}
              0xd4...7jd8{" "}
            </p>
          </div>
        </div>

        {/* second Section  */}

        <div className=" h-auto w-full flex items-center justify-between flex-wrap py-5 gap-2">
          <div className=" box1 w-full sm:w-[48%] md:w-[32%] min-h-[140px] bg-opacity-20 bg-[#333232] rounded py-4 relative">
            
            <p className=" px-3 text-gray-400 ">TOTAL TRADES</p>
            <p className=" py-3 font-bold text-white ps-3 text-[1.3rem]">0</p>
            <p className="  text-gray-400  ps-3 ">0 orders-0 offers</p>
            
          </div>
          <div className=" box2 w-full sm:w-[48%] md:w-[32%] min-h-[140px] bg-opacity-20 bg-[#333232] rounded py-4">
          <p className=" px-3 text-gray-400 ">TOTAL VOLUME</p>
            <p className=" py-3 font-bold text-white ps-3 text-[1.3rem]">$0</p>
            <p className="  text-gray-400 ps-3 inline-flex items-center"><span className=" text-green-300 inline-flex items-center mr-1"><AiOutlineArrowUp/>0%</span> this month</p>
          </div>
          <div className=" box3 w-full sm:w-[48%] md:w-[32%] min-h-[140px] bg-opacity-20 bg-[#333232] rounded py-4">
          <p className=" px-3 text-gray-400 ">INCENTIVES</p>
            <p className=" py-3 font-bold text-white ps-3 text-[1.3rem]">0</p>
            <p className="  text-gray-400 ps-3 ">Total Recieved</p>
          </div>
      </div>

      {/* third Section  */}
        
        <div className="  min-h-[38rem] rounded-[10px] bg-opacity-20 bg-[#333232] w-full flex flex-col gap-y-3 p-2 sm:p-5">
            
         <div className=" w-fit h-auto flex flex-wrap py-2 px-2 bg-[#23232d] bg-opacity-80 rounded-md items-center justify-evenly gap-2">
           <div onClick={()=>{setIsOrderOpen(true);
            SetIsOrderHistory(false)
           }} className={` inline-flex items-center ${IsORderOpen? " bg-black bg-opacity-45":"text-gray-400"} px-3 py-1 rounded cursor-pointer `}>
              <RiBarChartGroupedLine className=" me-1"/> MY OPEN ORDERS
           </div>
           <div onClick={()=>{setIsOrderOpen(false);
            SetIsOrderHistory(true)
           }} className={`inline-flex items-center mx-auto px-3  ${IsOrderHistory? " bg-black bg-opacity-45":"text-gray-400"} py-1 cursor-pointer rounded`} >
              <BiCheckboxSquare className=" me-[2px] text-[1.6rem] opacity-90"/> MY ORDER HISTORY
           </div>
         </div>
         {
          IsORderOpen && 
          <div className="md:py-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-3 text-white">
          {OrdersData.map((val, ind) => (
            <div key={ind} className="py-1 md:py-0">
              <OTCcard key={ind} data={val} />{" "}
            </div>
          ))}

          {/* <div>04</div> */}
        </div>
         }
        {
          IsOrderHistory &&  <div className=" flex-1 w-full flex items-center justify-center ">
          <div className=" w-fit">
           <p className=" text-[3rem] filter opacity-25 text-center">🤔</p>
           <p className=" text-[1.4rem]">No Items Found</p>
           <p className=" text-center text-gray-500">Nothing is here</p>
          </div>
    </div>
        }
        </div>
      </div>
    </>
  );
};

export default MyProfile;
