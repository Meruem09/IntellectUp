import { useState } from 'react'
import './App.css'
import SignUp from './components/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <SignUp/>
      <div class="text-3xl font-bold ">Hello?</div>
    </>
  )
}

export default App
