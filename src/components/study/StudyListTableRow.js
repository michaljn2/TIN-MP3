import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {deleteStudyApiCall} from "../../apiCalls/studyApiCalls";
import {isAuthenticated} from "../../helpers/authHelper";

function StudyListTableRow (props) {
    const study = props.studyData;
    const {t} = useTranslation();
    return (
        <tr>
            <td>{study.student.firstName + " " + study.student.lastName + " " + study.student.index}</td>
            <td>{study.group.shortcut}</td>
            <td>{study.grade ? study.grade : t('common.lack')}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/studies/details/${study._id}`} className="list-actions-button-details">
                        <img src={process.env.PUBLIC_URL + '/img/INFO.png'} alt="Details" className="action-icon"/>
                    </Link></li>
                    {isAuthenticated() &&
                    <li><Link to={`/studies/edit/${study._id}`} className="list-actions-button-edit">
                        <img src={process.env.PUBLIC_URL + '/img/EDIT.png'} alt="Edit" className="action-icon"/>
                    </Link></li>
                    }
                    {/*<li><Link to={`/studies/delete/${study._id}`} className="list-actions-button-delete">*/}
                    {/*    <img src={process.env.PUBLIC_URL + '/img/DELETE.png'} alt="Delete" className="action-icon"/>*/}
                    {/*</Link></li>*/}
                    {isAuthenticated() &&
                    <li>
                        <button className="list-actions-button-delete" onClick={() => {
                            deleteStudyApiCall(study._id).then((res) => window.location.reload(false))
                        }}>
                            <img src={process.env.PUBLIC_URL + '/img/DELETE.png'} alt="Delete" className="action-icon"/>
                        </button>
                    </li>
                    }
                </ul>
            </td>
        </tr>
    )
}
export default StudyListTableRow