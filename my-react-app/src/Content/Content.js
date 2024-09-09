import { useEffect, useState } from "react";
import Card from '../Card/Card'
import './Content.css';


export default function Content() {

  const [taches, setTaches] = useState([]);
  const [titre, setTitre] = useState();
  const [frequence, setFrequence] = useState();


/******* Récupération des tâches de la bdd (Mongodb) ***************/

  useEffect(() => {
    const fetchTaches = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      setTaches(data);

    }
    fetchTaches();

  }, [])

/****** Création d'une tâche *************/

  function creationCarte(e) {
    e.preventDefault();
  
    const tache = { titre, frequence };
  
    const postData = async (url = '', data = {}) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi des données');
        }
  
        const result = await response.json();
        return result; // Retourner le résultat après avoir reçu la réponse
  
      } catch (error) {
        console.error('Erreur:', error);
        throw error; // Lancer l'erreur pour la gestion des erreurs plus haut
      }
    };
  
    postData('http://localhost:5000/tasks', tache)
      .then(result => {
        console.log('Tâche ajoutée avec succès:', result);
        setTaches(prevTaches => [...prevTaches, result]); // Ajouter la nouvelle tâche au tableau des tâches existant

        // Ici vous pouvez mettre à jour votre état ou faire d'autres actions nécessaires après l'ajout de la tâche
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
      });


  }
  

  /**** Suppression d'une tâche *********/

  function deleteCard(id) {
    // Envoyer une requête DELETE à l'API
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
      }
      return response.json(); // Retourne la réponse JSON après la suppression
    })
    .then(() => {
      // Mettre à jour l'état pour supprimer la tâche côté client
      setTaches(prevTaches => prevTaches.filter(tache => tache._id !== id));
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  }
  

  return (
    <div className="container px-3">
      <h2 className="is-size-4 py-5">Écrivez vos tâches</h2>
      <form onSubmit={creationCarte}>
        <div className="field">
          <div className="control">
            <label htmlFor="tache" className="label">Titre</label>
            <input type="text" id="tache" className="input" onChange={e => setTitre(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="contenu" className="label">Fréquence</label>
            <textarea type="textarea" id="contenu" className="input" onChange={e => setFrequence(e.target.value)} />
          </div>

        </div>
        <div className="control">
          <button className="button is-link">Créer</button>
        </div>
      </form>
      {
        taches.map((tache, index) => (
          <Card
            key={index}
            id = {tache._id}
            titre={tache.titre}
            frequence={tache.frequence}
            suppr={deleteCard}
          />
        ))
      }
    </div>

  )
}
