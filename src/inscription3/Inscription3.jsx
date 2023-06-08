import React, { useState } from 'react'
import g8 from './g8.svg'
import happyemoji from './happyemoji.svg'
import Group18 from './Group18.svg' 
import Group13 from './Group13.svg'
import './Inscription3.css'
import search from './search.svg'
import Vector from './Vector.svg'
import Loupeinscription from './Loupeinscription.svg'
import available from './available.svg'
import notavailable from './notavailable.svg'
import Cadi from './Cadi.svg'



function Inscription2() {
    const [text, setText] = useState('');
    const [showIcon, setShowIcon] = useState(true);


    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setShowIcon(inputValue.length === 0);
      };


    const handleChange = (event) => {
        setText(event.target.value);
      };

      const handleClear = () => {
        setText('');
      };

      const handleInputChange2 = (event) => {
        event.persist(); // Persiste l'événement synthétique

        handleInputChange(event); // Appelle le premier gestionnaire d'événements onChange
        handleChange(event); // Appelle le deuxième gestionnaire d'événements onChange
      };

    return (
        <>
        <div className='inscription_3'>
            <div className='imginscriptiontop2'>
                <img src={Group13} alt=""/>
                <div className='inscription_search2'>
                <div className='inscription_Icone2'>
                {showIcon && <img src={Loupeinscription} alt="Icône" />}
                </div>
                <input type="text" placeholder="Search for a name" className="formulaire_insc2" value={text} onChange={handleInputChange2}/>
            </div>
            </div>
            <div className='inscription_groupe1'>
            <span>yaugourt.ltc</span>
            <div className='inscription_center2'>
                <div className='inscription_text3'>
                    <p>Register yaugourt.ltc</p>
                    <div className='inscription3_groupe1text2'>
                        <div className='inscription3_groupv1'>
                            <img src="" alt=""/>
                            <p>20,6 Sats</p>
                        </div>
                        <div className='inscription3_groupv2'>
                            <button type="button">LTC</button>
                            <button type="button">USD</button>
                        </div>
                    </div>
                    <div className='inscription3_group1text1'>
                        <div>
                            <p>Registration</p>
                            <p>Est.network fee</p>
                            <p>Esitmated total</p>
                        </div>
                        <div>
                            <p>0,3 LTC</p>
                            <p>0,01 LTC</p>
                            <p>0,31 LTC</p>
                        </div>
                    </div>
                    <div className='inscription3_group1text1button'>
                        <button type="button">Register</button>
                    </div>
                </div>
            </div>
            </div>
            <div className='inscription_imgbotttom2'>
                <img src={happyemoji} alt=""/>
            </div>
        </div>
        </>
        );
    }
    export default Inscription2;
    