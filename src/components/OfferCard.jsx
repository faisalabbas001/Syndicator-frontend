import { AiOutlineArrowDown } from "react-icons/ai";
import { BiShapePolygon } from "react-icons/bi";
import { DiDocker } from "react-icons/di";
import { TbDropCircle } from "react-icons/tb";
import { FaGgCircle } from "react-icons/fa";
import { FcDoughnutChart } from "react-icons/fc";
import { AiOutlineBold } from "react-icons/ai";
import { FcScatterPlot } from "react-icons/fc";
import { AiFillMediumSquare } from "react-icons/ai";
import { TbCurrencySolana } from "react-icons/tb";
import { FaScroll } from "react-icons/fa";
import { FaAirbnb } from "react-icons/fa";
import { BiBitcoin } from "react-icons/bi";
import { BsPCircle } from "react-icons/bs";
import { TbArrowZigZag } from "react-icons/tb";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
// import { GoCheckCircleFill } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { FaLockOpen, FaScaleBalanced } from "react-icons/fa6";
import "../styles/otcCard.css";
import DeactivateModal from "./Popup";
import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import {
  abi,
  contractAddress,
  erc20Abi,
  testTokenAddress,
  formater,
  formaterWithInteger
} from "../BlockChainContext/helper";
import { nonceManager, parseEther } from "viem";
import { config } from "../BlockChainContext/config";
import toast from "react-hot-toast";
import { getTokenImage, getTokenSymbol,chainOptions } from "../utils/ReuseFuntions";
let equivalent_asset;
let OfferAmount1;
let NoOfChunks;
let offeraddress1;
let groups;
let offerSectionData;
let forSectionData;
let chainStatus;
let includeSelf = false;
const OfferMarketCard = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  //   const [selected, setSelected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  console.log(equivalent_asset)
  const handleNext = () => {
  console.log(equivalent_asset)

    if (activeStep === 2) {
      if (!OfferAmount1 || equivalent_asset[0].asset_address===undefined || !forSectionData[0].amount|| !offeraddress1) {
        toast.error("Please Fill the required fields to move on to the next step");
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle the case where activeStep is equal to or greater than totalSteps
      toast.error("You have reached the last step");
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }

  
  };

  const tokenApproval = async (value,address) => {
    try {
      const { request } = await simulateContract(config, {
        abi: erc20Abi,
        address: address,
        functionName: "approve",
        //cook totalPrice
        args: [contractAddress, parseEther(value)],
      });
      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });
      console.log("token Aapproved");
      toast.success("Token Approved");
    } catch (error) {
      console.log(error);
    }
  };

  async function extractValues(data) {
    // Remove the '0x' prefix
    const cleanData = data.slice(2);

    // Split data into 64 character (32-byte) segments
    const segments = cleanData.match(/.{1,64}/g);

    // Convert each segment from hex to decimal
    const values = segments.map(segment => BigInt('0x' + segment));

    return values;
}

const addUserGroup = async (scenario, offerId) => {
  try {
    if (groups.length > 0) {
      console.log("Offer ID:", offerId.toString());

      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: "create_user_group",
        args: [includeSelf, groups],
      });

      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });

      console.log("Transaction Receipt:", transactionReceipt);

      const data = await extractValues(transactionReceipt.logs[0]?.data);

      // Check if data is valid
      if (!data || data.length === 0) {
        throw new Error("No data extracted from logs");
      }

      const groupId = Number(data[0]);   // Assuming it's a BigNumber
      console.log("Group ID (as Number):", groupId);
      console.log("Group ID (as BigNumber):", groupId.toString());

      toast.success("Group created! Attaching offer...");

      const validOfferId =Number(offerId); // Ensure offerId is a valid BigNumber
      console.log("Valid Offer ID:", validOfferId);
      try{
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: "add_include_group",
        args: [offerId,groupId],
      });

      const hash2 = await writeContract(config, request);
      const transactionReceipt2 = await waitForTransactionReceipt(config, {
        hash: hash2,
      });

      console.log("Transaction Receipt 2:", transactionReceipt2);
      toast.success("The offer is now private");
    }catch(error){
      console.log(error);
    }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


