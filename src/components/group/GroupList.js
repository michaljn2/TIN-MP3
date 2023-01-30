import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getGroupsApiCall} from "../../apiCalls/groupApiCalls";
import GroupListTable from "./GroupListTable";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function GroupList(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState([]);

    function fetchGroupList(){
        getGroupsApiCall()
            .then(res => res.json())
            .then(
                data => {
                    setIsLoaded(true);
                    setGroups(data);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchGroupList()
    }, []);

    const {t} = useTranslation();
    let content;
    if (error) {
        content = <p>{t('common.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('group.list.loading')}...</p>
    } else {
        content = <GroupListTable groupList={groups}/>
    }

    return (
        <main>
            <h2>{t('group.list.pageTitle')}</h2>
            {content}
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/groups/add" className="button-add">{t('group.form.add.btnLabel')}</Link>
            </p>
            }
        </main>
    )

}
export default GroupList