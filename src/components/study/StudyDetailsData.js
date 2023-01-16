import React from "react";
import {useTranslation} from "react-i18next";

function StudyDetailsData(props) {
    const study = props.studyData;
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <p><b>{t('study.fields.student')}:</b> {study.student.firstName + " " + study.student.lastName + " " + study.student.index} </p>
            <p><b>{t('study.fields.group')}:</b> {study.group.shortcut} </p>
            <p><b>{t('study.fields.itn')}:</b> {(study.itn === true) ? t('common.yes') : t('common.no')} </p>
            <p><b>{t('study.fields.grade')}:</b> {study.grade ? study.grade : t('common.lack')} </p>
        </React.Fragment>
    )
}

export default StudyDetailsData