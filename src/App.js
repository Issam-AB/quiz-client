import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import Authenticate from "./components/Authenticate";
import ForgetPassword from "./components/ForgetPassword";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Signup from "./components/Signup";
import useStateContext from "./hooks/useStateContext";

function App() {
  const { context } = useStateContext();
  // const RequiredAdmin = (children) => {
  //   return context.email === "Issam.aboulfadl05@gmail.com" ? (
  //     <Navigate to="/admin" />
  //   ) : (
  //     children
  //   );
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route
              path="/admin"
              element={
                // <RequiredAdmin>
                <AdminPage />
                // </RequiredAdmin>
              }
            />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
