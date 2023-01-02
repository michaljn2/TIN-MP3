import React from "react";
import {Link} from "react-router-dom";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import {getGroupsApiCall} from "../../apiCalls/groupApiCalls";

class StudyForm extends React.Component {
    render() {
        const allStuds = getStudentsApiCall();
        const allGroups = getGroupsApiCall();
        return (
            <main>
                <h2>Nowa przynależność</h2>
                <form className="form">
                    <label htmlFor="student">Student:<abbr title="required" aria-label="required">*</abbr></label>
                    <select id="student" name="studId" required>
                        <option value="">--- Wybierz studenta ---</option>
                        {allStuds.map(stud =>
                            (<option key={stud._id} value={stud._id} label={stud.firstName + " " + stud.lastName + " " + stud.index}></option>)
                        )}
                    </select>
                    <span id="errorStudent" className="errors-text"></span>

                    <label htmlFor="group">Grupa:<abbr title="required" aria-label="required">*</abbr></label>
                    <select id="group" name="groupId" required>
                        <option value="">--- Wybierz grupę ---</option>
                        {allGroups.map(group =>
                            (<option key={group._id} value={group._id} label={group.shortcut}></option>)
                        )}
                    </select>
                    <span id="errorGroup" className="errors-text"></span>

                    <label htmlFor="itn">ITN:</label>
                    <input type="checkbox" name="itn" id="itn" value="1"/>
                    <span id="errorITN" className="errors-text"></span>

                    <label htmlFor="grade">Ocena:</label>
                    <select name="birthDate" id="birthDate" value="">
                        <option value="" selected>-- Wybierz ocenę --</option>
                        <option value="2.0">2</option>
                        <option value="3.0">3</option>
                        <option value="3.5">3.5</option>
                        <option value="4.0">4</option>
                        <option value="4.5">4.5</option>
                        <option value="5.0">5</option>
                    </select>
                    <span id="errorGrade" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-buttons-submit" type="submit" value="Dodaj"/>
                        <Link to="/studies" className="form-buttons-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default StudyForm