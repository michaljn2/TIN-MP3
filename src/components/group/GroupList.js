import React from "react";
import {Link} from "react-router-dom";
import {getGroupsApiCall} from "../../apiCalls/groupApiCalls";
import GroupListTable from "./GroupListTable";

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state = {
            error: null,
            isLoaded: false,
            groups: [],
            notice: notice
        }
    }

    fetchGroupList = () => {
        getGroupsApiCall()
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        groups: data
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
        this.fetchGroupList();
    }

    render() {
        const {error, isLoaded, groups} = this.state;
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ladowanie danych grup...</p>
        } else {
            content = <GroupListTable groupList={groups}/>
        }
        return (
            <main>
                <h2>Lista grup</h2>
                {content}
                <p className="form-buttons">
                    <Link to="/groups/add" className="button-add">Dodaj nową grupę</Link>
                </p>
            </main>
        )
    }

}
export default GroupList