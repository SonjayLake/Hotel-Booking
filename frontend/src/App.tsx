import { Navigate, Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}/>
          <Route path="search" element={<>Search Page</>}/>
          <Route path="*" element={<Navigate to="/"/>}/>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
