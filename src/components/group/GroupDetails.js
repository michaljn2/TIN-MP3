import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getGroupByIdApiCall} from "../../apiCalls/groupApiCalls";
import GroupDetailsData from "./GroupDetailsData";
import {useTranslation} from "react-i18next";

function GroupDetails(){
    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);

    let {groupId} = useParams();
    groupId = parseInt(groupId);

    function fetchGroupDetails(){
        getGroupByIdApiCall(groupId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message) {
                        setGroup(null);
                        setMessage(data.message);
                    } else {
                        setGroup(data);
                        setMessage(null);
                    }
                    setIsLoaded(true);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchGroupDetails()
    }, []);


    let content;
    const { t } = useTranslation();

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
export default GroupDetails