

import React from "react";
import request, {headers} from '../api/http.comon';

 import {
   useQuery,
   useQueryClient,
 } from 'react-query'

const  Table = (props: any) => {
  const {title} = props
  
  const QueryClient = useQueryClient();
  
const usersHeaders =[
  'Username', 'Email', 'NGN', 'USD', 'EUR', 'Created Date'
]

const transactionsHeaders =[
  'Sender Email',
  'Sending Amount',
  'Sending Currency',
  'Receiver Email',
  'Converted Amount',
  'Receiving Currency',
  'Created Date',
]
 const transactions = () => {
      return request.get('/transactions',{
        headers: headers
      })
      }
const users = () => {
      return request.get('/users',{
        headers: headers
      })
      }
      const {data:usersData} =useQuery('users', users,{
        onSettled: () => {
          // Error or success... doesn't matter!
          QueryClient.invalidateQueries('users');
        },
    
      })
    const {data:transactionsData} =useQuery('transactions', transactions,{
      onSettled: () => {
          // Error or success... doesn't matter!
          QueryClient.invalidateQueries('transactions');
        },
    }
    )

  return (
    <>
    {
      title ==='Transactions'?(<>
        <table className="border-separate border border-slate-500 w-full">
                          <thead>
                        <tr>
                          {transactionsHeaders.map((header:any, index:any) => (

                              <th className="border border-slate-600 ..."
                              key={Math.random()}>{header}</th>
                            ))}
                        </tr>
                          </thead>
                          <tbody>
                            {transactionsData?.data.transactions.map((transaction:any) => (
                            <tr>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.senderEmail}</td>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.sendingAmount}</td>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.sendingCurrency}</td>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.receiverEmail}</td>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.convertedAmount}</td>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.receivingCurrency}</td>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{transaction.createdDate}</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
      </>):(<>
         <table className="border-separate border border-slate-500 w-full">
                          <thead>
                        <tr>
                          {usersHeaders.map((header:any, index:any) => (

                              <th className="border border-slate-600 ..."
                              key={Math.random()}>{header}</th>
                            ))}
                        </tr>
                          </thead>
                          <tbody>
                            {usersData?.data.users.map((user:any) => (
                            <tr>
                              <td className="border border-slate-700 ..."
                              key={Math.random()}>{user.username}</td>
                            <td className="border border-slate-700 ..."
                            key={Math.random()}>{user.email}</td>
                            <td className="border border-slate-700 ..."
                            key={Math.random()}>{user.NGN}</td>
                            <td className="border border-slate-700 ..."
                            key={Math.random()}>{user.USD}</td>
                            <td className="border border-slate-700 ..."
                            key={Math.random()}>{user.EUR}</td>
                            <td className="border border-slate-700 ..."
                            key={Math.random()}>{user.createdDate}</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
      </>)
    }
     
                       
                        
        </>
  );
}

export default Table;




