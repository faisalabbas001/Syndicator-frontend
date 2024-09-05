import { AiOutlineArrowDown } from 'react-icons/ai';
import { BiShapePolygon } from 'react-icons/bi';
import { DiDocker } from 'react-icons/di';
import { TbDropCircle } from 'react-icons/tb';
import { FaGgCircle } from 'react-icons/fa';
import { FcDoughnutChart } from 'react-icons/fc';
import { AiOutlineBold } from 'react-icons/ai';
import { FcScatterPlot } from 'react-icons/fc';
import { AiFillMediumSquare } from 'react-icons/ai';
import { TbCurrencySolana } from 'react-icons/tb';
import { FaScroll } from 'react-icons/fa';
import { FaAirbnb } from 'react-icons/fa';
import { BiBitcoin } from 'react-icons/bi';
import { BsPCircle } from 'react-icons/bs';
import { TbArrowZigZag } from 'react-icons/tb';
import { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import 'react-step-progress-bar/styles.css';
// import { ProgressBar, Step } from "react-step-progress-bar";
// import { GoCheckCircleFill } from "react-icons/go";
import { FiChevronDown } from 'react-icons/fi';
import { CiCircleInfo } from 'react-icons/ci';
import { FaLockOpen, FaScaleBalanced } from 'react-icons/fa6';
import '../styles/otcCard.css';
import DeactivateModal from './Popup';
import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core';
import{ethers}from 'ethers';
import { abi, contractAddress } from '../BlockChainContext/helper';
import { parseEther } from 'viem';
import { config } from '../BlockChainContext/config';
let equivalent_asset;
let OfferAmount1;
const OfferMarketCard = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  //   const [selected, setSelected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
    if (progress === 0) {
      setProgress(50);
    } else {
      setProgress(100);
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }

    if (progress === 100) {
      setProgress(50);
    } else {
      setProgress(0);
    }
  };
  const handleSubmit = async () => {
    try {
      console.log(equivalent_asset, OfferAmount1);
      const { request } = await simulateContract(config, {
        abi: abi,
        address: contractAddress,
        functionName: 'create_single_coin_offer',
        args: [equivalent_asset,1],
        value: parseEther(OfferAmount1.toString()),
      });

      const hash = await writeContract(config, request);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        // confirmations: 2,
        hash: hash,
      });
      console.log(transactionReceipt);
      //setReceipt(transactionReceipt);
    } catch (error) {
      console.log(error);
      alert('There is some error in transaction, Please try again'); // Toast notification
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
                  onClick={handleSubmit}
                  className="bg-[#ffc848] text-black px-4 py-2 rounded-md mt-2 mx-auto w-[92%] md:w-full  "
                >
                  Deposit 10 MACH7
                </button>
              </>
            )}
            {activeStep < totalSteps && (
              <button
                onClick={handleNext}
                className={`bg-[#fec949] text-black px-4 py-2 rounded-md ${
                  activeStep === 1 ? 'w-full' : 'w-[48%]'
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
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1,
            transform:
              'translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)',
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
          1{' '}
        </span>{' '}
        <h4 className="text-white "> Select Market</h4>
      </div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-x-2 md:gap-y-2">
        <MarketCard
          logo={<TbArrowZigZag />}
          title={'OTC'}
          subtitle={'Trade pre-TGE'}
          description={'token allocations.'}
        />
        <MarketCard
          logo={<BsPCircle />}
          title={'Points Market'}
          subtitle={'Trade protocols'}
          description={'points.'}
          sooncheck={'soon'}
        />
        <MarketCard
          logo={<BiBitcoin />}
          title={'Runes Market'}
          subtitle={'Trade pre-launch'}
          description={'Runes allocations.'}
          sooncheck={'soon'}
        />
        <MarketCard
          logo={<FaScaleBalanced />}
          title={'Runes DEX'}
          subtitle={'Trade Runes OTC'}
          sooncheck={'soon'}
        />
        <MarketCard
          logo={<NftIcon />}
          title={'NFT Whitelists'}
          subtitle={'Trade Pre-Mint NFT '}
          description={'Whitelist'}
          sooncheck={'soon'}
        />
        <MarketCard
          logo={<FaLockOpen />}
          title={'Vesting Market'}
          subtitle={'Trade Vesting Token Ownership'}
          sooncheck={'soon'}
        />
      </div>

      <div className="flex py-4">
        <span className=" rounded-full bg-gray-700 bg-opacity-60 px-2 me-2 text-gray-400 text-sm text-center flex justify-center items-center">
          2{' '}
        </span>{' '}
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
        />{' '}
        <Network name="Linea" icon={<FcScatterPlot className=" mr-1" />} />
        <Network
          name="Blast"
          icon={
            <AiOutlineBold
              className={
                'mr-1 p-[1px] italic font-bold bg-black rounded text-yellow-500'
              }
            />
          }
        />{' '}
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
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedChain, setSelectedChain] = useState('');
  const [selectedChain1, setSelectedChain1] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Partial Fill');
  const [offerAmount, SetOfferAmount] = useState();
  const [ForAmount, SetForAmount] = useState(0);
  const [addmultitoken, setmultitoken] = useState(0);

  OfferAmount1 = offerAmount;
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const handleChainSelect = (chain) => {
    if (chain.name === selectedChain1?.name) {
      alert('Please choose another');
      return;
    }
    setSelectedChain(chain);
    setIsDropdownOpen(false);
  };
  const handleChainSelect1 = (chain) => {
    if (chain.name === selectedChain?.name) {
      alert('Please choose another');
      return;
    }
    setSelectedChain1(chain);
    setIsDropdownOpen1(false);
  };

  // Array of chain options
  const chainOptions = [
    {
      name: 'ETH',
      icon: '/assets/images/Ethereum_logo.png',
      address: '0x0000000000000000000000000000000000000000',
    },
    {
      name: 'PEPE',
      icon: '/tokenImages/token1.png',
      address: '0x3797988B94E4bDb9767FC8BC0Ea4BE5e9e7a6931',
    },
    {
      name: 'SyndicatorLabs',
      icon: '/tokenImages/token2.png',
      address: '0x6aa31F147b206C3eC2E8D7c420e4F3ceb4D269Fb',
    },
    {
      name: 'Bitcoin',
      icon: '/tokenImages/token3.png',
      address: '0x806D0637Fbbfb4EB9efD5119B0895A5C7Cbc66e7',
    },
    {
      name: 'Doge',
      icon: '/tokenImages/token4.png',
      address: '0x9bc8388dD439fa3365B1F78A81242aDBB4677759',
    },
    {
      name: 'FI',
      icon: '/tokenImages/token5.png',
      address: '0xe6714a67cabd598882C42e2719908E648E734ec3',
    },
  ];

  //const chunk_num = 1n;
  //let amount = parseEther(ForAmount.toString());
  equivalent_asset = [
    ethers.utils.parseUnits(ForAmount.toString(),"ether"),
    selectedChain1.address
  ];
  // console.log(equivalent_asset)

  

  const HandleMultiCoin=()=>{
    if(!selectedChain1 && ForAmount == 0){
      console.log("add amount ")
      
    }
    else{
      setmultitoken((val)=>val+1)
    }
  }
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
            '0 1px 4px 0 rgba(255, 255, 255, 0.0001), 0 1px 3px 0 rgba(255, 255, 255, 0.1)',
        }}
        className="flex flex-wrap px-2 sm:px-4 py-2 sm:p-4 bg-[#15161b] rounded-md justify-between w-full "
      >
        <div className="flex items-start flex-col w-full sm:w-auto">
          <div className="flex items-center w-full">
            <span
              className="text-xs px-2 py-0.5 rounded-sm text-gray-300 font-bold"
              style={{ fontSize: '60%' }}
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
                <div className="absolute top-0 left-full bg-gray-950 bg-opacity-80 p-2 rounded shadow text-xs w-20 text-gray-500">
                  The Amount of Token you want to buy
                </div>
              )}
            </div>
          </div>
          <input
            type="number"
            inputMode="numeric"
            value={offerAmount}
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
                  alt={selectedChain.name || 'Solana'}
                  className="w-4 h-4 mr-1"
                />
              ) : (
                'Select Token'
              )}
              <span className="text-sm">{selectedChain.name || ''}</span>
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

      <span className=" absolute rounded-full p-[6px] shadow-xl bg-[#15161b] bg-opacity-1 border border-gray-800 left-[45%] top-[157px] ">
        <AiOutlineArrowDown className="" />
      </span>

      {/* For */}

     

      <div
        style={{
          boxShadow:
            '0 0px 1px 0 rgba(255, 255, 255, 0.0001), 0 1px 3px 0 rgba(255, 255, 255, 0.1)',
        }}
        className="flex flex-wrap p-2 sm:p-4 bg-[#15161b] rounded-md justify-between mt-[6px] mb-2"
      >
        <div className="flex items-start flex-col w-full sm:w-auto">
          <div className="flex items-center w-full">
            <span
              className="text-xs px-1 py-0.5 rounded-sm text-gray-300 font-bold text-left"
              style={{ fontSize: '70%' }}
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
                <div className="absolute top-0 left-full bg-gray-950 bg-opacity-80 p-2 rounded shadow text-xs w-20 text-gray-500">
                  The Amount you are paying
                </div>
              )}
            </div>
          </div>
          <input
            type="number"
            value={ForAmount}
            onChange={(e) => SetForAmount(e.target.value)}
            inputMode="numeric"
            placeholder="0.00"
            className="bg-transparent pt-1 px-2 border-none outline-none text-white text-xl tracking-wide w-full sm:w-auto mt-2 sm:mt-0"
          />
        </div>
        <div className="flex items-end w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full sm:w-auto">
            <span className="text-[11px] text-nowrap text-gray-500 absolute right-2 -top-4">
              Balance <strong className={'text-white'}>0 ETH</strong>
            </span>
            {/* <button
        className="flex items-center justify-between w-full sm:w-auto space-x-1 text-white focus:outline-none rounded-md border border-gray-600 bg-opacity-80 p-1 sm:mt-0"
        onClick={toggleDropdown1}
      >
        
          <img
            src="/assets/images/Ethereum_logo.png"
            alt="Ethereum"
            className="w-6 h-6 mr-1"
          />
        
        <span className="text-sm pe-2">{selectedChain1.name || "Ethereum"}</span>
      </button> */}
            <div className=' flex items-center gap-x-1'>
            <button
              className="flex items-center justify-between w-full px-2 py-1 text-white rounded-md border border-gray-700 focus:outline-none"
              onClick={toggleDropdown1}
            >
              {selectedChain1.icon ? (
                <img
                  src={selectedChain1.icon}
                  alt={selectedChain1.name || 'Solana'}
                  className="w-4 h-4 mr-1"
                />
              ) : (
                'Select Token'
              )}
              <span className="text-sm">{selectedChain1.name || ''}</span>
              <FiChevronDown color="#94a3b8" />
              
            </button>
            <span onClick={HandleMultiCoin} className='cursor-pointer rounded-[50%] bg-[#fec949] h-5 p-1 w-6 me-1 flex justify-center text-black items-center'>+</span>
            </div>
      

            {isDropdownOpen1 && (
              <div className="absolute z-[99999] mt-1 w-full sm:w-40 custon-gray-bg rounded-md shadow-lg">
                <ul className="py-1">
                  {chainOptions.map((chain, index) => (
                    <li key={index}>
                      <button
                        className="flex items-center w-full px-3 py-2 text-white text-xs hover:bg-gray-700"
                        onClick={() => handleChainSelect1(chain)}
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

      {
       Array(addmultitoken).fill().map((_,index)=>(
          <div
        style={{
          boxShadow:
            '0 0px 1px 0 rgba(255, 255, 255, 0.0001), 0 1px 3px 0 rgba(255, 255, 255, 0.1)',
        }}
        className="flex flex-wrap p-2 sm:p-4 bg-[#15161b] rounded-md justify-between mt-[6px] mb-2"
      >
        <div className="flex items-start flex-col w-full sm:w-auto">
          <div className="flex items-center w-full">
            <span
              className="text-xs px-1 py-0.5 rounded-sm text-gray-300 font-bold text-left"
              style={{ fontSize: '70%' }}
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
                <div className="absolute top-0 left-full bg-gray-950 bg-opacity-80 p-2 rounded shadow text-xs w-20 text-gray-500">
                  The Amount you are paying
                </div>
              )}
            </div>
          </div>
          <input
            type="number"
            value={ForAmount}
            onChange={(e) => SetForAmount(e.target.value)}
            inputMode="numeric"
            placeholder="0.00"
            className="bg-transparent pt-1 px-2 border-none outline-none text-white text-xl tracking-wide w-full sm:w-auto mt-2 sm:mt-0"
          />
        </div>
        <div className="flex items-end w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full sm:w-auto">
            <span className="text-[11px] text-nowrap text-gray-500 absolute right-2 -top-4">
              Balance <strong className={'text-white'}>0 ETH</strong>
            </span>
            {/* <button
        className="flex items-center justify-between w-full sm:w-auto space-x-1 text-white focus:outline-none rounded-md border border-gray-600 bg-opacity-80 p-1 sm:mt-0"
        onClick={toggleDropdown1}
      >
        
          <img
            src="/assets/images/Ethereum_logo.png"
            alt="Ethereum"
            className="w-6 h-6 mr-1"
          />
        
        <span className="text-sm pe-2">{selectedChain1.name || "Ethereum"}</span>
      </button> */}
            <div className=' flex items-center gap-x-1'>
            <button
              className="flex items-center justify-between w-full px-2 py-1 text-white rounded-md border border-gray-700 focus:outline-none"
              onClick={toggleDropdown1}
            >
              {selectedChain1.icon ? (
                <img
                  src={selectedChain1.icon}
                  alt={selectedChain1.name || 'Solana'}
                  className="w-4 h-4 mr-1"
                />
              ) : (
                'Select Token'
              )}
              <span className="text-sm">{selectedChain1.name || ''}</span>
              <FiChevronDown color="#94a3b8" />
              
            </button>
            <span onClick={HandleMultiCoin} className='cursor-pointer rounded-[50%] bg-[#fec949] h-5 p-1 w-6 me-1 flex justify-center text-black items-center'>+</span>
            </div>
      

            {isDropdownOpen1 && (
              <div className="absolute z-[99999] mt-1 w-full sm:w-40 custon-gray-bg rounded-md shadow-lg">
                <ul className="py-1">
                  {chainOptions.map((chain, index) => (
                    <li key={index}>
                      <button
                        className="flex items-center w-full px-3 py-2 text-white text-xs hover:bg-gray-700"
                        onClick={() => handleChainSelect1(chain)}
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
       ))
      }

      <div className="flex flex-col items-start p-2 mt-2">
        <h1 className="text-gray-500 font-bold text-[13px]">FILL TYPE</h1>

        <div className="container">
          <input
            type="radio"
            name="radio"
            value="Partial Fill"
            checked={selectedOption === 'Partial Fill'}
            onChange={() => setSelectedOption('Partial Fill')}
          />
          <span className="checkmark"></span>
          <span className="ms-7 text-white text-sm">Partial Fill</span>
        </div>
        <p className="ms-7 text-sm text-gray-500">
          Multiple Users can contribute to fulfill their offer
        </p>

        <div className="container">
          <input
            type="radio"
            name="radio"
            value="Entire Fill"
            checked={selectedOption === 'Entire Fill'}
            onChange={() => setSelectedOption('Entire Fill')}
          />
          <span className="checkmark"></span>
          <span className="ms-7 text-white text-sm">Entire Fill</span>
        </div>
        <p className="ms-7 text-sm text-gray-500">
          Entire Offer must be filled by 1 user
        </p>

        <div className="container">
          <input
            type="radio"
            name="radio"
            value="Private Fill"
            checked={selectedOption === 'Private Fill'}
            onChange={() => setSelectedOption('Private Fill')}
          />
          <span className="checkmark"></span>
          <span className="ms-7 text-white text-sm">Private Fill</span>
        </div>
        <p className="ms-7 text-sm text-gray-500">
          Offer can only be filled by whitelisted user
        </p>
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
  const [selectedChain, setSelectedChain] = useState('');
  const [selectedChain1, setSelectedChain1] = useState('');
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
    { name: 'Solana', icon: '/assets/images/Solana_logo.png' },
    { name: 'Ethereum', icon: '/assets/images/Ethereum_logo.png' },
  ];
  return (
    <div className=" md:p-3 rounded-lg  max-w-lg flex flex-col w-full md:w-screen overflow-hidden">
      <p
        style={{ lineHeight: '1' }}
        className="my-3 mt-3 px-4 text-[1.7rem] font-semibold"
      >
        You want to <span className=" text-[#2aca54] ">offer 10 MACH7</span> for{' '}
        <span className=" text-[#2aca54]">0.1234 ETH</span>
      </p>
      <div className="m-2 border border-gray-700 rounded-md">
        <div className="flex  justify-between  border-b border-gray-700 p-2 px-3">
          <div className="flex">
            {' '}
            <span
              className="text-md pe-1 py-0.5  rounded-sm   text-gray-500  text-left bg-opacity-30"
              style={{ fontSize: '90%' }}
            >
              Price per MACH7
            </span>
            <div className="relative">
              <CiCircleInfo color="white" className=" mt-1.5" size={12} />
            </div>
          </div>
          <div>
            {' '}
            <span className="text-md  text-gry-300 tracking-wide	">
              0.0832 <strong>ETH</strong>{' '}
            </span>{' '}
          </div>
        </div>
        <div className="flex  justify-between border-b border-gray-700 p-2 px-3">
          <div className="flex">
            {' '}
            <span
              className="text-md pe-1 py-0.5  rounded-sm  text-gray-500  text-left bg-opacity-30"
              style={{ fontSize: '90%' }}
            >
              Amount
            </span>
            <div className="relative">
              <CiCircleInfo color="white" className=" mt-[7px]" size={12} />
            </div>
          </div>{' '}
          <div>
            <div className="flex items-center ">
              <span className="text-md  text-gray-300 tracking-wide	">
                3,000
              </span>
              <div className="w-5 h-5 overflow-hidden rounded-full">
                <img
                  src="/assets/images/Ethereum_logo.png"
                  alt="token-img"
                  className="object-cover w-half h-half"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-between border-b border-gray-700 p-2 px-3">
          <div className="flex">
            {' '}
            <span
              className="text-md pe-1 py-0.5  rounded-sm  text-gray-500  text-left bg-opacity-30"
              style={{ fontSize: '90%' }}
            >
              FOR
            </span>
            <div className="relative">
              <CiCircleInfo color="white" className=" mt-1.5" size={12} />
            </div>
          </div>
          <div>
            <div className="flex items-center ">
              <span className="text-md text-gray-300 tracking-wide	">
                0.1234{' '}
              </span>{' '}
              <div className="w-5 h-5 overflow-hidden rounded-full">
                <img
                  src="/assets/images/Solana_logo.png"
                  alt="token-img"
                  className="object-cover w-half h-half"
                />
              </div>
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
            {' '}
            <span className="border border-gray-800 rounded-full bg-opacity-30 text-xs text-gray-500  py-[2px] px-2 	font-medium	">
              PARTIAL
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
        title.toString().includes('OTC')
          ? 'hover:border-yellow-500 MarketCardHover cursor-pointer border-gray-800 '
          : 'border-gray-800 border-opacity-25 '
      }    rounded-md py-6 relative `}
    >
      <div className="flex items-center justify-center flex-col ">
        <span
          className={`HoverLogo ${
            title.toString().includes('OTC') ? 'opacity-70' : 'opacity-10'
          } text-white  font-bold text-[1.7rem]`}
        >
          {logo}
        </span>
        <h5
          className={`text-white text-sm  text-center ${
            title.toString().includes('NFT') ? 'pt-1' : 'pt-3'
          } ${title.toString().includes('OTC') ? 'opacity-70' : 'opacity-10'}`}
        >
          {title}
        </h5>
        <span
          className={`text-xs text-center text-white my-1 ${
            title.toString().includes('OTC') ? 'opacity-40' : 'opacity-10'
          }`}
        >
          {subtitle}
        </span>
        <p
          className={`text-xs text-center text-white ${
            title.toString().includes('OTC') ? 'opacity-40' : 'opacity-10'
          } `}
        >
          {description}{' '}
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
        name.toString().toLowerCase().includes('ethereum')
          ? 'border-gray-800  hover:border-yellow-500 cursor-pointer '
          : 'border-gray-600 text-white opacity-10'
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
