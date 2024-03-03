import { Navigate, Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          <Layout>
            <p>Homepage</p>
          </Layout>
        }/>
          <Route path="search" element={
                      <Layout>
                      <p>Search page</p>
                    </Layout>
          }/>
          <Route path="*" element={<Navigate to="/"/>}/>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
