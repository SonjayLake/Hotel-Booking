import {
  Navigate,
  Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Homepage</p>
              </Layout>
            }
          />
          <Route
            path="search"
            element={
              <Layout>
                <p>Search page</p>
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
