import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/fragments/MainContent";
import Footer from "./components/fragments/Footer";
import StudentList from "./components/student/StudentList";
import StudentDetails from "./components/student/StudentDetails";

function App() {
  return (
      <Router>
          <div>
              <Header/>
              <Navigation/>
              <Routes>
                  <Route path="/" element={<MainContent/>} />
                  <Route path="/students" element={<StudentList/>} />
                  <Route exact path="/students/details/:studId" element={<StudentDetails/>} />
              </Routes>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;
