import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
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
import LoginForm from "./components/other/LoginForm";
import {getCurrentUser} from "./helpers/authHelper";
import ProtectedRoute from "./components/other/ProtectedRoute";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ''
        }
    };

    handleLogin = (user) => {
        localStorage.setItem("user", user);
        this.setState({
            user: user
        });
    }

    handleLogout = () => {
        localStorage.removeItem("user");
        this.setState({
            user: undefined
        })
    }

    componentDidMount() {
        const currentUser = getCurrentUser();
        this.setState({
            user: currentUser
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Navigation handleLogout={this.handleLogout}/>
                    <Switch>
                        // cos nie dziala z tymi ProtectedRoute
                        <Route exact path="/" component={MainContent}/>
                        <Route exact path="/students" component={StudentList}/>
                        <Route exact path="/students/details/:studId" component={StudentDetails}/>
                        <Route exact path="/students/add" component={StudentForm}/>
                        <Route exact path="/students/edit/:studId" component={StudentForm}/>
                        <Route exact path="/groups" component={GroupList}/>
                        <Route exact path="/groups/details/:groupId" component={GroupDetails}/>
                        <Route exact path="/groups/add" component={GroupForm}/>
                        <Route exact path="/groups/edit/:groupId" component={GroupForm}/>
                        <Route exact path="/studies" component={StudyList}/>
                        <Route exact path="/studies/details/:studyId" component={StudyDetails}/>
                        <Route exact path="/studies/add" component={StudyForm}/>
                        <Route exact path="/studies/edit/:studyId" component={StudyForm}/>
                        <Route exact path="/login" render={(props) => (
                            <LoginForm handleLogin={this.handleLogin} />
                        )}
                        />
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;
