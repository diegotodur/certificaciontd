import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2'

import Login from "./Login";

const Register = ({ setisLogger }) => {

  // Estados para el formulario de registro
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar el formulario de login
  const [showLogin, setShowLogin] = useState(false);

  // Post a backend para registro de usuario
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/register`,
        {
          params: {
            username,
            email,
            password,
          },
        }
      );
      localStorage.setItem("token", response.data);
      localStorage.setItem("userName", response.data.username);
      setisLogger(true);
      Swal.fire(
        'Good job!',
        'Te has registrado correctamente!',
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

  // Función para mostrar el formulario de inicio de sesión
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <div>
      {/*Si es que el usuario seleciona querer iniciar sesion segun el link abajo del form, mostramos Login*/}
      {showLogin ? (
        <Login
          setisLogger={setisLogger}
        />
      ) : (
        <Form onSubmit={handleRegister} className="register-form">
          <Form.Group controlId="username">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Elon Musk"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            Registrarse
          </Button>

          <Button variant="link" onClick={handleShowLogin}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Register;
