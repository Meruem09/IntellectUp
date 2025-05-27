import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn';

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Router>
          <Routes>
            <Route path="/" element={<Form/>}></Route>
            <Route path="/signIn" element={<SignIn/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
          </Routes>
        </Router>
    </>
  )
}

export default App
