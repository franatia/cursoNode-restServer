const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignIn } = require('../controllers/authCB');
const {validCampos} = require('../middlewares/valid_campos');
 
const router = Router();

router.post('/login',[
    check('mail','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validCampos
],login);

router.post('/google',[
    check('id_token','Es necesario el token de google').not().isEmpty(),
    validCampos
],googleSignIn);

module.exports = router;