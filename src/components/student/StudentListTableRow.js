import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {deleteStudentApiCall} from "../../apiCalls/studentApiCalls";
import {isAuthenticated} from "../../helpers/authHelper";

function StudentListTableRow(props) {
    const stud = props.studData;
    const {t} = useTranslation();
    return (
        <tr>
            <td>{stud.firstName}</td>
            <td>{stud.lastName}</td>
            <td>{stud.index}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/students/details/${stud._id}`} className="list-actions-button-details">
                        <img src={process.env.PUBLIC_URL + '/img/INFO.png'} alt="Details" className="action-icon"/>
                    </Link></li>
                    {isAuthenticated() &&
                    <li><Link to={`/students/edit/${stud._id}`} className="list-actions-button-edit">
                        <img src={process.env.PUBLIC_URL + '/img/EDIT.png'} alt="Edit" className="action-icon"/>
                    </Link></li>
                    }
                    {/*<li><Link to={`/students/delete/${stud._id}`} className="list-actions-button-delete">*/}
                    {/*    <img src={process.env.PUBLIC_URL + '/img/DELETE.png'} alt="Delete" className="action-icon"/>*/}
                    {/*</Link></li>*/}
                    {isAuthenticated() &&
                    <li>
                        <button className="list-actions-button-delete" onClick={() => {
                            deleteStudentApiCall(stud._id).then((res) => window.location.reload(false))
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
export default StudentListTableRow