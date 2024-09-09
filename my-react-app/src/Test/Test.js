
export default function Test() {
      fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then(data => this.setTache({data}));
}

    


