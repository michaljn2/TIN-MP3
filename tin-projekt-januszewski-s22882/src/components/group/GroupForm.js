import React from "react";
import {Link} from "react-router-dom";

class GroupForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Nowa grupa</h2>
                <form className="form">
                    <label htmlFor="shortcut">Skrót:<span className="symbol-required">*</span></label>
                    <input type="text" name="shortcut" id="shortcut" placeholder="np. 2022Z-TIN-12c" value=""/>
                    <span id="errorShortcut" className="errors-text"></span>

                    <label htmlFor="course">Przedmiot:<span className="symbol-required">*</span></label>
                    <input type="text" name="course" id="course" placeholder="np. TIN" value=""/>
                    <span id="errorCourse" className="errors-text"></span>

                    <label htmlFor="faculty">Specjalizacja:</label>
                    <input type="text" name="faculty" id="faculty" value=""/>
                    <span id="errorFaculty" className="errors-text"></span>

                    <label htmlFor="capacity">Liczba miejsc:<span className="symbol-required">*</span></label>
                    <input type="number" name="capacity" id="capacity" placeholder="Liczba całkowita od 1 do 150" value=""/>
                    <span id="errorCapacity" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-buttons-submit" type="submit" value="Dodaj"/>
                        <Link to="/groups" className="form-buttons-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default GroupForm