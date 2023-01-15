import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Navigation() {
    const { t } = useTranslation();
    return(
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/students">{t('nav.students')}</Link></li>
                <li><Link to="/groups">{t('nav.groups')}</Link></li>
                <li><Link to="/studies">{t('nav.studies')}</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation