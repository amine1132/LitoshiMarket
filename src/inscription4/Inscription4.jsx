import React, { useState } from 'react'
import g8 from './g8.svg'
import happyemoji from './happyemoji.svg'
import Group18 from './Group18.svg' 
import Group13 from './Group13.svg'
import './Inscription4.css'
import search from './search.svg'
import Vector from './Vector.svg'
import Loupeinscription from './Loupeinscription.svg'
import available from './available.svg'
import notavailable from './notavailable.svg'
import Cadi from './Cadi.svg'
import Lunette from './Lunette.svg'



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
            <div className='inscription_center4'>
                <div className='inscription_center4img'>
                    <img src={Lunette} alt=""/>   
                </div>
                <div className='inscription_text4'>
                    <p>Register yaugourt.ltc</p>
                    <div className='inscription_available'>
                    <div className='inscription_availablev2'>
                        <input type="input" readOnly placeholder="yaugourt.ltc" name="" value={text}/>
                        <div className='inscription_buttonavaible'>
                            <button type="button"><img src={available} alt=""/></button>
                        </div>
                    </div>
                    <div className='inscription_availablev2'>
                        <input type="input"  readOnly placeholder="yaugourt.litecoin" name="" value={text}/>
                        <div className='inscription_buttonavaible'>
                        <button type="button"><img src={available} alt=""/></button>
                        </div>
                    </div>
                    <div className='inscription_availablev2'>
                        <input type="input"  readOnly placeholder="yaugourt.lite" name="" value={text}/>
                        <div className='inscription_buttonavaible'>
                        <button type="button"><img src={available} alt=""/></button>
                        </div>
                    </div>
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
    