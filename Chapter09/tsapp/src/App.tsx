import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Hello ${name}`);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
      />
      <input type="submit" value="Submit" />
    </form>
    </>
  )
}

export default App
