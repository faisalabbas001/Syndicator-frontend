/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import OTCcard from '../../components/otcCard';
import HorizontalToolbar from '../../components/toolbar';
import Loader from '../Loader';
import { readContract } from '@wagmi/core';
import { abi, contractAddress } from '../../BlockChainContext/helper';
import { config } from '../../BlockChainContext/config';

const Home = () => {
  // const [TokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [numberOfOffers, setNumberOfOffers] = useState(null); // Initialize with null
  const [data, setData] = useState([]);
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

  useEffect(() => {
    if (numberOfOffers !== null) {
      getOffers();
    }
  }, [numberOfOffers]);

  return (
    <>
      <div className="px-5 md:px-1 pt-5">
        <HorizontalToolbar />
      </div>

      {loading ? (
        <Loader /> 
      ) : (
        <div className="md:py-3 px-2 md:px-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-3 text-white">
          {data && data.map((val, ind) => (
            <div key={ind} className="py-1 md:py-0">
              <OTCcard key={ind} data={val} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
