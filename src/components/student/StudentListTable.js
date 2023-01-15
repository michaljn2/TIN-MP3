import React from "react";
import StudentListTableRow from './StudentListTableRow';
import {useTranslation} from "react-i18next";
function StudentListTable(props) {
    const students = props.studList;
    const {t} = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('stud.fields.firstName')}</th>
                <th>{t('stud.fields.lastName')}</th>
                <th>{t('stud.fields.index')}</th>
                <th>{t('list.actions.title')}</th>
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