
import { RxPerson } from "react-icons/rx"; 
import { RiFlashlightFill } from "react-icons/ri"; 
import { AiOutlineBarChart } from "react-icons/ai"; 
import { RiEditBoxLine } from "react-icons/ri"; 
import { BsFillEyeFill } from "react-icons/bs"; 
import { AiOutlineDown } from "react-icons/ai"; 
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Layout = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { address: userAddress } = useAccount();
    const { open } = useWeb3Modal();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className=" fixed top-0 h-20 w-full z-10">
        <div className=" h-full w-full border-b-[1px] border-[#79797c] bg-[#000000] ">
          <div className=" ps-5 pe-2 sm:px-5 h-full w-full flex items-center justify-between">
            <div>
                   <img height={180} width={180} src="/SyndicatorLogoPackage/FullLogo/Logo.png" alt="logo" />
            </div>

            <div>
                {
                  userAddress ? <button
                  className=" text-white text-[14px] sm:text-[16px] bg-[#363a41] px-2 sm:px-4 py-[6px] transform scale-90 sm:scale-100  border border-white border-opacity-50 rounded-md"
                  onClick={() => open()}
                >
                  {userAddress.slice(0, 4) +
                    "..." +
                    userAddress.slice(-4)}
                </button>:
                <button onClick={()=>open()} className=" text-white text-[14px] sm:text-[16px] bg-[#363a41] px-1 sm:px-3 py-1 transform scale-90 sm:scale-100  border border-white border-opacity-50 rounded-md">Connect Wallet</button>

                }
               
            </div>
          </div>
        </div>
      </header>

      <div>
        <button
        onClick={toggleSidebar}
          style={{ color: "black", background: "black" }}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className=" z-50 fixed left-0 top-2 items-center pb-3 p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="default-sidebar"
          className={`fixed top-20 left-0 z-40 text-white w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 bg-[#101116] border-[#47484b] border-r-4`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto ">
            <ul className="space-y-2 font-medium">
            <div>
      
        <li  onClick={toggleDropdown} className=" bg-[#272a2f] text-white rounded-lg">
                <a
                  href="#"
                  className="flex items-center px-3 py-3  rounded-lg group"
                >
                  <AiOutlineBarChart  className="w-6 h-6 font-extrabold text-white opacity-65 transition duration-75"/>
                  
                  <span className="ms-3">OTC</span>
                  <span className={` ms-auto mr-1 bg-black px-1 py-1 rounded-sm bg-opacity-50 text-[10px] `}><AiOutlineDown className={` transition-all ${isOpen ? "transform rotate-180": ""}`} /></span>
                </a>
              </li>
        {isOpen && (
          <>
             <li className=" text-white rounded-lg mt-1 transition-all">
                <Link
                  to={"/"}
                  onClick={toggleSidebar}
                  className="flex items-center ps-3 p-2  rounded-lg group"
                >
                  <BsFillEyeFill className="flex-shrink-0 w-5 h-5 opacity-65 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">View Offers</span>
                </Link>
              </li>
              <li className=" text-white rounded-lg mt-1 transition-all">
                <Link
                onClick={toggleSidebar}
                  to={"createoffers"}
                  className="flex items-center ps-3 p-2 rounded-lg group"
                >
                    <RiEditBoxLine className="flex-shrink-0 w-5 h-5 opacity-65 "/>
                  {/* <IoCreateOutline className="flex-shrink-0 w-5 h-5 opacity-65 " /> */}
                  <span className="flex-1 ms-3 whitespace-nowrap">Create offers</span>
                </Link>
              </li>
          </>
        )}
     
    </div>
    <div>
      
        <li  onClick={toggleDropdown2} className=" bg-[#272a2f] text-white rounded-lg">
                <a
                  href="#"
                  className="flex items-center px-3 py-3  rounded-lg group"
                >
                  {/* <AiOutlineBarChart /> */}
                  <RiFlashlightFill  className="w-5 h-5 p-[2px] border-2 rounded-md border-white font-extrabold text-white opacity-65 transition duration-75"/>
                  <span className="ms-3">My Dashboard</span>
                  <span className={` ms-auto mr-1 bg-black px-1 py-1 rounded-sm bg-opacity-50 text-[10px] `}><AiOutlineDown className={` transition-all ${isOpen2 ? "transform rotate-180": ""}`} /></span>
                </a>
              </li>
        {isOpen2 && (
          <>
             <li className=" text-white rounded-lg mt-1 transition-all">
                <Link
                  to={"/myprofile"}
                  onClick={toggleSidebar}
                  className="flex items-center ps-3 p-2  rounded-lg group"
                >
                  
                  <RxPerson className="flex-shrink-0 w-5 h-5 opacity-65 "/>
                  <span className="flex-1 ms-3 whitespace-nowrap">My Profile</span>
                </Link>
              </li>
          </>
        )}
    
    </div>
            </ul>
          </div>
        </aside>

        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className=" p-1 md:ml-64 relative top-20 bg-[#101116] "
        >
          <div className=" h-full w-full text-white">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