const handleSubmit2 = async () => {
  try {
    if (equivalent_asset.length == 1) {
      // Scenario 1
      if (offeraddress1 == "0x0000000000000000000000000000000000000000") {
        // Scenario 1.1
        const { request } = await simulateContract(config, {
          abi: abi,
          address: contractAddress,
          functionName: "create_single_coin_offer",
          args: [equivalent_asset[0], NoOfChunks],
          value: parseEther(OfferAmount1.toString()),
        });

        const hash = await writeContract(config, request);
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });

        console.log("Transaction Receipt Logs:", transactionReceipt.logs);

        // Check if logs contain the expected topics
        const logs = transactionReceipt.logs;
        if (logs.length === 0) {
          throw new Error("No logs found in transaction receipt.");
        }

        const offerIdTopic = logs[1]?.topics[1];
        if (!offerIdTopic) {
          throw new Error("Offer ID not found in transaction logs.");
        }

        // Convert the hex value to BigNumber
        const offerId = BigNumber.from(offerIdTopic);
        console.log("Offer ID (as BigNumber):", offerId.toString());

        toast.success("Offer created successfully");

        if (groups.length > 0) {
          await addUserGroup("1.1", offerId);
        }

      } else {
        // Scenario 1.2 (Token offer)
        await tokenApproval(OfferAmount1, offeraddress1);

        const { request } = await simulateContract(config, {
          abi: abi,
          address: contractAddress,
          functionName: "create_single_token_offer",
          args: [
            equivalent_asset[0],
            NoOfChunks,
            parseEther(OfferAmount1),
            offeraddress1,
          ],
        });

        const hash = await writeContract(config, request);
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });

        console.log("Transaction Receipt Logs:", transactionReceipt.logs);

        // Check if logs contain the expected topics
        const logs = transactionReceipt.logs;
        if (logs.length === 0) {
          throw new Error("No logs found in transaction receipt.");
        }

        const offerIdTopic = logs[1]?.topics[1];
        if (!offerIdTopic) {
          throw new Error("Offer ID not found in transaction logs.");
        }

        // Convert the hex value to BigNumber
        const offerId = BigNumber.from(offerIdTopic);
        console.log("Offer ID (as BigNumber):", offerId.toString());

        toast.success("Offer created successfully");

        if (groups.length > 0) {
          await addUserGroup("1.2", offerId);
        }
      }

    } else if (equivalent_asset.length > 1) {
      // Scenario 2
      if (offeraddress1 == "0x0000000000000000000000000000000000000000") {
        // Scenario 2.1
        const { request } = await simulateContract(config, {
          abi: abi,
          address: contractAddress,
          functionName: "create_multi_coin_offer",
          args: [equivalent_asset, NoOfChunks],
          value: parseEther(OfferAmount1.toString()),
        });

        const hash = await writeContract(config, request);
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });

        console.log("Transaction Receipt Logs:", transactionReceipt.logs);

        // Check if logs contain the expected topics
        const logs = transactionReceipt.logs;
        if (logs.length === 0) {
          throw new Error("No logs found in transaction receipt.");
        }

        const offerIdTopic = logs[1]?.topics[1];
        if (!offerIdTopic) {
          throw new Error("Offer ID not found in transaction logs.");
        }

        // Convert the hex value to BigNumber
        const offerId = BigNumber.from(offerIdTopic);
        console.log("Offer ID (as BigNumber):", offerId.toString());

        toast.success("Offer created successfully");

        if (groups.length > 0) {
          await addUserGroup("2.1", offerId);
        }

      } else {
        // Scenario 2.2 (Token offer)
        await tokenApproval(OfferAmount1, offeraddress1);

        const { request } = await simulateContract(config, {
          abi: abi,
          address: contractAddress,
          functionName: "create_multi_token_offer",
          args: [
            equivalent_asset,
            NoOfChunks,
            parseEther(OfferAmount1),
            offeraddress1,
          ],
        });

        const hash = await writeContract(config, request);
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });

        console.log("Transaction Receipt Logs:", transactionReceipt.logs);

        // Check if logs contain the expected topics
        const logs = transactionReceipt.logs;
        if (logs.length === 0) {
          throw new Error("No logs found in transaction receipt.");
        }

        const offerIdTopic = logs[1]?.topics[1];
        if (!offerIdTopic) {
          throw new Error("Offer ID not found in transaction logs.");
        }

        // Convert the hex value to BigNumber
        const offerId = BigNumber.from(offerIdTopic);
        console.log("Offer ID (as BigNumber):", offerId.toString());

        toast.success("Offer created successfully");

        if (groups.length > 0) {
          await addUserGroup("2.2", offerId);
        }
      }
    }
  } catch (error) {
    console.error("Error during submission:", error);
  }
};





  const handleNextClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="max-w-lg 
     md:py-7 
     mx-1 md:mx-0 mb-2 "
      >
        <div className=" rounded-md  mb-5 md:mb-0">
          <span className=" mt-5 sm:-mb-3 sm:ms-[9px] font-bold text-[12px] py-[2px] bg-[#64d5ff] text-black px-[6px] rounded-full flex justify-center items-center w-fit">
            STEP {activeStep}/3
          </span>

          {/* Cards */}
          <div className="flex space-x-4  border-0 border-gray-900 rounded-lg z-[-1]">
            {activeStep === 1 && <Card1 />}
            {activeStep === 2 && <Card2 />}
            {activeStep === 3 && <Card3 />}
          </div>

          {/* Navigation Buttons */}
          <div className=" custom-gray-bg flex flex-wrap justify-evenly md:justify-between mt-4  pb-5 mb-5 md:mb-0 md:pb-7 px-5 md:px-5 ">
            {activeStep > 1 && (
              <button
                onClick={handlePrev}
                className={`bg-[#15161b] border border-gray-800 text-white px-4 py-2 rounded-md w-[45%] md:w-[48%] `}
              >
                Back
              </button>
            )}
            {activeStep === 3 && (
              <>
                <button
                  onClick={handleNextClick}
                  className="bg-red-500 text-black px-3 py-2 rounded-md w-[45%] md:w-[48%]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit2}
                  className="bg-[#ffc848] text-black px-4 py-2 rounded-md mt-2 mx-auto w-[92%] md:w-full  "
                >
                  Deposit {" "} {OfferAmount1 + " " + offerSectionData.name}
                </button>
              </>
            )}
            {activeStep < totalSteps && (
              <button
                onClick={handleNext}
                className={`bg-[#fec949] text-black px-4 py-2 rounded-md ${
                  activeStep === 1 ? "w-full" : "w-[48%]"
                } `}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <DeactivateModal show={showModal} onClose={handleCloseModal} />
    </>
  );
};

// const CustomProgressBar = ({ progress }) => {
//   return (
//     <>

//     <ProgressBar  percent={progress} filledBackground="#22c55e	" height="5%" className="z-[9999]">
//       <Step transition="scale">
//         {({ accomplished }) => (
//           <GoCheckCircleFill
//             size={40}
//             color={accomplished ? "#22c55e	" : "#CCCCCC"}
//             style={{ transform: "scale(0.8)", backgroundColor: "#1b1e2f" }}
//           />
//         )}
//       </Step>
//       <Step transition="scale">
//         {({ accomplished }) => (
//           <GoCheckCircleFill
//             size={40}
//             color={accomplished ? "#22c55e	" : "#CCCCCC"}
//             style={{ transform: "scale(0.8)", backgroundColor: "#1b1e2f" }}
//           />
//         )}
//       </Step>
//       <Step transition="scale">
//         {({ accomplished }) => (
//           <GoCheckCircleFill
//             size={40}
//             color={accomplished ? "#22c55e	" : "#CCCCCC"}
//             style={{ transform: "scale(0.8)", backgroundColor: "#1b1e2f" }}
//           />
//         )}
//       </Step>
//     </ProgressBar>

