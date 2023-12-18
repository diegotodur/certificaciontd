-- Se requiere un reporte que entregue el listado de clientes que se representan como tiendas (aquellos que tienen null en 
-- personid y not null en storeid), la salida debiese mostrar un resultado similar al que se presenta a continuación:
SELECT c.customerid, c.personid, c.storeid, c.territoryid
    FROM customer c
    WHERE c.personid IS NULL AND c.storeid IS NOT NULL;


-- Generar un reporte con el monto a cancelar en la orden 44541.
SELECT salesorderid, SUM(orderqty * unitprice) AS totalAmount
FROM salesorderdetails
WHERE salesorderid = 44541
GROUP BY salesorderid;


-- Se necesita un reporte que muestre la cantidad de clientes por territorio.
SELECT t.name AS territory_name, COUNT(*) AS client_count
FROM salesterritory t
JOIN customer c ON t.territoryid = c.territoryid
GROUP BY t.name;
