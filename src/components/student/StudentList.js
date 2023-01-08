import React from "react";
import {Link} from "react-router-dom";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import StudentListTable from "./StudentListTable";

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            students: []
        }
    }

    fetchStudentList = () => {
        getStudentsApiCall()
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        students: data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchStudentList()
    }

    render() {
        const {error, isLoaded, students} = this.state;
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych studentów...</p>
        } else {
            content = <StudentListTable studList={students}/>
        }
        return (
            <main>
                <h2>Lista studentów</h2>
                {content}
                <p className="form-buttons">
                    <Link to="/students/add" className="button-add">Dodaj nowego studenta</Link>
                </p>
            </main>
        )

    }
}

export default StudentList