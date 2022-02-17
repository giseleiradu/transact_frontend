import React from 'react';
import './App.css';
import Home from './containers/Home';
import Header from './components/Header';


function App() {

  return (
    <>
    <div className=' py-7 w-full'>
    <Header />
    </div>
    <div className=" min-h-screen bg-gray-50 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <Home />
    </div>
    </>
  );
}

export default App;