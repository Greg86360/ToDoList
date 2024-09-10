import './Card.css';
export default function Card({ titre, frequence, id, suppr, tache, update }) {
  return (
    <div className="card has-background-primary  my-5">
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
