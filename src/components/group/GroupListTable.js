import React from "react";
import GroupListTableRow from './GroupListTableRow';
import {useTranslation} from "react-i18next";

function GroupListTable(props) {
    const groups = props.groupList;
    const {t} = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('group.fields.shortcut')}</th>
                <th>{t('group.fields.course')}</th>
                <th>{t('group.fields.capacity')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {groups.map(group =>
                <GroupListTableRow groupData={group} key={group._id}/>
            )}
            </tbody>
        </table>
    )
}
export default GroupListTable