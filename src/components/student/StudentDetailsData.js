import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function StudentDetailsData(props) {
    const stud = props.studData;
    const studiesLength = stud.studies.length;
    let studiesTable;
    let tableHeader;
    const {t} = useTranslation();
    if (studiesLength > 0){
        studiesTable =
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('group.fields.shortcut')}</th>
                <th>{t('group.fields.course')}</th>
                <th>{t('study.fields.grade')}</th>
                <th>{t('study.fields.itn')}</th>
            </tr>
            </thead>
            <tbody>
            {stud.studies.map(
                study =>
                    <tr key={study._id}>
                        <td><Link to={`/groups/details/${study.group_id}`}>{study.group.shortcut}</Link></td>
                        <td>{study.group.course}</td>
                        <td>{study.grade ? study.grade : t('common.lack')}</td>
                        <td>{(study.itn === 1) ? t('common.yes') : t('common.no')}</td>
                    </tr>

            )}
            </tbody>
        </table>;
        tableHeader = <h2>{t('stud.form.details.tableHeader')}</h2>;
    }
    return (
        <React.Fragment>
            <p><b>{t('stud.fields.firstName')}:</b> {stud.firstName} </p>
            <p><b>{t('stud.fields.lastName')}:</b> {stud.lastName} </p>
            <p><b>{t('stud.fields.index')}:</b> {stud.index} </p>
            <p><b>{t('stud.fields.birthDate')}:</b> {getFormattedDate(stud.birthDate)} </p>
            <p><b>{t('stud.fields.email')}:</b> {stud.email} </p>
            {tableHeader}
            {studiesTable}
        </React.Fragment>
    )
}

export default StudentDetailsData