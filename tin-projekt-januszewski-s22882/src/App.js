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
import GroupList from "./components/group/GroupList";
import GroupDetails from "./components/group/GroupDetails";
import GroupForm from "./components/group/GroupForm";
import StudyList from "./components/study/StudyList";
import StudyDetails from "./components/study/StudyDetails";
import StudyForm from "./components/study/StudyForm";


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
                  <Route exact path="/studies" element={<StudyList/>} />
                  <Route exact path="/studies/details/:studyId" element={<StudyDetails/>} />
                  <Route exact path="/studies/add" element={<StudyForm/>} />
                  <Route exact path="/studies/edit/:studyId" element={<StudyForm/>} />
              </Routes>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;
