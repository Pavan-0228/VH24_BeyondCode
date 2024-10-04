import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Questionnaire from './Questionnaire'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=''>
      <Sidebar/>
    </div>
    </>
  )
}

export default App
