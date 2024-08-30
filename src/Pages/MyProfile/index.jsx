import { BiCheckboxSquare } from "react-icons/bi"; 
import { RiBarChartGroupedLine } from "react-icons/ri"; 
import { AiOutlineArrowUp } from "react-icons/ai"; 
import { FaEthereum } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import "../../App.css"
const MyProfile = () => {
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
            <p className=" font-semibold text-[1.24rem] ">
              0xd4...7jd8{" "}
              <span className=" inline-flex text-gray-500">
                <FaRegCopy />
              </span>
            </p>
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
            
         <div className=" w-fit h-auto flex flex-wrap py-2 ps-2 bg-[#23232d] bg-opacity-80 rounded-md items-center justify-evenly gap-2">
           <div className=" inline-flex items-center bg-black bg-opacity-45 px-3 py-1 rounded" >
              <RiBarChartGroupedLine className=" me-1"/> MY OPEN ORDERS
           </div>
           <div className=" inline-flex items-center mx-auto px-3 text-gray-400 py-1 rounded" >
              <BiCheckboxSquare className=" me-[2px] text-[1.6rem] opacity-90"/> MY ORDER HISTORY
           </div>
           <div>

           </div>
         </div>
         <div className=" flex-1 w-full flex items-center justify-center ">
               <div className=" w-fit">
                <p className=" text-[3rem] filter opacity-25 text-center">🤔</p>
                <p className=" text-[1.4rem]">No Items Found</p>
                <p className=" text-center text-gray-500">Nothing is here</p>
               </div>
         </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