//     </>
//   );
// };

// const NftIcon = () => {
//     return (
//         <>
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                 version="1.1"
//                 width="40"
//                 height="35"
//                 viewBox="0 0 106 106"
//                 color="white"
//                 xmlSpace="preserve"
//             >
//                 <g
//                     style={{
//                         stroke: "none",
//                         strokeWidth: 0,
//                         strokeDasharray: "none",
//                         strokeLinecap: "butt",
//                         strokeLinejoin: "miter",
//                         strokeMiterlimit: 10,
//                         fill: "none",
//                         fillRule: "nonzero",
//                         opacity: 1,
//                         transform: "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
//                     }}
//                 >
//                     <path
//                         d="M 45 90 c -0.345 0 -0.69 -0.089 -1 -0.268 l -37.239 -21.5 c -0.619 -0.357 -1 -1.018 -1 -1.732 v -43 c 0 -0.714 0.381 -1.375 1 -1.732 L 44 0.268 c 0.619 -0.357 1.381 -0.357 2 0 l 37.239 21.5 c 0.619 0.357 1 1.018 1 1.732v 43 c 0 0.715 -0.381 1.375 -1 1.732 L 46 89.732 C 45.69 89.911 45.345 90 45 90 z M 9.761 65.346 L 45 85.69 l 35.239 -20.345 V 24.655 L 45 4.31 9.761 24.655 V 65.346 z"
//                         style={{
//                             stroke: "none",
//                             strokeWidth: 1,
//                             strokeDasharray: "none",
//                             strokeLinecap: "butt",
//                             strokeLinejoin: "miter",
//                             strokeMiterlimit: 10,
//                             fill: "rgb(255, 255, 255)",
//                             fillRule: "nonzero",
//                             opacity: 1,
//                         }}
//                         transform="matrix(1 0 0 1 0 0)"
//                     />
//                     <path
//                         d="M 27.781 68.337 c -0.887 0 -1.684 -0.591 -1.926 -1.467 L 20.05 45.882 v 15.214 c 0 1.104 -0.896 2 -2 2 s -2 -0.896 -2 -2 V 31.15 c 0 -1 0.739 -1.847 1.731 -1.982 c 0.992 -0.134 1.93 0.484 2.197 1.449 l 5.805 20.988 V 25.011 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 41.326 c 0 1.001 -0.739 1.848 -1.731 1.981 C 27.961 68.331 27.871 68.337 27.781 68.337 z"
//                         style={{
//                             stroke: "none",
//                             strokeWidth: 1,
//                             strokeDasharray: "none",
//                             strokeLinecap: "butt",
//                             strokeLinejoin: "miter",
//                             strokeMiterlimit: 10,
//                             fill: "rgb(255, 255, 255)",
//                             fillRule: "nonzero",
//                             opacity: 1,
//                         }}
//                         transform="matrix(1 0 0 1 0 0)"
//                     />
//                     <path
//                         d="M 73.948 31.69 c -0.353 0 -0.709 -0.093 -1.032 -0.289 l -12.698 -7.673 c -0.945 -0.571 -1.249 -1.801 -0.678 -2.746 c 0.571 -0.947 1.803 -1.248 2.746 -0.678 l 12.698 7.673 c 0.945 0.571 1.249 1.801 0.678 2.746 C 75.286 31.346 74.625 31.69 73.948 31.69 z"
//                         style={{
//                             stroke: "none",
//                             strokeWidth: 1,
//                             strokeDasharray: "none",
//                             strokeLinecap: "butt",
//                             strokeLinejoin: "miter",
//                             strokeMiterlimit: 10,
//                             fill: "rgb(255, 255, 255)",
//                             fillRule: "nonzero",
//                             opacity: 1,
//                         }}
//                         transform="matrix(1 0 0 1 0 0)"
//                     />
//                     <path
//                         d="M 36.261 74.341 c -1.104 0 -2 -0.896 -2 -2 V 17.707 c 0 -0.704 0.37 -1.356 0.974 -1.717 l 8.98 -5.366 c 0.635 -0.379 1.427 -0.376 2.06 0.005 l 10.862 6.564 c 0.945 0.571 1.249 1.801 0.678 2.747 c -0.572 0.945 -1.802 1.247 -2.746 0.677 l -9.834 -5.943 l -6.974 4.167 v 53.5 C 38.261 73.445 37.366 74.341 36.261 74.341 z"
//                         style={{
//                             stroke: "none",
//                             strokeWidth: 1,
//                             strokeDasharray: "none",
//                             strokeLinecap: "butt",
//                             strokeLinejoin: "miter",
//                             strokeMiterlimit: 10,
//                             fill: "rgb(255, 255, 255)",
//                             fillRule: "nonzero",
//                             opacity: 1,
//                         }}
//                         transform="matrix(1 0 0 1 0 0)"
//                     />
//                     <path
//                         d="M 53.861 46.83 h -17.6 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 17.6 c 1.104 0 2 0.896 2 2 S 54.966 46.83 53.861 46.83 z"
//                         style={{
//                             stroke: "none",
//                             strokeWidth: 1,
//                             strokeDasharray: "none",
//                             strokeLinecap: "butt",
//                             strokeLinejoin: "miter",
//                             strokeMiterlimit: 10,
//                             fill: "rgb(255, 255, 255)",
//                             fillRule: "nonzero",
//                             opacity: 1,
//                         }}
//                         transform="matrix(1 0 0 1 0 0)"
//                     />
//                     <path
//                         d="M 67.332 67.837 c -1.104 0 -2 -0.896 -2 -2 V 25.69 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 40.146 C 69.332 66.941 68.437 67.837 67.332 67.837 z"
//                         style={{
//                             stroke: "none",
//                             strokeWidth: 1,
//                             strokeDasharray: "none",
//                             strokeLinecap: "butt",
//                             strokeLinejoin: "miter",
//                             strokeMiterlimit: 10,
//                             fill: "rgb(255, 255, 255)",
//                             fillRule: "nonzero",
//                             opacity: 1,
//                         }}
//                         transform="matrix(1 0 0 1 0 0)"
//                     />
//                 </g>
//             </svg>
//         </>
//     );
// };

