import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Users from './pages/Users'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Layout>
  )
}

export default App
