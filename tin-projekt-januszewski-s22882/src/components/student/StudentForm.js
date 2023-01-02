import React from "react";
import {Link} from "react-router-dom";

class StudentForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Nowy student</h2>
                <form className="form">
                    <label htmlFor="firstName">Imię:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="firstName" id="firstName" placeholder="2-60 znaków" value=""/>
                    <span id="errorFirstName" className="errors-text"></span>

                    <label htmlFor="lastName">Imię:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="lastName" id="lastName" placeholder="2-60 znaków" value=""/>
                    <span id="errorLastName" className="errors-text"></span>

                    <label htmlFor="index">Indeks:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="index" id="index" placeholder="np. s2222" value=""/>
                    <span id="errorIndex" className="errors-text"></span>

                    <label htmlFor="birthDate">Data urodzenia:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" name="birthDate" id="birthDate" value=""/>
                    <span id="errorBirthDate" className="errors-text"></span>

                    <label htmlFor="email">E-mail:<abbr title="required" aria-label="required">*</abbr></label>
                    <input type="text" name="email" id="email" placeholder="np. s222@pja.edu.pl" value=""/>
                    <span id="errorEmail" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-buttons-submit" type="submit" value="Dodaj"/>
                        <Link to="/students" className="form-buttons-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default StudentForm