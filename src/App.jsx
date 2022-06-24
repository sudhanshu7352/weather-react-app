import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Graph } from './components/temp graph/graph'
import { Home } from './components/home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Home />
      <Graph />
    </div>
  )
}

export default App
