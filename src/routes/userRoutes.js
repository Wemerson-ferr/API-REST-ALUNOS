import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Deveria ser somente para usuários ADM (caso exista!)
router.get('/', loginRequired, userController.index);
router.get('/:id', loginRequired, userController.show);

router.post('/', userController.create);
router.put('/', loginRequired, userController.update);

/* Não é aconselhável excluir totalmente um usuário do sistema
tente achar alguma forma de gerenciar isto!
*/
router.delete('/', loginRequired, userController.delete);

export default router;
