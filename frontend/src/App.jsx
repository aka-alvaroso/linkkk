import { Routes, Route } from 'react-router-dom'
import Test from './pages/Test.jsx'
import Redirect from './components/Redirect.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/test" element={<Test />} />
      <Route path="/r/:shortCode" element={<Redirect />} />
    </Routes>
  ) 
  
}

export default App
