import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
function GroupDetailsData(props) {
    const group = props.groupData;
    let studiesTable;
    let tableHeader;
    const studiesLength = group.studies.length;
    const { t } = useTranslation();
    if (studiesLength > 0){
        studiesTable = <table className="table-list">
            <thead>
            <tr>
                <th>{t('stud.fields.firstName')}</th>
                <th>{t('stud.fields.lastName')}</th>
                <th>{t('stud.fields.index')}</th>
                <th>{t('study.fields.grade')}</th>
                <th>{t('study.fields.itn')}</th>
            </tr>
            </thead>
            <tbody>
            {group.studies.map(
                study =>
                    <tr key={study._id}>
                        <td>{study.student.firstName}</td>
                        <td>{study.student.lastName}</td>
                        <td><Link to={`/students/details/${study.student_id}`}>{study.student.index}</Link></td>
                        <td>{(study.grade) ? study.grade : t('common.lack')}</td>
                        <td>{(study.itn === 1) ? t('common.yes') : t('common.no')}</td>
                    </tr>
            )}
            </tbody>
        </table>;
        tableHeader = <h2>{t('group.form.details.tableHeader')}</h2>;
    }
    return (
        <React.Fragment>
            <p>{t('group.fields.shortcut')}: {group.shortcut} </p>
            <p>{t('group.fields.course')}: {group.course} </p>
            <p>{t('group.fields.faculty')}: {group.faculty ? group.faculty : t('common.lack')} </p>
            <p>{t('group.fields.capacity')}: {group.capacity} </p>
            {tableHeader}
            {studiesTable}
        </React.Fragment>
    )
}

export default GroupDetailsData