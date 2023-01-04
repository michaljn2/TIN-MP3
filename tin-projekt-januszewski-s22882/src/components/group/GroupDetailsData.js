import React from "react";

function GroupDetailsData(props) {
    const group = props.groupData;
    return (
        <React.Fragment>
            <p>Skrót: {group.shortcut} </p>
            <p>Przedmiot: {group.course} </p>
            <p>Specjalizacja: {group.faculty ? group.faculty : "nie dotyczy"} </p>
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
                            <td>{(study.grade) ? study.grade : "brak"}</td>
                            <td>{(study.itn === 1) ? "tak" : "nie"}</td>
                        </tr>

                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default GroupDetailsData