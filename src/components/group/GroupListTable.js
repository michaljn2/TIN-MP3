import React from "react";
import GroupListTableRow from './GroupListTableRow';

function GroupListTable(props) {
    const groups = props.groupList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>Skrót</th>
                <th>Przedmiot</th>
                <th>Liczba miejsc</th>
                <th>Akcje</th>
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