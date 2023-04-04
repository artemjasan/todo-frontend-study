import React from 'react';
import './index.css';
import Footer from './components/generals/Footer';
import Header from './components/generals/Header';
import Main from './components/generals/Main';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
