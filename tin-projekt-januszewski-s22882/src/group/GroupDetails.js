import React from "react";
import {Link, useParams} from "react-router-dom";
import {getGroupByIdApiCall} from "../apiCalls/groupApiCalls";

function GroupDetails() {
    let { groupId } = useParams()
    groupId = parseInt(groupId)
    const group = getGroupByIdApiCall(groupId);

    return (
        <main>
            <h2>Szczegóły grupy</h2>
            <p>Skrót: {group.shortcut}</p>
            <p>Przedmiot: {group.course} </p>
            <p>Specjalizacja: {group.faculty ? group.faculty : ""} </p>
            <p>Liczba miejsc: {group.capacity} </p>
            <h2>Szczegóły studentów grupy</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Indeks</th>
                    <th>Ocena</th>
                    <th>ITN</th>
                </tr>
                </thead>
                <tbody>
                {group.studies.map(
                    study =>
                        <tr key={study._id}>
                            <td>{study.student.firstName}</td>
                            <td>{study.student.lastName}</td>
                            <td>{study.student.index}</td>
                            <td>{study.grade}</td>
                            <td>{(study.itn === 1) ? 'tak' : 'nie'}</td>
                        </tr>
                )}
                </tbody>
            </table>
            <div className="form-buttons">
                <Link to="/groups" className="form-buttons-back">Powrót</Link>
            </div>
        </main>
    )
}
export default GroupDetails