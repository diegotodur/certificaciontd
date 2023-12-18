import {Router} from 'express';
import {
    filterData,
    getDataWithoutFilters
} from '../controllers/getData.controller.js'

import {
    getStores,
    getData,
    getClients,
    getClientsbyTerritory
} from '../controllers/others.controller.js'


const router = Router();

router.get('/stores', getStores);
router.get('/data', getData);
router.get('/clients', getClients);
router.get('/clientsbyterritory', getClientsbyTerritory);

//Usaremos estas dos para el frontend
router.get('/getdata/', filterData);
router.get('/getdata', getDataWithoutFilters);


export default router;