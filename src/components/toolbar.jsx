
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { LuListFilter } from "react-icons/lu";
import { LuArrowUpDown } from "react-icons/lu";
import "../App.css"

const HorizontalToolbar = () => {
  return (
    <div className="custom-gray-light py-2 md:px-2">
    <div className="flex flex-wrap justify-between items-center gap-1 md:gap-2 text-sm ">
      
      {/* First Button Group */}
      <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1">
        <button className="border border-gray-800 text-green-500 rounded-md px-2 py-1">Buy</button>
        <button className="border border-gray-800 rounded-md px-2 py-1">Sell</button>
        <button className="border border-gray-800 rounded-md px-2 py-1">100% Filled</button>
        <button className="border border-gray-800 rounded-md px-2 py-1">Closed</button>
        <div className="col-span-6 md:col-span-2 flex flex-wrap gap-1">
        <button className="border border-gray-800 text-green-500 rounded-md px-2 py-1">Strict List</button>
        <button className="border border-gray-800 rounded-md px-2 py-1">All</button>
      </div>
      </div>
      
      {/* Second Button Group */}
      
      
      {/* Sorting Control */}
      <div className="col-span-6 md:col-span-3 flex items-center gap-1 flex-wrap">
        <label className="px-2 py-1 flex items-center">
          <LuArrowUpDown size={15} className="mr-1" /> Price:
        </label>
        <select className="border border-gray-800 rounded px-2 py-1 bg-zinc-950">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <div>
        <button className="border border-gray-800 rounded px-2 py-[6px]">
          <PiArrowsClockwiseBold size={16} />
        </button>
      </div>
      </div>
      
      {/* Refresh Button */}
      
      
      {/* Search Field */}
      <div className="flex items-center flex-wrap gap-1">
        <input 
          type="text" 
          placeholder="Enter token name or mint address" 
          className="border border-gray-800 rounded min-w-0 w-[60%] sm:w-auto px-1 sm:px-2 py-1 bg-zinc-950" 
        />
        <button className="border border-gray-800 rounded px-2 py-1 flex items-center gap-1">
          <LuListFilter size={18} /> Filter
        </button>
      </div>
  
    </div>
  </div>
  
  );
};

export default HorizontalToolbar;