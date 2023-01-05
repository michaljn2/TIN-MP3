import React from "react";
import StudentListTableRow from './StudentListTableRow';

function StudentListTable(props) {
    const students = props.studList;
    return (
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
            {students.map(stud =>
                <StudentListTableRow studData={stud} key={stud._id}/>
            )}
            </tbody>
        </table>
    )
}
export default StudentListTable