import React from "react";
import {Link} from "react-router-dom";
import {getStudyByIdApiCall} from "../../apiCalls/studyApiCalls";
import StudyDetailsData from "./StudyDetailsData";

class StudyDetails extends React.Component {
    constructor(props) {
        super(props);
        let {studyId} = props.match.params;
        this.state = {
            studyId: studyId,
            study: null,
            error: null,
            isLoaded: false
        }
    }

    fetchStudyDetails = () => {
        getStudyByIdApiCall(this.state.studyId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message){
                        this.setState({
                            study: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            study: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount() {
        this.fetchStudyDetails()
    }

    render() {
        const {study, error, isLoaded, message} = this.state;
        let content;

        if(error){
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded){
            content = <p>Pobieranie danych przynależności...</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <StudyDetailsData studyData={study} />
        }

        return(
            <main>
                <h2>Szczegóły przynależności</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/studies" className="form-buttons-back">Powrót</Link>
                </div>
            </main>
        )
    }

}
export default StudyDetails