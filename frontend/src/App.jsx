import { useEffect, useState } from "react";
import NavigationBar from "./components/Navbar";
import Menu from "./components/Menu";
import axios from "axios";
import "./assets/styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [data, setData] = useState([]);
  const [userName, setuserName] = useState("");
  const [isLogger, setisLogger] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  {/* Usamos useEffect para escuchar los cambios dentro de react, solicitando la informacion a usar en Menu */}
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api/getdata");
      setData(res.data);
    };
    getData();
  }, []);

  //Funciones para mostrar el formulario de registro, login Y MENU
  const handleLogin = () => {
    setisLogger(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleMenu = () => {
    setShowRegister(false);
    setisLogger(true);
  };

  useEffect(() => {
    const isLogger = localStorage.getItem("token");
    if (isLogger) {
      setisLogger(true);
    }
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setuserName(userName);
    }
  }, [userName]);

  return (
    <>
      <NavigationBar isLogger={isLogger} setisLogger={setisLogger} userName={userName}/>
      {/* Verificamos los estados para mostrar el contenido especifico */}
      {!isLogger && !showRegister && (
        <Login
          setuserName={setuserName}
          userName={userName}
          setisLogger={handleLogin}
          handleRegister={handleRegister}
        />
      )}
      {!isLogger && showRegister && (
        <Register
          setuserName={setuserName}
          userName={userName}
          setisLogger={handleMenu}
        />
      )}
      {isLogger && (
        <Menu data={data} setData={setData} userName={userName} />
      )}
      
    </>
  );
}

export default App;
