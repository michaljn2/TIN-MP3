import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";

function FormButtons(props) {
    const submitButtonLabel = props.formMode === formMode.NEW ? 'Dodaj' : 'Edytuj';
    return(
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-buttons-submit" type="submit" value={submitButtonLabel}/>
            <Link to={props.cancelPath} className="form-buttons-cancel">Anuluj</Link>
        </div>
    )
}

export default FormButtons