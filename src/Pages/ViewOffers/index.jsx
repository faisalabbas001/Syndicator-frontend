import { useEffect, useState } from "react";
import OTCcard from "../../components/otcCard";
import HorizontalToolbar from "../../components/toolbar";
import Loader from "../Loader";

const Home = () => {
  const [TokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const FetchData = async () => {
    const data = await fetch("/data.json");
    const actualdata = await data.json();
    setTokenData(actualdata);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <div className="px-5 md:px-1  pt-5">
        <HorizontalToolbar />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="md:py-3 px-2  md:px-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-3 text-white">
          {TokenData.map((val, ind) => (
            <div key={ind} className="py-1 md:py-0">
              <OTCcard key={ind} data={val} />
            </div>
          ))}

          {/* <div>04</div> */}
        </div>
     


      )}
    </>
  );
};

export default Home;
