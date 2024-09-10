import React, { useState } from 'react';

import './Card.css';
export default function Card({ titre, frequence, id, suppr, tache, update, patch }) {
  
    // Utiliser un état pour suivre si la carte a été cliquée
    const [isClicked, setIsClicked] = useState(false);

    // Fonction pour basculer l'état quand on clique sur la carte
    const handleCardClick = () => {
      setIsClicked(!isClicked); // On inverse la valeur de isClicked
      
    };
    return (
      // <div className="card has-background-primary  my-5" onClick={()=>console.log("coucou")}>
      <div
        className={`card ${isClicked ? 'has-background-warning' : 'has-background-primary'}`} // Change la classe dynamiquement
        // onClick={handleCardClick} // Gestion du clic
        onClick = {()=> console.log(patch(id,tache.etat))}>
        <div className="card-content columns">
          <div className="content column">
            <div className='bouton'>
              <h3 className="px-4">{titre}</h3>
              <button className="delete" onClick={() => suppr(id)}></button>
            </div>

            <p className="is-size-4 px-4">{frequence}</p>
            <div className="bouton update">
              <button className="button is-white is-outlined" onClick={() => update(tache)}>Modifier</button>
            </div>


          </div>
        </div>

      </div>
    )
  }
