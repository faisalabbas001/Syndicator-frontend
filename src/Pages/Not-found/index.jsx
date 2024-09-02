import { Link } from "react-router-dom";

const NoPage = () => {
    return <div className=" min-h-screen text-white bg-[#17181C] flex flex-col justify-center items-center">
                  <h1>404</h1>
                  <h2>Page Not Found</h2>
                  <Link to="/" className={" py-1 px-2 mt-1 bg-slate-800 text-white font-semibold rounded-md"}>Back to Home</Link>
    </div>;
  };
  
  export default NoPage;