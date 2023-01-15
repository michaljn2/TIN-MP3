import React from "react";
import {useTranslation} from "react-i18next";

function Header(){
    const { t } = useTranslation();
    return(
        <header>
            <h1>{t('header.title')}</h1>
            <img src={process.env.PUBLIC_URL + '/img/pjatk-logo.jpg'} alt="PJATK Logo"/>
        </header>
    )
}

export default Header