import React from "react";
import {Link} from "react-router-dom";
import {getStudiesApiCall} from "../../apiCalls/studyApiCalls";
import StudyListTable from "./StudyListTable";

class StudyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            studies: []
        }
    }

    fetchStudyList = () => {
        getStudiesApiCall()
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        studies: data
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
        this.fetchStudyList()
    }

    render() {
        const {error, isLoaded, studies} = this.state;
        let content;

        if (error){
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded){
            content = <p>Ladowanie danych przynależności</p>
        } else {
            content = <StudyListTable studiesList={studies} />
        }

        return(
            <main>
                <h2>Lista przynależności</h2>
                {content}
                <p className="form-buttons">
                    <Link to="/studies/add" className="button-add">Dodaj nową przynależność</Link>
                </p>
            </main>
        )
    }

}

export default StudyList