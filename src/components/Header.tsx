import React from 'react';
import Modal from './Modal';
import TableModal from './TableModal';
// import logo from './logo.svg';

const Header: React.FC = () => {
  return (
    <>
      <div className='flex justify-between'>
      <ul className="flex">
        <li className="mr-3">
          <Modal title='Transfer'/>
        </li>
        <li className="mr-3">
          <TableModal title='Profile'/>
        </li>
        <li className="mr-3">
          <TableModal title='Users'/>
        </li>
        <li className="mr-3">
          <TableModal title='Transactions'/>
        </li>
      </ul>

      <ul className='flex'>

    <li className="mr-3">
      <Modal title='Login'/>
      </li>
    <li className="mr-3">
      <Modal title='Register'/>
      </li>
      </ul>
    </div>
    </>
  );
}

export default Header;
