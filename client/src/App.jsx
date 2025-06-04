import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Onboarding from './components/Onboarding';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Header/>
      <Router>
          <Routes>
            <Route path="/" element={<Form/>}></Route>
            <Route path="/signIn" element={<SignIn/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
            <Route path="/board" element={<Onboarding/>}></Route>
            <Route path="/chat" element={<ChatWindow/>}></Route>
            {/* <Route path="/header" element={<Header/>}></Route> */}

          </Routes>
        </Router>
    </>
  )
}

export default App
