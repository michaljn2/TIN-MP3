import React from "react";
import {Link} from "react-router-dom";

function StudentListTableRow(props) {
    const stud = props.studData;
    return (
        <tr>
            <td>{stud.firstName}</td>
            <td>{stud.lastName}</td>
            <td>{stud.index}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/students/details/${stud._id}`} className="list-actions-button-details">
                        <img src="/public/img/INFO.png" alt="Details" className="action-icon"/>
                    </Link></li>
                    <li><Link to={`/students/edit/${stud._id}`} className="list-actions-button-edit">
                        <img src="/public/img/EDIT.png" alt="Edit" className="action-icon"/>
                    </Link></li>
                    <li><Link to={`/students/delete/${stud._id}`} className="list-actions-button-delete">
                        <img src="/public/img/DELETE.png" alt="Delete" className="action-icon"/>
                    </Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default StudentListTableRow