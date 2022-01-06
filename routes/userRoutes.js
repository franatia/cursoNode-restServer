const {Router} = require('express');
const {userCb} = require('../controllers/userCB');
const {userGet, userPost, userPut, userDelete} = userCb;
const {check} = require('express-validator');
const {validCampos} = require('../middlewares/valid_campos');
const {roleValid, existsEmail, existsUserById} = require('../helpers/db_validators');

const router = Router();

router.get('/',userGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(roleValid),
    validCampos
],userPut);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existsUserById),
    validCampos
],userDelete);

router.post('/',[
    check('name','El name no es valido').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 caracteres').isLength({min:6}),
    check('mail', 'El mail no es valido').isEmail(),
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(roleValid),
    check('mail').custom(existsEmail),
    validCampos
],userPost);

module.exports = router;