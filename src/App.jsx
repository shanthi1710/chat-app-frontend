import { Container } from "reactstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/Registration";
import SignIn from "./components/Login";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user-chat" element={<Home />}/>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Container>
  );
}
