import React from 'react';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