const NftIcon = () => {
  return (
    <div className="nft-icon-parent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="40"
        height="35"
        viewBox="0 0 106 106"
        xmlSpace="preserve"
        className="nft-icon"
      >
        <g
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
            transform:
              "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)",
          }}
        >
          <path
            d="M 45 90 c -0.345 0 -0.69 -0.089 -1 -0.268 l -37.239 -21.5 c -0.619 -0.357 -1 -1.018 -1 -1.732 v -43 c 0 -0.714 0.381 -1.375 1 -1.732 L 44 0.268 c 0.619 -0.357 1.381 -0.357 2 0 l 37.239 21.5 c 0.619 0.357 1 1.018 1 1.732v 43 c 0 0.715 -0.381 1.375 -1 1.732 L 46 89.732 C 45.69 89.911 45.345 90 45 90 z M 9.761 65.346 L 45 85.69 l 35.239 -20.345 V 24.655 L 45 4.31 9.761 24.655 V 65.346 z"
            className="nft-path"
          />
          <path
            d="M 27.781 68.337 c -0.887 0 -1.684 -0.591 -1.926 -1.467 L 20.05 45.882 v 15.214 c 0 1.104 -0.896 2 -2 2 s -2 -0.896 -2 -2 V 31.15 c 0 -1 0.739 -1.847 1.731 -1.982 c 0.992 -0.134 1.93 0.484 2.197 1.449 l 5.805 20.988 V 25.011 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 41.326 c 0 1.001 -0.739 1.848 -1.731 1.981 C 27.961 68.331 27.871 68.337 27.781 68.337 z"
            className="nft-path"
          />
          <path
            d="M 73.948 31.69 c -0.353 0 -0.709 -0.093 -1.032 -0.289 l -12.698 -7.673 c -0.945 -0.571 -1.249 -1.801 -0.678 -2.746 c 0.571 -0.947 1.803 -1.248 2.746 -0.678 l 12.698 7.673 c 0.945 0.571 1.249 1.801 0.678 2.746 C 75.286 31.346 74.625 31.69 73.948 31.69 z"
            className="nft-path"
          />
          <path
            d="M 36.261 74.341 c -1.104 0 -2 -0.896 -2 -2 V 17.707 c 0 -0.704 0.37 -1.356 0.974 -1.717 l 8.98 -5.366 c 0.635 -0.379 1.427 -0.376 2.06 0.005 l 10.862 6.564 c 0.945 0.571 1.249 1.801 0.678 2.747 c -0.572 0.945 -1.802 1.247 -2.746 0.677 l -9.834 -5.943 l -6.974 4.167 v 53.5 C 38.261 73.445 37.366 74.341 36.261 74.341 z"
            className="nft-path"
          />
          <path
            d="M 53.861 46.83 h -17.6 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 17.6 c 1.104 0 2 0.896 2 2 S 54.966 46.83 53.861 46.83 z"
            className="nft-path"
          />
          <path
            d="M 67.332 67.837 c -1.104 0 -2 -0.896 -2 -2 V 25.69 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 40.146 C 69.332 66.941 68.437 67.837 67.332 67.837 z"
            className="nft-path"
          />
        </g>
      </svg>
    </div>
  );
};

const Optimism = () => {
  return (
    <>
      <span className=" mr-1 bg-red-600 ps-[1px] pe-[2px] text-[12px] font-bold rounded-sm italic ">
        OP
      </span>
    </>
  );
};

