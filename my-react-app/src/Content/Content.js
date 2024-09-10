import { useEffect, useState } from "react";
import Card from '../Card/Card'
import './Content.css';


export default function Content() {

  const [taches, setTaches] = useState([]);
  const [titre, setTitre] = useState();
  const [frequence, setFrequence] = useState();
  const [selectedTask, setSelectedTask] = useState(null);



  /******* Récupération des tâches de la bdd (Mongodb) ***************/

  useEffect(() => {
    const fetchTaches = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      setTaches(data);

    }
    fetchTaches();

  }, [])



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

  /******** Ajout et  Mise à jour d'une tâche   ******/
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    console.log(selectedTask);
    if (selectedTask) {
      // Créer l'objet représentant la tâche mise à jour
      const updatedTask = { titre: titre, frequence: frequence };

      // Envoyer la requête PUT au backend
      try {
        const response = await fetch(`http://localhost:5000/tasks/${selectedTask._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la tâche');
        }

        const data = await response.json();

        // Mettre à jour la liste locale de tâches
        setTaches(taches.map(t => (t._id === selectedTask._id ? data : t)));

        // Réinitialiser le formulaire après mise à jour
        setSelectedTask(null);
        setTitre('');
        setFrequence('');
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
    /**** Création d'une tache ***/

    else {
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
          // Réinitialiser le formulaire après mise à jour
          setSelectedTask(null);
          setTitre('');
          setFrequence('');
          // Ici vous pouvez mettre à jour votre état ou faire d'autres actions nécessaires après l'ajout de la tâche
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la tâche:', error);
        });



    }
  };

 /*** Gestion de la tâche de sélection */
  const handleSelectTask = (tache) => {
    setSelectedTask(tache);
    setTitre(tache.titre);
    setFrequence(tache.frequence);
  }


  return (
    <div className="container px-3">
      <h2 className="is-size-4 py-5">Écrivez vos tâches</h2>
      <form onSubmit={handleUpdateTask}>
        <div className="field">
          <div className="control">
            <label htmlFor="tache" className="label">Titre</label>
            <input type="text" id="tache" className="input" value={titre} onChange={e => setTitre(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="contenu" className="label">Fréquence</label>
            <textarea type="textarea" id="contenu" className="input" value={frequence} onChange={e => setFrequence(e.target.value)} />
          </div>

        </div>
        <div className="control">
          <button className="button is-link has-background-primary">Créer</button>
        </div>
      </form>
      {
        taches.map((tache, index) => (
          <Card
            key={index}
            update={handleSelectTask}
            id={tache._id}
            titre={tache.titre}
            frequence={tache.frequence}
            suppr={deleteCard}
            tache={tache}
          />
        ))
      }
    </div>

  )
}
