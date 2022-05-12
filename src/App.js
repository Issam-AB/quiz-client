import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import Authenticate from "./components/Authenticate";
import CreateQuiz from "./components/CreateQuiz";
import ForgetPassword from "./components/ForgetPassword";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/result" element={<Result />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
