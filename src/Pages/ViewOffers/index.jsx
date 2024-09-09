import { useEffect, useState } from 'react';
import OTCcard from '../../components/otcCard';
import HorizontalToolbar from '../../components/toolbar';
import Loader from '../Loader';
import { readContract } from '@wagmi/core';
import { abi, contractAddress } from '../../BlockChainContext/helper';
import { config } from '../../BlockChainContext/config';

const Home =() => {
  // const [TokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberOfOffers, setNumberOfOffers] = useState();
const [data,setdata] = useState([]);
  let offersData=[];
  // const FetchData = async () => {
  //   const data = await fetch('/data.json');
  //   const actualdata = await data.json();
  //   setTokenData(actualdata);
  //   setLoading(false);
  // };

  const getNumberOfOffer = async () => {
    try {
      console.log('in');
      const result = await readContract(config, {
        abi,
        address: contractAddress,
        functionName: 'total_offers',
      });
      console.log(Number(result));
      setNumberOfOffers(Number(result));
      
    } catch (error) {
      console.log(error);
    }
  };


  const getOffers=async()=>{
    try {
      for (let i = 1; i <= numberOfOffers; i++) {
        console.log(numberOfOffers);
        console.log("counter"+i);
        const offers = await readContract(config, {
          abi,
          address: contractAddress,
          functionName: 'read_offer',
          args: [i],
        });
       // console.log(offers);
        offersData.push(offers);
      }
      // console.log(offersData);
      setdata(offersData)
      setLoading(false)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getOffers();
   
  }, [numberOfOffers]);

  // getOffers();
   getNumberOfOffer();
  // console.log(data);

  

  return (
    <>

      <div className="px-5 md:px-1  pt-5">
        <HorizontalToolbar />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="md:py-3 px-2  md:px-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-3 text-white">
      {/* {console.log(data&&data)} */}
      
          {
          data && data.map((val, ind) => {
            // console.log(val);

            return <div key={ind} className="py-1 md:py-0">
              <OTCcard key={ind} data={val} />
            </div>
})}

          {/* <div>04</div> */}
        </div>
      )}
    </>
  );
};

export default Home;
