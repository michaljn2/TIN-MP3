import React from "react";
import {Link} from "react-router-dom";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";

function StudentList() {
    const studentList = getStudentsApiCall();
    return (
        <main>
            <h2>Lista studentów</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Indeks</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {studentList.map(stud => (
                    <tr key={stud._id}>
                        <td>{stud.firstName}</td>
                        <td>{stud.lastName}</td>
                        <td>{stud.index}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`students/details/${stud._id}`} className="list-actions-button-details">
                                    <img src="/public/img/INFO.png" alt="Details" className="action-icon"/>
                                </Link></li>
                                <li><Link to={`students/edit/${stud._id}`} className="list-actions-button-edit">
                                    <img src="/public/img/EDIT.png" alt="Edit" className="action-icon"/>
                                </Link></li>
                                <li><Link to={`students/delete/${stud._id}`} className="list-actions-button-delete">
                                    <img src="/public/img/DELETE.png" alt="Delete" className="action-icon"/>
                                </Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p><Link to="/students/add" className="button-add">Dodaj nowego studenta</Link></p>
        </main>
    )
}
export default StudentList