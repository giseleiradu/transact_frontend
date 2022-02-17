import React, {useState} from 'react';
import {Formik} from 'formik';
import request, {headers} from '../api/http.comon';
import {user, transaction } from '../constants/types';

 import {
   useMutation,
   useQueryClient,
 } from 'react-query'


const Form = (props: any) => {
  const {title, showModal, setShowModal} = props;
  
   const QueryClient = useQueryClient();

      const register = ({username, email, password}:user) => {
      return request.post('/register', {username, email, password})
      }
      const login = ({email, password}:user) => {
      return request.post('/login', {email, password})
      }
      
      const transact = (
        {
        senderEmail,
        receiverEmail,
        sendingAmount,
        convertedAmount,
        sendingCurrency ,
        receivingCurrency
      }:transaction) => {
      return request.post('/transact', {
        senderEmail,
        receiverEmail,
        sendingAmount,
        convertedAmount,
        sendingCurrency ,
        receivingCurrency
      },{
       headers: headers,
      }
            )
      }

      const {data:registerData, error, mutate:registerMutate} = useMutation(register, {
        onSuccess: (data:any) => setShowModal(false),
        onError: (error)=>console.log('error', error),
        onSettled: (data, error, variables, context) => {
          // Error or success... doesn't matter!
          QueryClient.invalidateQueries('register');
        },

       });

       const {data, error:loginError, mutate:loginMutate} = useMutation(login, {
        onSuccess: (data) => {
          localStorage.setItem('token', `${data.data.accessToken}` );
          setShowModal(false)
        },
        onError: (loginError)=>console.log('error', loginError),
        onSettled: () => {
          // Error or success... doesn't matter!
          QueryClient.invalidateQueries('login');
        },
      });

      const {data: transactionData, error:transactionError, mutate:transactionMutate} = useMutation(transact, {
        onSuccess: (data) => {
          setShowModal(false)
        },
        onError: (transactionError)=>console.log('error', transactionError),
        onSettled: () => {
          // Error or success... doesn't matter!
          QueryClient.invalidateQueries('transact');
        },
      });
      
  
    const send = (values: any) =>{
      
      try {
        switch (title) {
          case "Login":
            {
              loginMutate({email: values.email, password : values.password})
            }
            break;

          case "Register":
            {
              registerMutate({email: values.email, password : values.password})
            }
            break;
        
          case "Transfer":
            
              transactionMutate({
                senderEmail:values.senderEmail,
                receiverEmail:values.receiverEmail,
                sendingAmount:values.sendingAmount,
                convertedAmount:values.convertedAmount,
                sendingCurrency:values.sendingCurrency ,
                receivingCurrency:values.receivingCurrency
            })
            
            break;
          default:
            break;
        }
            } catch (error) {
              console.log('error', error)
            }

          }

  return (
    <Formik
        initialValues={{ username: "", email: "", password:"", senderEmail: "",
        receiverEmail: "",
        sendingAmount: "",
        convertedAmount: "",
        sendingCurrency : "",
        receivingCurrency: "" }}
        onSubmit={
          send
        }
      >
      {({values, handleChange, handleSubmit})=>(

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
      >
        <div className="mb-4">
          {
            title==='Transfer'? (
              <>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="senderEmail" type="text" placeholder="Sender Email"
                 name="senderEmail" value={values.senderEmail} onChange={handleChange('senderEmail')}
                 />
              
                <input className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="receiverEmail" type="text" placeholder="Receiver Email" 
                 name="receiverEmail" value={values.receiverEmail} onChange={handleChange('receiverEmail')}
                 />
                
                <input className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="sendingAmount" type="text" placeholder="Sending Amount" 
                 name="sendingAmount" value={values.sendingAmount} onChange={handleChange('sendingAmount')}
                 />
                
                <input className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="convertedAmount" type="text" placeholder="Converted Amount"
                  name="convertedAmount" value={values.convertedAmount} onChange={handleChange('convertedAmount')}
                  />
                <div className="inline-block relative w-64 px-1">
                  <select 
                  id="sendingCurrency"
                  // className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="sendingCurrency" value={values.sendingCurrency} onChange={handleChange('sendingCurrency')}
                  >
                    <option>Sending Currency</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>NGN</option>
                </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                
              <div className="inline-block relative w-64 px-1">
                  <select
                  id="receivingCurrency"
                  // className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="receivingCurrency" value={values.receivingCurrency} onChange={handleChange('receivingCurrency')}
                  
                  >
                      <option>Receiving Currency</option>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>NGN</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
              </div>
              
              </>

            ):(
              <>
              {
              title === 'Register'?(
                <>

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username" type="text" placeholder="Username"
                name="username" value={values.username} onChange={handleChange('username')}
                />
                </>
               ):null
              } 
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
               </label>
               <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="text" placeholder="Email"
                name="email" value={values.email} onChange={handleChange('email')} />
       
       {/* </div> */}
       <div className="mb-6">
         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
           Password
         </label>
         <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
         id="password" type="password" placeholder="******************"
         name="password" value={values.password} onChange={handleChange('password')} />
         <p className="text-red-500 text-xs italic">Please choose a password.</p>
       </div>
       </> 
       )
      }
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
           className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
           type="button"
            onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
              >
              {title}
            </button> 
          </div>       
      </form>
        )}
      </Formik>
  );
}

export default Form;