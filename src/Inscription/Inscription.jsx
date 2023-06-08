import React, { useState } from 'react'
import g8 from './g8.svg'
import happyemoji from './happyemoji.svg'
import Group18 from './Group18.svg' 
import './Inscription.css'
import search from './search.svg'
import Vector from './Vector.svg'
import Loupeinscription from './Loupeinscription.svg'


function Inscription() {
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
        <div className='inscription_'>
            <div className='imginscriptiontop'>
                <img src={Group18} alt=""/> 
            </div>
            <div className='inscription_center'>
                <div className='inscription_text'>
                <span>Your Litecoin domain name</span>
                <p>Your identity across Litecoin ecosystem, from a complex adress
                to a simple one.</p>
                </div>
            <div className='inscription_search'>
                <div className='inscription_Icone'>
                {showIcon && <img src={Loupeinscription} alt="Icône" />}
                </div>
                <input type="text" placeholder="Search for a name" className="formulaire_insc" value={text} onChange={handleInputChange2}/>
                <div className='button_inscriptionv1'>
                {text && <button  onClick={handleClear}><img src={Vector} alt=""/></button>}
                </div>
                <div className='inscription_button'>
                <button>.ltc</button>
                </div>
            </div>
            </div>
            <div className='inscription_imgbotttom'>
                <img src={happyemoji} alt=""/>
            </div>
        </div>
        </>
        );
    }
    export default Inscription;
    