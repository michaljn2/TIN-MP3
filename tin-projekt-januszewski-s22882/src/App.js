import React from 'react';
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/fragments/MainContent";
import Footer from "./components/fragments/Footer";

function App() {
  return (
      <div>
          <Header/>
          <Navigation/>
          <MainContent/>
          <Footer/>
      </div>
  );
}

export default App;
