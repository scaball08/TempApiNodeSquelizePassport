import {Router} from 'express';

const router =  Router();

import {createTask,getTasks,deleteTask,updateTask,getOneTask,getTaskByProject} from '../controllers/task.controller'
import {ensureAuthenticated} from '../middlewares/custhom'

// cargar middleware de jwt
router.use(ensureAuthenticated);

// /api/tasks/
router.post('/',createTask);
router.get('/',getTasks);

// /api/tasks/:id
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);
router.get('/:id',getOneTask);
router.get('/project/:projectid',getTaskByProject);

export default router;