const Card1 = () => {
  return (
    <div className="  md:p-3 rounded-lg  max-w-lg flex flex-col w-full md:w-screen ">
      <h1 className="text-white text-3xl py-2">Get Started</h1>
      <div className="flex py-4">
        <span className=" rounded-full bg-gray-700 bg-opacity-60 px-2 me-2 text-gray-400 text-sm text-center flex justify-center items-center">
          1{" "}
        </span>{" "}
        <h4 className="text-white "> Select Market</h4>
      </div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-x-2 md:gap-y-2">
        <MarketCard
          logo={<TbArrowZigZag />}
          title={"OTC"}
          subtitle={"Trade pre-TGE"}
          description={"token allocations."}
        />
        <MarketCard
          logo={<BsPCircle />}
          title={"Points Market"}
          subtitle={"Trade protocols"}
          description={"points."}
          sooncheck={"soon"}
        />
        <MarketCard
          logo={<BiBitcoin />}
          title={"Runes Market"}
          subtitle={"Trade pre-launch"}
          description={"Runes allocations."}
          sooncheck={"soon"}
        />
        <MarketCard
          logo={<FaScaleBalanced />}
          title={"Runes DEX"}
          subtitle={"Trade Runes OTC"}
          sooncheck={"soon"}
        />
        <MarketCard
          logo={<NftIcon />}
          title={"NFT Whitelists"}
          subtitle={"Trade Pre-Mint NFT "}
          description={"Whitelist"}
          sooncheck={"soon"}
        />
        <MarketCard
          logo={<FaLockOpen />}
          title={"Vesting Market"}
          subtitle={"Trade Vesting Token Ownership"}
          sooncheck={"soon"}
        />
      </div>

      <div className="flex py-4">
        <span className=" rounded-full bg-gray-700 bg-opacity-60 px-2 me-2 text-gray-400 text-sm text-center flex justify-center items-center">
          2{" "}
        </span>{" "}
        <h4 className="text-white "> Select Network</h4>
      </div>
      <div className=" flex flex-wrap gap-2">
        <Network
          name="Ethereum"
          icon={<FaEthereum className=" mr-1 text-blue-600" />}
        />
        <Network name="Optimism" icon={<Optimism />} />
        <Network
          name="BNB Chain"
          icon={
            <FaAirbnb className="mr-1 text-yellow-400 rounded-md opacity-75 bg-yellow-700 bg-opacity-75" />
          }
        />
        <Network name="Scroll" icon={<FaScroll className=" mr-1" />} />
        <Network
          name="Solana"
          icon={<TbCurrencySolana className=" mr-1 text-purple-800" />}
        />
        <Network
          name="Mode"
          icon={
            <AiFillMediumSquare className=" mr-1 text-black bg-yellow-500 rounded" />
          }
        />{" "}
        <Network name="Linea" icon={<FcScatterPlot className=" mr-1" />} />
        <Network
          name="Blast"
          icon={
            <AiOutlineBold
              className={
                "mr-1 p-[1px] italic font-bold bg-black rounded text-yellow-500"
              }
            />
          }
        />{" "}
        <Network
          name="Manta Pacific"
          icon={<FcDoughnutChart className=" mr-1" />}
        />
        <Network
          name="Starknet"
          icon={<FaGgCircle className=" mr-1 bg-purple-800 rounded-full" />}
        />
        <Network
          name="Marlin"
          icon={
            <TbDropCircle className=" mr-1 transform rotate-6 bg-teal-700 rounded-full" />
          }
        />
        <Network
          name="Base"
          icon={
            <DiDocker className=" mr-1 bg-white text-blue-700 rounded-md" />
          }
        />
        <Network
          name="Arbitrum"
          icon={<BiShapePolygon className=" mr-1 bg-blue rounded-md" />}
        />
      </div>
    </div>
  );
};

