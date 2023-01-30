import React from "react";
import {Link} from "react-router-dom";
import {useTranslation, withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";


function Navigation (props){
   const {t, i18n} = useTranslation();

    function handleLanguageChange(language){
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }

    const loginLogoutLink = isAuthenticated() ? <button onClick={props.handleLogout}>{t('form.actions.logout')}</button> :
        <Link to="/login">{t('form.actions.login')}</Link>
    return(
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/students">{t('nav.students')}</Link></li>
                <li><Link to="/groups">{t('nav.groups')}</Link></li>
                <li><Link to="/studies">{t('nav.studies')}</Link></li>
                <li className='lang'>{loginLogoutLink}</li>
                <li className='lang' ><button onClick={() => {handleLanguageChange('pl') }}>PL</button> </li>
                <li className='lang' ><button onClick={() => {handleLanguageChange('en') }}>EN</button> </li>
            </ul>
        </nav>
    )
}

export default withTranslation() (Navigation)