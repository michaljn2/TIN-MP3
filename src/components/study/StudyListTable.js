import React from "react";
import StudyListTableRow from "./StudyListTableRow";
import {useTranslation} from "react-i18next";

function StudyListTable (props){
    const studies = props.studiesList;
    const {t} = useTranslation();
    return(
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('study.fields.student')}</th>
                    <th>{t('study.fields.group')}</th>
                    <th>{t('study.fields.grade')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
            {studies.map(study =>
                <StudyListTableRow studyData={study} key={study._id} />
            )}
            </tbody>
        </table>
    )
}

export default StudyListTable