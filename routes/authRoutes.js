const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/authCB');
const {validCampos} = require('../middlewares/valid_campos');
 
const router = Router();

router.post('/login',[
    check('mail','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validCampos
],login);

module.exports = router;