import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";

import axios from "axios";
import { useState } from "react";
import Error from "./Error";

const Menu = ({ data }) => {
  //Variables de los filtros
  const [idStore, setidStore] = useState("");
  const [selectStores, setselecStores] = useState([]);
  const [idTerritory, setidTerritory] = useState("");

  //Variable para manejar el error de los filtros
  const [errorMessage, setErrorMessage] = useState("");
  const [filterError, setFilterError] = useState(false);

  //Variables de los resultados de consulta axios
  const [isFilterReady, setIsFilterReady] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  //Funciones de los filtros, para poder setear los valores
  const handleStoreId = (event) => {
    setidStore(event.target.value);
  };

  const handleSelectStores = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setselecStores(selectedOptions);
  };

  const handleIdTerritory = (event) => {
    setidTerritory(event.target.value);
  };

  //Funcion para enviar los datos al backend, regresando los datos filtrados
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/getdata/`, {
        params: {
          patronNombreTienda: idStore,
          tiendasSeleccionadas: selectStores,
          codigoTerritorio: idTerritory,
        },
      });

      console.log(response);

      if (response.data.length === 0) {
        setFilteredData([]);
      } else {
        setFilteredData(response.data);
      }

      setIsFilterReady(true);
      setFilterError(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setFilteredData([]);
      setIsFilterReady(false);
      setFilterError(true);
    }
  };

  //Variables de Paginacion
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  const handleSelect = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const lastIndex = activePage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      {/*Muestra de componente error*/}
      {filterError && (
        <Error>
          <p>{errorMessage}</p>
        </Error>
      )}

      <div className="filter-container">
        <Form onSubmit={handleSubmit}>
          <div className="filter-row">
            {/*Filtro para id de tienda*/}
            <Form.Group className="filter-item">
              <Form.Label>ID Tienda:</Form.Label>
              <Form.Control
                className="filter-item-input"
                type="number"
                value={idStore}
                onChange={handleStoreId}
                max={9999}
              />
            </Form.Group>
            {/*Filtro para listado de tiendas*/}
            <Form.Group className="filter-item">
              <Form.Label>Nombre Tienda:</Form.Label>
              <FloatingLabel controlId="floatingSelect">
                <Form.Select
                  style={{ height: "70px" }}
                  aria-label="Default select example"
                  onChange={handleSelectStores}
                  multiple
                >
                  {data.map((data) => (
                    <option key={data.customer_id} value={data.store_name}>
                      {data.store_name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            {/*Filtro para id de territorios*/}
            <Form.Group className="filter-item">
              <Form.Label>ID Territorio:</Form.Label>
              <Form.Control
                className="filter-item-input"
                type="number"
                value={idTerritory}
                onChange={handleIdTerritory}
                max={9999}
              />
            </Form.Group>
          </div>
          <div className="form-button">
            <Button variant="primary" type="submit">
              Filtrar
            </Button>
          </div>
        </Form>
      </div>

      {/*Tabla de resultados*/}
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Identificador Tienda</th>
            <th>Identificador Territorio</th>
            <th>Identificador Cliente</th>
            <th>Nombre Tienda</th>
          </tr>
        </thead>
        <tbody>
          {/*Manejo errores en caso de que el filtrado no regrese nada*/}
          {isFilterReady ? (
            filteredData.length === 0 ? (
              <tr>
                <td colSpan="4">No hay registros</td>
              </tr>
            ) : (
              filteredData.slice(firstIndex, lastIndex).map((data) => (
                <tr key={data.customer_id}>
                  <td>{data.store_id}</td>
                  <td>{data.territory_id}</td>
                  <td>{data.customer_id}</td>
                  <td>{data.store_name}</td>
                </tr>
              ))
            )
          ) : (
            data.slice(firstIndex, lastIndex).map((data) => (
              <tr key={data.customer_id}>
                <td>{data.store_id}</td>
                <td>{data.territory_id}</td>
                <td>{data.customer_id}</td>
                <td>{data.store_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {/*Pagino resultados para no poblar en exceso la pagina*/}
      <Pagination className="mt-3">
        <Pagination.Prev
          onClick={() => handleSelect(activePage - 1)}
          disabled={activePage === 1}
        />
        {Array.from({
          length: Math.ceil(filteredData.length / itemsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === activePage}
            onClick={() => handleSelect(index + 1)}
          >
            {console.log(index)}
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handleSelect(activePage + 1)}
          disabled={
            activePage === Math.ceil(filteredData.length / itemsPerPage)
          }
        />
      </Pagination>
    </Container>
  );
};

export default Menu;
