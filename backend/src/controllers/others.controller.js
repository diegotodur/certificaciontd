import db from "../database/database.js";

//Estas solicitudes se hicieron para probar funcionalidades y las consultas sql descritas en report.sql

//Query para obtener las tiendas
export const getStores = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM store");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las tiendas",
      error,
    });
  }
};

//Query para obtener las personas, sus id y la tienda.
export const getData = async (req, res) => {
  try {
    const response = await db.query(`
    SELECT
        c.customerid,
        p.firstname || ' ' || p.lastname AS customer_name,
        s.name AS store_name
    FROM
        customer c
    INNER JOIN
        person p ON c.personid = p.businessentityid
    INNER JOIN
        store s ON c.storeid = s.businessentityid;`);
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las tiendas",
      error,
    });
  }
};

// Se requiere un reporte que entregue el listado de clientes que se representan como tiendas
// (aquellos que tienen null en personid y not null en storeid)
export const getClients = async (req, res) => {
  try {
    const response = await db.query(`
          SELECT 
            c.customerid, 
            c.personid, 
            c.storeid, 
            c.territoryid
          FROM customer c
          WHERE 
            c.personid IS NULL 
            AND c.storeid IS NOT NULL;`);

    if (response.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontraron datos",
      });
    } else res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los datos",
      error,
    });
  }
};

// Se requiere un reporte que entregue el monto total de una orden (totaldue) dado el id de la orden.
export const getOrderTotal = async (req, res) => {
  const orderId = 44541;

  try {
    const response = await db.query(
      `
      SELECT o.orderid, o.orderdate, o.totaldue
      FROM salesorderheader o
      WHERE o.orderid = $1;`,
      [orderId]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({
        message: "Orden no encontrada",
      });
    }

    const order = response.rows[0];
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el monto de la orden",
      error,
    });
  }
};

// Se requiere un reporte que entregue la cantidad de clientes por territorio.
export const getClientsbyTerritory = async (req, res) => {
  try {
    const response = await db.query(`
        SELECT 
          t.territoryid, 
          t.name AS territory_name, 
        COUNT(*) AS client_count
        FROM 
          salesterritory t
        JOIN 
          customer c ON t.territoryid = c.territoryid
        GROUP BY 
          t.territoryid, t.name`
    );

    if (response.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontraron datos",
      });
    } else res.status(200).json(response.rows);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la cantidad de clientes por territorio",
      error,
    });
  }
};
