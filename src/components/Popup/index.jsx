/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"; 

const DeactivateModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  if (!show) return null;
  return (
    <div className="relative z-[1000]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center py-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-[#15161b] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className=" pb-4 pt-5 sm:py-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                
                <div className="mt-3 text-center sm:mt-0 sm:text-left  ">
                  <h3 className="text-base font-semibold leading-6 px-2 sm:px-4 text-white relative pb-5 py-4 border-b-2 border-gray-700" id="modal-title">
                    Cancel Create Offer <span onClick={onClose} className="absolute right-4 top-[11px] font-thin cursor-pointer text-gray-400 text-[1.3rem]"> X </span>
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 pt-3 px-2 sm:px-3">
                      Are you sure you want to cancel creating the offer? This action cannot be undone, and the information will not be saved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-4 pt-1 pb-5 space-x-2  sm:px-6">
              
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex  justify-center rounded-md py-[13px] bg-[#292c35] px-3  text-sm font-semibold  text-gray-400 shadow-sm hover:bg-opacity-70 sm:mt-0 w-[47%]"
              >
                Not Now
              </button>
              <button
                onClick={()=>navigate("/")}
                type="button"
                className="inline-flex w-[47%] justify-center rounded-md bg-[#fe4237] px-3 py-[13px] text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 "
              >
                Cancel Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DeactivateModal;
