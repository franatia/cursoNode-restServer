const validarJWT = require('../middlewares/validar_jwt');
const validarRole = require('../middlewares/validar_role');
const validarCampos = require('../middlewares/valid_campos');

module.exports = {

    ...validarJWT,
    ...validarRole,
    ...validarCampos

};


