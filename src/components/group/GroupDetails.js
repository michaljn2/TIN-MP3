import React from "react";
import {Link} from "react-router-dom";
import {getGroupByIdApiCall} from "../../apiCalls/groupApiCalls";
import GroupDetailsData from "./GroupDetailsData";
import {withTranslation} from "react-i18next";

class GroupDetails extends React.Component {
    constructor(props) {
        super(props);
        let {groupId} = this.props.match.params;
        this.state = {
            groupId: groupId,
            group: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchGroupDetails = () => {
        getGroupByIdApiCall(this.state.groupId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message) {
                        this.setState({
                            group: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            group: data,
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
        this.fetchGroupDetails()
    }

    render() {
        const {group, error, isLoaded, message} = this.state;
        let content;
        const { t } = this.props;

        if(error) {
            content = <p>{t('common.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('group.form.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <GroupDetailsData groupData = {group}/>
        }

        return (
            <main>
                <h2>{t('group.form.details.pageTitle')}</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/groups" className="form-buttons-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}
export default withTranslation()(GroupDetails)