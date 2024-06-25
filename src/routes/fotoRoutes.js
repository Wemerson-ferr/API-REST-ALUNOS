import { Router } from 'express';

import fotoController from '../controllers/FotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Caso fosse mais de um arquivo por requisição, poderiamos usar o upload.array -> consulte doc
router.post('/', loginRequired, fotoController.store);

export default router;
