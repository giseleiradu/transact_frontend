

import React, {useState} from "react";
import Table from "./Table";
import request, {headers} from '../api/http.comon';

 import {
   useQuery,
   useQueryClient,
 } from 'react-query'

const  TableModal = (props: any) => {


  const {title} = props;
  const [showModal, setShowModal] = useState(false);

   const QueryClient = useQueryClient();

  const profile = () => {
    return request.get('/profile',{
       headers: headers
      })
   }
  const {data:profileData, isLoading} =useQuery('profile', profile,{
    onSettled: () => {
          // Error or success... doesn't matter!
          QueryClient.invalidateQueries('profile');
        },
  })
  
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {title}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className=" flex-auto mx-9">
                  {
                    title=== "Profile"?(<>
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    <h1 className="items-center justify-center py-3 center font-bold">
                       Hi {profileData?.data.profile.username},
                    </h1>
                      
                  </div>
                  <h1>Your Balance is as Follow:</h1>
                      <h2>USD: {profileData?.data.profile.USD}</h2>
                      <h2>NGN: {profileData?.data.profile.NGN}</h2>
                      <h2>EUR: {profileData?.data.profile.EUR}</h2>
                      

                    </>):(<>

                      <Table title={title}/>
                    </>)
                  }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" border text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default TableModal;