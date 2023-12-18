import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Register from "./Register";
import Swal from 'sweetalert2'

const Login = ({ userName, setisLogger }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Estado para mostrar el formulario register
  const [showRegister, setShowRegister] = useState(false);

  {/*Funcion para administrar la informacion del formulario y hacer post a base de datos*/}
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        username,
        password,
      };
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        payload
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.username);
      setisLogger(true);
      Swal.fire(
        'Good job!',
        'Te has logueado correctamente!',
        'success'
      )
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.err}`,
      })
    }
  };

  // Funcion para mostrar el formulario de registro
  const handleShowRegister = () => {
    setShowRegister(true);
  };

  return (
    <div className="login-page">
      {/* Renderiza el formulario de registro si showRegister es true */}
      {showRegister ? (
        <Register
          userName={userName}
          setisLogger={setisLogger}
        />
      ) : (
        <Form className="login-form" onSubmit={handleSubmitLogin}>
          <Form.Group controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            Login
          </Button>

          <Button variant="link" onClick={handleShowRegister}>
            ¿No tienes cuenta? Regístrate aquí
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Login;
