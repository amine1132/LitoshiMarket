import React from 'react'
import g8 from './g8.svg'
import happyemoji from './happyemoji.svg'
import Group18 from './Group18.svg' 
import './Inscription.css'
import search from './search.svg'

function Inscription() {
    return (
        <>
        <div className='inscription_'>
            <div className='imginscriptiontop'>
                <img src={Group18} alt=""/> 
            </div>
            <div className='inscription_center'>
                <div className='inscription_text'>
                <span>Your web3 username</span>
                <p>Your identity across web3, one name for all
                your crypto addresses, and your decentralised website.</p>
                </div>
            <div className='inscription_search'>
            <div className="loupe">
                <img src={search} alt=""/>
            </div>
            <div>
                <input type="text" placeholder="Search for a name" className="formulaire_insc"/>
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
    