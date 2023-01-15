import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";

function StudentDetailsData(props) {
    const stud = props.studData;
    const studiesLength = stud.studies.length;
    let studiesTable;
    let tableHeader;
    if (studiesLength > 0){
        studiesTable =
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
                        <td><Link to={`/groups/details/${study.group_id}`}>{study.group.shortcut}</Link></td>
                        <td>{study.group.course}</td>
                        <td>{study.grade ? study.grade : "brak"}</td>
                        <td>{(study.itn === 1) ? "tak" : "nie"}</td>
                    </tr>

            )}
            </tbody>
        </table>;
        tableHeader = <h2>Szczegóły grup studenta</h2>;
    }
    return (
        <React.Fragment>
            <p>Imię: {stud.firstName} </p>
            <p>Nazwisko: {stud.lastName} </p>
            <p>Indeks: {stud.index} </p>
            <p>Data urodzenia: {getFormattedDate(stud.birthDate)} </p>
            <p>E-mail: {stud.email} </p>
            {tableHeader}
            {studiesTable}
        </React.Fragment>
    )
}

export default StudentDetailsData