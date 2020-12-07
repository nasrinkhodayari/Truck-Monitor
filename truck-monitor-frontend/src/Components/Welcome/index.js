import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import './style.scss';
import I18nInstance from '../../Utils/i18n';

const Welcome = props => {
    const { showWelcomeHelp,setShowWelcomeHelp } = props;
    const [languageEnglish, setLanguageEnglish] = useState(I18nInstance.language === "en" ? true : false);
    return (
        showWelcomeHelp && <div className="welcome-container">
            <Alert variant="success" className="welcome">
                <Alert.Heading>Hi, nice to see you</Alert.Heading>
                <p>This is a sample for <strong>MAN Truck Monitor</strong>,there is a truck
                in my database for presenting system functionality to you,
                firstly you need to enter the truck license plate ,
                so please use this license plate number :<strong> FN67KE</strong> ,
                if you enter wrong licesne plate number,system will warn you.
                Also this application support two language (pt/en) it set base on your browser language ,
                 but you can change it using this switch button.
                 </p>
                Change Language: <BootstrapSwitchButton
                        checked={languageEnglish}
                        onlabel='en'
                        offlabel='pt'
                        size="xs"
                        onChange={checked => {
                            setLanguageEnglish(checked);
                            I18nInstance.changeLanguage(checked ? "en" : "pt");
                            localStorage.setItem('lang', I18nInstance.language);
                        }}
                    />
                <hr />
                <p><strong>Thank you in advance for your attention :)</strong></p>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowWelcomeHelp(false)} variant="outline-success">Got it</Button>
                </div>
            </Alert>
        </div>
    );
}
export default Welcome;