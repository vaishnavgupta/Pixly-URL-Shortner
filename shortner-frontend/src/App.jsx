
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { getRouterToUse } from './utils/helper'


function App() {
  const CurrentApp = getRouterToUse();

  return (
    <>
      <Router>
        <CurrentApp/>
      </Router>
    </>
  )
}

export default App
