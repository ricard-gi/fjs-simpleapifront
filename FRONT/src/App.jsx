import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [alumnes, setAlumnes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/alumnes')
      .then(response => response.json())
      .then(resposta => setAlumnes(resposta))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
    <h1>Alumnes</h1>
      <ul>
        {alumnes.map(alumne => (
          <li key={alumne.id}>
            <p>{alumne.nom}</p>
            <p>{alumne.email}</p>

          </li>
        ))}
      </ul>
    </>
  )
}

export default App
