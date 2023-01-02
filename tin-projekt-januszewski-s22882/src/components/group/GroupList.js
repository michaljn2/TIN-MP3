import React from "react";
import {Link} from "react-router-dom";
import {getGroupsApiCall} from "../../apiCalls/groupApiCalls";

function GroupList() {
    const groupList = getGroupsApiCall();
    return (
        <main>
            <h2>Lista grup</h2>
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
                {groupList.map(group => (
                    <tr key={group._id}>
                        <td>{group.shortcut}</td>
                        <td>{group.course}</td>
                        <td>{group.capacity}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/groups/details/${group._id}`} className="list-actions-button-details">
                                    <img src="/public/img/INFO.png" alt="Details" className="action-icon"/>
                                </Link></li>
                                <li><Link to={`/groups/edit/${group._id}`} className="list-actions-button-edit">
                                    <img src="/public/img/EDIT.png" alt="Edit" className="action-icon"/>
                                </Link></li>
                                <li><Link to={`/groups/delete/${group._id}`} className="list-actions-button-delete">
                                    <img src="/public/img/DELETE.png" alt="Delete" className="action-icon"/>
                                </Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><Link to="/groups/add" className="button-add">Dodaj nową grupę</Link></p>
        </main>
    )
}
export default GroupList