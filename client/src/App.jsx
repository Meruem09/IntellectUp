import { useState } from 'react'
import './App.css'
import SignUp from './components/Auth'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Form/>
    </>
  )
}

export default App
