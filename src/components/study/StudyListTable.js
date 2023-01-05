import React from "react";
import StudyListTableRow from "./StudyListTableRow";

function StudyListTable (props){
    const studies = props.studiesList;
    return(
        <table className="table-list">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Grupa</th>
                    <th>Ocena</th>
                    <th>Akcje</th>
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