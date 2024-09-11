/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import OTCcard from '../../components/otcCard';
import HorizontalToolbar from '../../components/toolbar';
import Loader from '../Loader';
import { readContract } from '@wagmi/core';
import { abi, contractAddress, formater, zeroAddress } from '../../BlockChainContext/helper';
import { config } from '../../BlockChainContext/config';
import { useHeaderData } from '../../HeaderContext';
import { getTokenName } from '../../utils/ReuseFuntions';

const Home = () => {
  // const [TokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [numberOfOffers, setNumberOfOffers] = useState(null); // Initialize with null
  const [data, setData] = useState([]);
  const { filterByAmount, setFilterbyamount, callTheFunction, setCallTheFunction,filterByTokenName,setFilterByTokenName} = useHeaderData();
  let offersData = [];

 
  const getNumberOfOffer = async () => {
    try {
      const result = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'total_offers',
      });
      setNumberOfOffers(Number(result));
    } catch (error) {
      console.log(error);
    }
  };


  const getOffers = async () => {
    try {
      for (let i = 1; i <= numberOfOffers; i++) {
        const offer = await readContract(config, {
          abi,
          address: contractAddress,
          functionName: 'read_offer',
          args: [i],
        });
        offersData.push(offer);
      }
      setData(offersData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true); 
    getNumberOfOffer();
  }, []);


  // Sort data by amount
  useEffect(() => {
    if (filterByAmount) {
      const sortedData = [...data].sort((a, b) => {
        // Sort based on 'amount'
        return filterByAmount === "asc"
          ? Number(formater(a.amount)) - Number(formater(b.amount)) // Ascending order
          : Number(formater(b.amount)) - Number(formater(a.amount)); // Descending order
      });
  
      setData(sortedData);
      setFilterbyamount(null); // Reset filter state after sorting
    }
  }, [filterByAmount, data]);

  // Fetch data from blockchain
  useEffect(() => {
    if (numberOfOffers !== null) {
      getOffers();
    }
  }, [numberOfOffers]);

   // Filter by token name

  useEffect(() => {
    if (callTheFunction && filterByTokenName) {
      const filteredData = data.filter((val) => {
        return getTokenName(val.owned_asset.asset_address).toLowerCase().includes(filterByTokenName.toLowerCase());
      });
       console.log(filteredData)
      setData(filteredData);
      setCallTheFunction(false);
      setFilterByTokenName("") // Reset to false after filtering
    }
  }, [callTheFunction, filterByTokenName, data]);
  return (
    <>
      <div className="px-5 md:px-1 pt-5">
        <HorizontalToolbar />
      </div>

      {loading ? (
        <Loader /> 
      ) : (
        <div className="md:py-3 px-2 md:px-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-3 text-white">
          {data && data.map((val, ind) => val.owner != zeroAddress && (
            <div key={ind} className="py-1 md:py-0">
              <OTCcard key={ind} data={val} offerId={ind+1} isMultiToken={val.requested_assets.length > 1 ? true : false} isEthereum={val.owned_asset.asset_address === "0x0000000000000000000000000000000000000000" ? true : false} calculatedChunkSize={val.amount.toString()/val.owned_asset.chunk_size.toString()} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