const Card2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Partial Fill");
  const [todoAddAddress, setTodoAddAddress] = useState("");
  const [todoAddressData, setTodoAdressData] = useState([]);
  const [offerAmount, SetOfferAmount] = useState(0);
  const [PartialFillChunkSize, SetPartialFillChunkSize] = useState(2);
  const [tooltip, setTooltip] = useState(null);
  const [ischecked, setischecked] = useState(false);
  const [forAmounts, setForAmounts] = useState([
    { amount: "", token: null, isDropdownOpen: false },
  ]);
  OfferAmount1 = offerAmount;
  NoOfChunks = PartialFillChunkSize;
  includeSelf;
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChainSelect = (chain) => {
    if (forAmounts.some((item) => item.token?.name === chain.name)) {
      toast.error(
        "This token is already selected in forAmounts. Please choose another token."
      );
      return;
    }
    setSelectedChain(chain);
    setIsDropdownOpen(false);
  };

  // Array of chain options


  //const chunk_num = 1n;
  //let amount = parseEther(ForAmount.toString());
  const assetsData =
    (forAmounts && forAmounts.length > 0) &&
    forAmounts.map((val, ind) => {
      return {
        chunk_size: ethers.utils.parseUnits(
          (val?.amount / PartialFillChunkSize).toString(),
          "ether"
        ),
        asset_address: val.token?.address,
      };
    });
  // console.log(assetsData)
  offeraddress1 = selectedChain?.address;
  // console.log(assetsData.length);

  equivalent_asset = assetsData;
  groups = todoAddressData;
  forSectionData = forAmounts;
  offerSectionData = selectedChain;
  chainStatus = selectedOption;

  const toggleDropdownAddedBox = (index) => {
    setForAmounts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isDropdownOpen: !item.isDropdownOpen } : item
      )
    );
  };

  const handleTokenSelect = (index, token) => {
    if (forAmounts.some((item) => item.token?.name === token.name)) {
      toast.error(
        "This token has already been selected in another box. Please choose a different token."
      );
      return;
    }

    if (token.name === selectedChain?.name) {
      toast.error(
        "This token is already selected for the offer amount. Please choose another token."
      );

      return;
    }
    setForAmounts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, token, isDropdownOpen: false } : item
      )
    );
  };

  // Handle forAmount input change for a specific index
  const handleForAmountChange = (index, amount) => {
    setForAmounts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, amount } : item))
    );
  };

  // Add a new forAmount field
  const addForAmount = () => {
    const allValid = forAmounts.every((item) => item.amount && item.token);

    if (!allValid) {
      toast.error("Please fill the certain fields");
      return;
    }

    if (forAmounts.length >= 5) {
      toast.error("Limit exceeded");
      return;
    }

    setForAmounts((prev) => [
      ...prev,
      { amount: "", token: null, isDropdownOpen: false },
    ]);
  };

  // 0xC8A41174EC57343bFbadaDA0b30901566676220A

  const AddTodoAddressFunction = () => {
    if (todoAddAddress.length === 42) {
      setTodoAdressData((prev) => [...prev, todoAddAddress]);
    } else {
      setTodoAddAddress("");
      toast.error("address should be 42 digit long");
    }
  };

  // console.log(forAmounts)

  // select chunk size within range

  const handleClick = (e) => {
    const bar = e.target.getBoundingClientRect();
    // console.log(bar)
    const clickPosition = e.clientX - bar.left;
    const barWidth = bar.width;
    const newChunkSize = Math.round((clickPosition / barWidth) * 100);
    SetPartialFillChunkSize(newChunkSize <= 2 ? 2 : newChunkSize);
  };

  // Function to handle hover for tooltip
  const handleMouseMove = (e) => {
    const bar = e.target.getBoundingClientRect();
    const hoverPosition = e.clientX - bar.left;
    const barWidth = bar.width;
    const hoverChunkSize = Math.round((hoverPosition / barWidth) * 100);
    setTooltip({
      position: hoverPosition,
      chunkSize: hoverChunkSize <= 2 ? 2 : hoverChunkSize,
    });
  };

  const handleMouseLeave = () => setTooltip(null);
  // console.log(PartialFillChunkSize);

  //check function for private fill
  const handlechecked = (e) => {
    setischecked(e.target.checked);
  };
  // console.log(ischecked)

  // console.log(selectedChain)

  return (
    <div
      className=" 
     md:p-3 rounded-lg mt-2 flex flex-col w-full md:w-screen max-w-lg relative "
    >
      {/* <h1 className="text-white text-3xl py-2">Buying</h1> */}

      {/* Buy */}
      <h1 className=" text-[2rem] sm:text-left font-semibold mb-4">
        Offer Details
      </h1>
      <div
        style={{
          boxShadow:
            "0 1px 4px 0 rgba(255, 255, 255, 0.0001), 0 1px 3px 0 rgba(255, 255, 255, 0.1)",
        }}
        className="flex flex-wrap px-2 sm:px-4 py-2 sm:p-4 bg-[#15161b] rounded-md justify-between w-full "
      >
        <div className="flex items-start flex-col w-full sm:w-auto">
          <div className="flex items-center w-full">
            <span
              className="text-xs px-2 py-0.5 rounded-sm text-gray-300 font-bold"
              style={{ fontSize: "60%" }}
            >
              OFFER
            </span>
            <div className="relative">
              <CiCircleInfo
                color="white"
                size={12}
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              />
              {showInfo && (
                <div className="absolute top-0 left-full bg-gray-950 bg-opacity-100 p-2 rounded shadow text-xs w-20 text-gray-500">
                  The Amount of Token you want to buy
                </div>
              )}
            </div>
          </div>
          <input
            type="number"
            inputMode="numeric"
            value={offerAmount === 0 ? "" : offerAmount}
            onChange={(e) => SetOfferAmount(e.target.value)}
            placeholder="Enter amount to offer"
            className=" bg-transparent px-2 py-1 mt-2 w-full sm:w-auto outline-none border-none text-white text-xl"
          />
        </div>
        <div className="flex items-end w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full sm:w-auto">
            <button
              className="flex items-center justify-between w-full px-2 py-1 text-white rounded-md border border-gray-700 focus:outline-none"
              onClick={toggleDropdown}
            >
              {selectedChain.icon ? (
                <img
                  src={selectedChain.icon}
                  alt={selectedChain.name || "Solana"}
                  className="w-4 h-4 mr-1"
                />
              ) : (
                "Select Token"
              )}
              <span className="text-sm">{selectedChain.name || ""}</span>
              <FiChevronDown color="#94a3b8" />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-[99999] mt-1 w-full sm:w-40 custon-gray-bg rounded-md shadow-lg">
                <ul className="py-1">
                  {chainOptions.map((chain, index) => (
                    <li key={index}>
                      <button
                        className="flex items-center w-full px-3 py-2 text-white text-xs hover:bg-gray-700"
                        onClick={() => handleChainSelect(chain)}
                      >
                        <img
                          src={chain.icon}
                          alt={chain.name}
                          className="w-6 h-6 mr-2"
                        />
                        {chain.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <span className=" absolute rounded-full p-[6px] z-10 shadow-xl bg-[#15161b] bg-opacity-1 border border-gray-800 left-[45%] top-[157px] ">
        <AiOutlineArrowDown className="" />
      </span>

      {/* For */}

      <div id="forAmountScrollbar" className=" flex flex-col ">
        {forAmounts.map((forAmount, index) => (
          <div
            key={index}
            style={{
              boxShadow:
                "0 0px 1px 0 rgba(255, 255, 255, 0.0001), 0 1px 3px 0 rgba(255, 255, 255, 0.1)",
            }}
            className="flex relative flex-wrap p-2 sm:p-4 bg-[#15161b] rounded-md justify-between mt-[6px]"
          >
            <div className="flex items-start flex-col w-full sm:w-auto">
              <div className="flex items-center w-full">
                <span
                  className="text-xs px-1 py-0.5 rounded-sm text-gray-300 font-bold text-left"
                  style={{ fontSize: "70%" }}
                >
                  FOR
                </span>
                <div className="relative">
                  <CiCircleInfo
                    color="white"
                    size={12}
                    onMouseEnter={() => setShowInfo1(true)}
                    onMouseLeave={() => setShowInfo1(false)}
                  />
                  {showInfo1 && (
                    <div className="absolute top-0 left-full bg-gray-950 bg-opacity-100 p-2 rounded shadow text-xs w-20 text-gray-500">
                      The Amount you are paying
                    </div>
                  )}
                </div>
              </div>
              <input
                type="number"
                value={forAmount.amount}
                onChange={(e) => handleForAmountChange(index, e.target.value)}
                inputMode="numeric"
                placeholder="0.00"
                className="bg-transparent pt-1 px-2 border-none outline-none text-white text-xl tracking-wide w-full sm:w-auto mt-2 sm:mt-0"
              />
            </div>

            <div className="flex items-end w-full sm:w-auto mt-2 sm:mt-0">
              <div className=" relative w-full sm:w-auto">
                <span className="text-[11px] text-nowrap text-gray-500 absolute right-2 -top-4">
                  Balance <strong className="text-white">0 ETH</strong>
                </span>
                <div className="flex items-center gap-x-1">
                  <button
                    className="flex items-center justify-between w-full px-2 py-1 text-white rounded-md border border-gray-700 focus:outline-none"
                    onClick={() => toggleDropdownAddedBox(index)}
                  >
                    {forAmount.token ? (
                      <img
                        src={forAmount.token.icon}
                        alt={forAmount.token.name}
                        className="w-4 h-4 mr-1"
                      />
                    ) : (
                      "Select Token"
                    )}
                    <span className="text-sm">
                      {forAmount.token?.name || ""}
                    </span>
                    <FiChevronDown color="#94a3b8" />
                  </button>
                </div>
              </div>
            </div>

            {forAmount.isDropdownOpen && (
              <div className="absolute right-1 top-20 z-[99999]  w-full sm:w-40 custon-gray-bg rounded-md shadow-lg">
                <ul className="py-1">
                  {chainOptions.map((chain, idx) => (
                    <li key={idx}>
                      <button
                        className="flex items-center w-full px-3 py-2 text-white text-xs hover:bg-gray-700"
                        onClick={() => handleTokenSelect(index, chain)}
                      >
                        <img
                          src={chain.icon}
                          alt={chain.name}
                          className="w-6 h-6 mr-2"
                        />
                        {chain.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        disabled={forAmounts.length === 6}
        onClick={addForAmount}
        className="cursor-pointer rounded-[5px] mt-2 font-semibold bg-[#fec949] w-[99%] py-1 mx-auto text-black "
      >
        Add More Token
      </button>

      <div className="flex flex-col items-start p-2 mt-2">
        <h1 className="text-gray-500 font-bold text-[13px]">FILL TYPE</h1>
        <div onClick={() => SetPartialFillChunkSize(2)}>
          <div className="container">
            <input
              type="radio"
              name="radio"
              value="Partial Fill"
              checked={selectedOption === "Partial Fill"}
              onChange={() => setSelectedOption("Partial Fill")}
            />
            <span className="checkmark"></span>
            <span className="ms-7 text-white text-sm">Partial Fill</span>
          </div>
          <p className="ms-7 text-sm text-gray-500">
            Multiple Users can contribute to fulfill their offer
          </p>
        </div>
        {selectedOption === "Partial Fill" || PartialFillChunkSize > 1 ? (
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
          width: ${PartialFillChunkSize}%;
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
                      transform: "translateX(-50%)",
                    }}
                  >
                    {tooltip.chunkSize}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-[1px]  left-0 bg-opacity-100 flex justify-between w-full">
              {[2, 25, 50, 75, 100].map((value) => (
                <div
                  key={value}
                  className={`w-4 h-4 ${
                    PartialFillChunkSize >= value
                      ? "bg-[#00e641]"
                      : "bg-slate-600 border-gray-400 bg-opacity-100"
                  } cursor-pointer bg-opacity-100 rounded-full`}
                ></div>
              ))}
            </div>

            {/* Labels below the progress bar */}
            <div className="flex justify-between mb-1 ms-1 text-gray-400">
              <p className="text-xs">2</p>
              <p className="text-xs">25</p>
              <p className="text-xs">50</p>
              <p className="text-xs">75</p>
              <p className="text-xs">100</p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div onClick={() => SetPartialFillChunkSize(1)}>
          <div className="container">
            <input
              type="radio"
              name="radio"
              value="Entire Fill"
              checked={selectedOption === "Entire Fill"}
              onChange={() => setSelectedOption("Entire Fill")}
            />
            <span className="checkmark"></span>
            <span className="ms-7 text-white text-sm">Entire Fill</span>
          </div>
          <p className="ms-7 text-sm text-gray-500">
            Entire Offer must be filled by 1 user
          </p>
        </div>

        <div>
          <div className="container">
            <input
              type="radio"
              name="radio"
              value="Private Fill"
              checked={selectedOption === "Private Fill"}
              onChange={() => setSelectedOption("Private Fill")}
            />
            <span className="checkmark"></span>
            <span className="ms-7 text-white text-sm">Private Fill</span>
          </div>
          <p className="ms-7 text-sm text-gray-500 w-[80%]">
            Offer can only be filled by whitelisted user
          </p>
        </div>
        {selectedOption === "Private Fill" && (
          <div className="w-full mt-6 p-4 bg-[#15161B] rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <input
                type="text"
                name="text"
                value={todoAddAddress}
                onChange={(e) => setTodoAddAddress(e.target.value)}
                className="w-full sm:w-2/3 p-2 border border-gray-700 bg-gray-800 text-white rounded-md outline-none"
                placeholder="Enter Address..."
              />
              <button
                onClick={AddTodoAddressFunction}
                className="mt-2 sm:mt-0 w-full sm:w-auto py-2 px-2 bg-[#fec949] text-black font-semibold rounded-md hover:bg-[#fce042] transition duration-300"
              >
                Add Address
              </button>
            </div>
            <div
              style={{ marginTop: "14px" }}
              className="container flex items-center gap-2 mt-2  text-sm"
            >
              <input
                type="checkbox"
                name="checkbox"
                checked={ischecked}
                onChange={(e) => handlechecked(e)}
              />
              <span className="checkmark"></span>
              <span className="ms-7 text-white text-sm mt-1">
                Include Yourself
              </span>
            </div>
            <div
              id="forAmountScrollbar"
              className="mt-4 max-h-[120px] overflow-y-auto"
            >
              {todoAddressData &&
                todoAddressData.map((val, ind) => (
                  <div
                    key={ind}
                    className="p-2 mb-2 bg-gray-800 text-white rounded-md shadow-md"
                  >
                    <p>{val}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-x-2 md:gap-y-2"></div>

      <div className="flex py-4">
       
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-x-2 md:gap-y-2 overflow-hidden">
  
      </div> */}
    </div>
  );
};

const Card3 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedChain1, setSelectedChain1] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    setIsDropdownOpen(false);
  };
  const handleChainSelect1 = (chain) => {
    setSelectedChain1(chain);
    setIsDropdownOpen1(false);
  };

  // Array of chain options
  const chainOptions = [
    { name: "Solana", icon: "/assets/images/Solana_logo.png" },
    { name: "Ethereum", icon: "/assets/images/Ethereum_logo.png" },
  ];
  return (
    <div className=" md:p-3 rounded-lg  max-w-lg flex flex-col w-full md:w-screen overflow-hidden">
      <p
        style={{ lineHeight: "1" }}
        className="my-3 mt-3 px-4 text-[1.7rem] font-semibold"
      >
        You want to{" "}
        <span className=" text-[#2aca54] ">
          offer {OfferAmount1 + " " + offerSectionData.name}
        </span>{" "}
        for{" "}
        <span className=" text-[#2aca54]">
          {forSectionData
            .map((val) => " " + val.amount + " " + val.token.name)
            .join(",")}
        </span>
      </p>
      <div className="m-2 border border-gray-700 rounded-md">
        <div className="flex  justify-between  border-b border-gray-700 p-2 px-3">
          <div className="flex">
            {" "}
            <span
              className="text-md pe-1 py-0.5  rounded-sm   text-gray-500  text-left bg-opacity-30"
              style={{ fontSize: "90%" }}
            >
              Price per {offerSectionData.name}
            </span>
            <div className="relative">
              <CiCircleInfo color="white" className=" mt-1.5" size={12} />
            </div>
          </div>
          <div>
            {" "}
            <span className="text-md  text-gry-300 tracking-wide	">
              0.0832 <strong>ETH</strong>{" "}
            </span>{" "}
          </div>
        </div>
        <div className="flex  justify-between border-b border-gray-700 p-2 px-3">
          <div className="flex">
            {" "}
            <span
              className="text-md pe-1 py-0.5  rounded-sm  text-gray-500  text-left bg-opacity-30"
              style={{ fontSize: "90%" }}
            >
              Amount
            </span>
            <div className="relative">
              <CiCircleInfo color="white" className=" mt-[7px]" size={12} />
            </div>
          </div>{" "}
          <div>
            <div className="flex items-center ">
               
                  <span className="text-md  text-gray-300 tracking-wide	">
                    {OfferAmount1}
                  </span>
                  <div className="w-5 h-5 overflow-hidden rounded-full">
                    {console.log(offeraddress1)}
                    <img
                      src={getTokenImage(offeraddress1)}
                      alt="token-img"
                      className="object-cover w-half h-half"
                    />
              
                </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-between border-b border-gray-700 p-2 px-3">
          <div className="flex">
            {" "}
            <span
              className="text-md pe-1 py-0.5  rounded-sm  text-gray-500  text-left bg-opacity-30"
              style={{ fontSize: "90%" }}
            >
              FOR
            </span>
            <div className="relative">
              <CiCircleInfo color="white" className=" mt-1.5" size={12} />
            </div>
          </div>
          <div>
            <div className="flex items-center ">
              {forSectionData.map((val, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-md me-[2px] text-gray-300 tracking-wide	">
                    {val.amount}
                  </span>
                  <div className="w-5 h-5 overflow-hidden rounded-full">
                    <img
                      src={val.token.icon}
                      alt="token-img"
                      className="object-cover w-half h-half"
                    />
                  </div>
                  {index < forSectionData.length - 1 && <span>{", "}</span>}
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex  justify-between border-b border-gray-700 p-2 px-3">
          <div className=" text-gray-500 relative">
            Fill Type
            <div className="absolute top-2 left-16">
              <CiCircleInfo color="white" size={12} />
            </div>
          </div>
          <div className=" flex">
            {" "}
            <span className="border border-gray-800 rounded-full bg-opacity-30 text-xs text-gray-500  py-[2px] px-2 	font-medium	">
              {chainStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketCard = ({ logo, title, subtitle, description, sooncheck }) => {
  return (
    <div
      aria-disabled={true}
      className={`border-2 ${
        title.toString().includes("OTC")
          ? "hover:border-yellow-500 MarketCardHover cursor-pointer border-gray-800 "
          : "border-gray-800 border-opacity-25 "
      }    rounded-md py-6 relative `}
    >
      <div className="flex items-center justify-center flex-col ">
        <span
          className={`HoverLogo ${
            title.toString().includes("OTC") ? "opacity-70" : "opacity-10"
          } text-white  font-bold text-[1.7rem]`}
        >
          {logo}
        </span>
        <h5
          className={`text-white text-sm  text-center ${
            title.toString().includes("NFT") ? "pt-1" : "pt-3"
          } ${title.toString().includes("OTC") ? "opacity-70" : "opacity-10"}`}
        >
          {title}
        </h5>
        <span
          className={`text-xs text-center text-white my-1 ${
            title.toString().includes("OTC") ? "opacity-40" : "opacity-10"
          }`}
        >
          {subtitle}
        </span>
        <p
          className={`text-xs text-center text-white ${
            title.toString().includes("OTC") ? "opacity-40" : "opacity-10"
          } `}
        >
          {description}{" "}
        </p>
        <span className=" absolute top-1 text-sm rounded-full px-2 right-1 bg-slate-500 bg-opacity-55 opacity-15">
          {sooncheck && sooncheck}
        </span>
      </div>
    </div>
  );
};

const Network = ({ name, icon }) => {
  return (
    <div
      className={`border ${
        name.toString().toLowerCase().includes("ethereum")
          ? "border-gray-800  hover:border-yellow-500 cursor-pointer "
          : "border-gray-600 text-white opacity-10"
      } rounded-md py-2 px-2 overflow-hidden`}
    >
      <div className="flex items-center">
        {icon && icon}
        <span className="text-sm">{name}</span>
      </div>
    </div>
  );
};

export default OfferMarketCard;
