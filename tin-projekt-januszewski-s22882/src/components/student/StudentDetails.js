import React from "react";
import {Link, useParams} from "react-router-dom";
import {getStudentByIdApiCall} from "../../apiCalls/studentApiCalls";
import {getFormattedDate} from "../../helpers/dateHelper"

function EmployeeDetails() {
    let { studId } = useParams()
    studId = parseInt(studId)
    const stud = getStudentByIdApiCall(studId)

    return (
        <main>
            <h2>Szczegóły studenta</h2>
            <p>Imię: {stud.firstName}</p>
            <p>Nazwisko: {stud.lastName} </p>
            <p>Indeks: {stud.index} </p>
            <p>Data urodzenia: {getFormattedDate(stud.birthDate)} </p>
            <p>E-mail: {stud.email} </p>
            <h2>Szczegóły przynależności</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Skrót grupy</th>
                    <th>Przedmiot</th>
                    <th>Ocena</th>
                    <th>ITN</th>
                </tr>
                </thead>
                <tbody>
                {stud.studies.map(
                    study =>
                        <tr key={study._id}>
                            <td>{study.group.shortcut}</td>
                            <td>{study.group.course}</td>
                            <td>{study.grade ? study.grade : ""}</td>
                            <td>{(study.itn == 1) ? 'tak' : 'nie'}</td>
                        </tr>
                )}
                </tbody>
            </table>
            <div className="form-buttons">
                <Link to="/students" className="form-buttons-back">Powrót</Link>
            </div>
        </main>
    )
}
export default EmployeeDetails