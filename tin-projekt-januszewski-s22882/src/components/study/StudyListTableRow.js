import React from "react";
import {Link} from "react-router-dom";

function StudyListTableRow (props) {
    const study = props.studyData;
    return (
        <tr>
            <td>{study.student.firstName + " " + study.student.lastName + " " + study.student.index}</td>
            <td>{study.group.shortcut}</td>
            <td>{study.grade ? study.grade : "brak"}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`studies/details/${study._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`studies/edit/${study._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`studies/delete/${study._id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}
export default StudyListTableRow