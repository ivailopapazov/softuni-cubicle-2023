const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');
const { isAuthenticated } = require('./middlewares/authMiddleware');
const { handleRequest } = require('./utils/requestUtils');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);
router.get('/404', homeController.getErrorPage);

router.use('/', authController);

router.get('/cubes/create', isAuthenticated, handleRequest(cubeController.getCreateCube));
router.post('/cubes/create', isAuthenticated, handleRequest(cubeController.postCreateCube));
router.get('/cubes/:cubeId/details', handleRequest(cubeController.getDetails));
router.get('/cubes/:cubeId/edit', isAuthenticated, handleRequest(cubeController.getEditCube));
router.post('/cubes/:cubeId/edit', handleRequest(cubeController.postEditCube));
router.get('/cubes/:cubeId/delete', handleRequest(cubeController.getDeleteCube));
router.post('/cubes/:cubeId/delete', handleRequest(cubeController.postDeleteCube));
router.get('/cubes/:cubeId/attach', handleRequest(cubeController.getAttachAccessory));
router.post('/cubes/:cubeId/attach', handleRequest(cubeController.postAttachAccessory));

router.use('/accessories', accessoryController);

module.exports = router;