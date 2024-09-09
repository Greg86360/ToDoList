export default function Card({titre, frequence, index, suppr}) {
  return (
    <div className="card has-background-primary  my-5">
        <div className="card-content columns">
            <div className="content column">
                <h3 className="px-4">{titre}</h3>
                <p className="is-size-4 px-4">{frequence}</p>
            <button className="delete" onClick={() => suppr(index)}></button>
            </div>
        </div>
      
    </div>
  )
}
