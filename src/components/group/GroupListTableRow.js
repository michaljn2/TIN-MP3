import React from "react";
import {Link} from "react-router-dom";
import {deleteGroupApiCall} from "../../apiCalls/groupApiCalls";
import {isAuthenticated} from "../../helpers/authHelper";

function GroupListTableRow(props) {
    const group = props.groupData;
    return (
        <tr>
            <td>{group.shortcut}</td>
            <td>{group.course}</td>
            <td>{group.capacity}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/groups/details/${group._id}`} className="list-actions-button-details">
                        <img src={process.env.PUBLIC_URL + '/img/INFO.png'} alt="Details" className="action-icon"/>
                    </Link></li>
                    {isAuthenticated() &&
                    <li><Link to={`/groups/edit/${group._id}`} className="list-actions-button-edit">
                        <img src={process.env.PUBLIC_URL + '/img/EDIT.png'} alt="Edit" className="action-icon"/>
                    </Link></li>
                    }
                    {/*<li><Link to={`/groups/delete/${group._id}`} className="list-actions-button-delete" >*/}
                    {/*    <img src={process.env.PUBLIC_URL + '/img/DELETE.png'} alt="Delete" className="action-icon"/>*/}
                    {/*</Link></li>*/}
                    {isAuthenticated() &&
                    <li>
                        <button className="list-actions-button-delete" onClick={() => {
                            deleteGroupApiCall(group._id).then((res) => window.location.reload(false))
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
export default GroupListTableRow