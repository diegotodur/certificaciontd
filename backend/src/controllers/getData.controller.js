import db from "../database/database.js";

// Reporte que que entrega el listado de tiendas, customer id, id territorio e id de tienda.
export const getDataWithoutFilters = async (req, res) => {
  try {
    const response = await db.query(`
        SELECT 
          s.businessentityid 
        AS 
          store_id, 
          t.territoryid AS territory_id, 
          c.customerid AS customer_id, 
          s.name AS store_name
        FROM 
          customer c
        JOIN 
          store s ON c.storeid = s.businessentityid
        JOIN 
          salesterritory t ON c.territoryid = t.territoryid;`);

    if (response.rows.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(response.rows);
    }

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la data",
      error,
    });
  }
};

// Reporte que que entrega el listado de tiendas, customer id, id territorio e id de tienda en base a filtros interactivos.
export const filterData = async (req, res) => {
  const { patronNombreTienda, tiendasSeleccionadas, codigoTerritorio } =req.query;
   

   if (patronNombreTienda && isNaN(patronNombreTienda)) {
    return res.status(400).json({ message: "El valor de patronNombreTienda debe ser numérico." });
  }

  if (tiendasSeleccionadas) {
    if (!Array.isArray(tiendasSeleccionadas)) {
      return res.status(400).json({ message: "El valor de tiendasSeleccionadas debe ser una lista." });
    }   
  }


  if (codigoTerritorio && isNaN(codigoTerritorio)) {
    return res.status(400).json({ message: "El valor de codigoTerritorio debe ser numérico." });
  }

  try {
    let query = `
      SELECT s.businessentityid 
      AS store_id, t.territoryid AS territory_id, c.customerid AS customer_id, s.name AS store_name
      FROM customer c
      JOIN store s ON c.storeid = s.businessentityid
      JOIN salesterritory t ON c.territoryid = t.territoryid
      WHERE 1=1`;

    const queryParams = [];

    if (patronNombreTienda) {
      query += ` AND s.businessentityid = $${queryParams.length + 1}`;
      queryParams.push(patronNombreTienda);
    }

    if (tiendasSeleccionadas && tiendasSeleccionadas.length > 0) {
      query += ` AND s.name = ANY($${queryParams.length + 1})`;
      queryParams.push(tiendasSeleccionadas);
    }

    if (codigoTerritorio) {
      query += ` AND t.territoryid = $${queryParams.length + 1}`;
      queryParams.push(codigoTerritorio);
    }

    const response = await db.query(query, queryParams);

    if (response.rows.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al filtrar los clientes",
      error,
    });
  }
};
