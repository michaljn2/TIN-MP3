import React from "react";
import {Link} from "react-router-dom";
import {getStudiesApiCall} from "../../apiCalls/studyApiCalls";

function StudyList() {
    const studyList = getStudiesApiCall();
    return (
        <main>
            <h2>Lista przynależności</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Student</th>
                    <th>Grupa</th>
                    <th>Ocena</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {studyList.map(study => (
                    <tr key={study._id}>
                        <td>{study.student.firstName + " " + study.student.lastName + " " + study.student.index}</td>
                        <td>{study.group.shortcut}</td>
                        <td>{study.grade ? study.grade : "brak"}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/studies/details/${study._id}`} className="list-actions-button-details">
                                    <img src="/public/img/INFO.png" alt="Details" className="action-icon"/>
                                </Link></li>
                                <li><Link to={`/studies/edit/${study._id}`} className="list-actions-button-edit">
                                    <img src="/public/img/EDIT.png" alt="Edit" className="action-icon"/>
                                </Link></li>
                                <li><Link to={`/studies/delete/${study._id}`} className="list-actions-button-delete">
                                    <img src="/public/img/DELETE.png" alt="Delete" className="action-icon"/>
                                </Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><Link to="/studies/add" className="button-add">Dodaj nową przynależność</Link></p>
        </main>
    )
}
export default StudyList