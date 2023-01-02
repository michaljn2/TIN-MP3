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
import StudentForm from "./components/student/StudentForm";
import GroupList from "./group/GroupList";
import GroupDetails from "./group/GroupDetails";
import GroupForm from "./group/GroupForm";

function App() {
  return (
      <Router>
          <div>
              <Header/>
              <Navigation/>
              <Routes>
                  <Route exact path="/" element={<MainContent/>} />
                  <Route exact path="/students" element={<StudentList/>} />
                  <Route exact path="/students/details/:studId" element={<StudentDetails/>} />
                  <Route exact path="/students/add" element={<StudentForm/>} />
                  <Route exact path="/students/edit/:studId" element={<StudentForm/>} />
                  <Route exact path="/groups" element={<GroupList/>} />
                  <Route exact path="/groups/details/:groupId" element={<GroupDetails/>} />
                  <Route exact path="/groups/add" element={<GroupForm/>} />
                  <Route exact path="/groups/edit/:groupId" element={<GroupForm/>} />
              </Routes>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;
