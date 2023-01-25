import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormButtons(props) {
    const { t } = useTranslation();
    let submitButtonLabel;
    if (props.formMode) {
        submitButtonLabel = props.formMode === formMode.NEW ? t('form.actions.add') : t('form.actions.edit');
    } else {
        submitButtonLabel = props.submitButtonLabel;
    }
    return(
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-buttons-submit" type="submit" value={submitButtonLabel}/>
            <Link to={props.cancelPath} className="form-buttons-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons