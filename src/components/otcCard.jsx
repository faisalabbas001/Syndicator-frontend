/* eslint-disable react/prop-types */
import { GoArrowRight } from 'react-icons/go';
// import{ethers}from 'ethers';

import '../styles/otcCard.css';
import { Link } from 'react-router-dom';
import { formater } from '../BlockChainContext/helper';
import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import { getTokenImage, getTokenName } from '../utils/ReuseFuntions';
const OTCcard = ({
  data,
  offerId,
  isMultiToken,
  isEthereum,
  calculatedChunkSize,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState({
    chunk_size: data.requested_assets[0].chunk_size,
    asset_address: data.requested_assets[0].asset_address,
    indexToAccept: 0,
  });

  console.log(data);
  const {
    owned_asset: contractAddress,
    // owner,
    requested_assets: forAmount,
    // forTokenImage,
    // forTotalValue,
    // name,
    // pricePerToken,
    // progressPercentage,
    // partialFull,
    amount: sellingAmount,
    // timeAgo,
    // tokenImage
  } = data;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    setIsDropdownOpen(false);
  };

  console.log(selectedChain);

  return (
    <div className="w-auto  rounded-lg shadow bg-opacity-20 bg-[#333232] flex flex-col h-full">
      <div className=" flex flex-col flex-1 justify-between">
        <div className="flex px-3 xxl:px-4 pt-3 pb-1 justify-between items-center">
          <div className="flex items-center">
            <div className="md:w-16 md:h-15 w-16 h-15 overflow-hidden rounded-full">
              <img
                src={getTokenImage(contractAddress.asset_address)}
                alt="token-img"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ps-3">
              <h3 className="text-white text-2xl">
                {getTokenName(contractAddress.asset_address)}
              </h3>
              <div className=" flex flex-wrap gap-x-1 sm:gap-y-1">
                <span className="text-gray-500 text-xs rounded-md p-1 custon-gray-bg">
                  {contractAddress.asset_address.slice(0, 4) +
                    '...' +
                    contractAddress.asset_address.slice(-4)}
                </span>
                <span className="text-gray-500 text-xs  rounded-md p-1 custon-gray-bg">
                  {sellingAmount.toString() ===
                  contractAddress.chunk_size.toString()
                    ? 'Entire Fill'
                    : 'Partial Fill'}
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
                strokeDashoffset={`calc(251.2 - (251.2 * ${5}) / 100)`}
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
                {5}%
              </text>
            </svg>
          </div>
          {/* <div><RadialProgressBar  progress={100}/></div> */}
        </div>
        {/* second row */}
        <div className="flex justify-between items-center py-1">
          <span>
            {' '}
            <div className="flex flex-col px-5">
              <span className=" custom-gray font-bold text-sm ">SELLING</span>
              <div className="flex items-center mt-1">
                <span className="text-xl me-1 text-gray-300">
                  {formater(sellingAmount)}
                </span>{' '}
                <div className="w-5 h-auto overflow-hidden rounded-full">
                  <img
                    src={getTokenImage(contractAddress.asset_address)}
                    alt="token-img"
                    className="object-cover w-half h-half"
                  />
                </div>
              </div>
              <span className=" custom-gray">${'NAN'}/Token</span>
            </div>
          </span>
          <span>
            <GoArrowRight color="#2a2f3d" className="font-bold" size={25} />
          </span>

          <span>
            {' '}
            <div className="flex flex-col ps-auto pe-6 ">
              <span className=" custom-gray font-bold text-sm text-right ">
                FOR
              </span>

              <div className="flex relative mt-1 items-end w-full sm:w-auto sm:mt-0">
                {forAmount.length > 1 ? (
                  <div className=" w-full sm:w-auto">
                    <button
                      className="flex items-center justify-between w-full px-2 py-1 text-white rounded-md border border-gray-700 focus:outline-none"
                      onClick={toggleDropdown}
                    >
                      {selectedChain.chunk_size.toString() ? (
                        <img
                          src={getTokenImage(selectedChain.asset_address)}
                          alt={'Solana'}
                          className="w-5 h-5 rounded-full mr-1"
                        />
                      ) : (
                        'Select Token'
                      )}
                      <span className="text-sm">
                        {selectedChain.chunk_size.toString()
                          ? formater(selectedChain.chunk_size)
                          : ''}
                      </span>
                      <FiChevronDown color="#94a3b8" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-1 z-[9999] mt-1 w-full  sm:w-28   custon-gray-bg rounded-md shadow-lg">
                        <ul className="py-1">
                          {forAmount.map((chain, index) => (
                            <li key={index}>
                              <button
                                className="flex items-center w-full px-3 py-2 text-white text-xs hover:bg-gray-700"
                                onClick={() => handleChainSelect({...chain,indexToAccept: index})}
                              >
                                <img
                                  src={getTokenImage(chain.asset_address)}
                                  alt={'token-img'}
                                  className="w-6 rounded-full h-6 mr-2"
                                />
                                {formater(chain.chunk_size)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {' '}
                    <img
                      src={getTokenImage(forAmount[0].asset_address)}
                      alt={'Solana'}
                      className="w-5 rounded-full h-5 mr-1"
                    />
                    {formater(forAmount[0].chunk_size)}
                  </div>
                )}
              </div>
              <span className=" custom-gray text-right">${'NAN'}</span>
            </div>
          </span>
        </div>

        <div className="border-t border-gray-800 flex justify-between items-center px-6 my-0 py-2 ">
          <span className=" custom-gray ">8m ago</span>
          <span className="">
            <Link
              to={`token-sale/bonk`}
              state={{
                ...data,
                selectedChain,
                offerId,
                isMultiToken,
                isEthereum,
                calculatedChunkSize,
              }}
              className=" bg-gray-600 bg-opacity-35 custom-gray font-bold py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-green-700 hover:text-white"
            >
              <span>Buy</span>
              <GoArrowRight className="ml-2" size={20} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OTCcard;
