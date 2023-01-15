import React from "react";
import {Link} from "react-router-dom";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import StudentListTable from "./StudentListTable";
import {withTranslation} from "react-i18next";

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
        const {t} = this.props;
        const {error, isLoaded, students} = this.state;
        let content;
        if (error) {
            content = <p>{t('common.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('stud.list.loading')}...</p>
        } else {
            content = <StudentListTable studList={students}/>
        }
        return (
            <main>
                <h2>{t('stud.list.pageTitle')}</h2>
                {content}
                <p className="form-buttons">
                    <Link to="/students/add" className="button-add">{t('stud.list.addNew')}</Link>
                </p>
            </main>
        )

    }
}

export default withTranslation() (StudentList)