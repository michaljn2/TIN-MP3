import React from "react";
import {Link} from "react-router-dom";

function GroupListTableRow(props) {
    const group = props.groupData;
    return (
        <tr>
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
    )
}
export default GroupListTableRow