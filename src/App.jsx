import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Graph } from './components/temp graph/graph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Graph />
    </div>
  )
}

export default App
