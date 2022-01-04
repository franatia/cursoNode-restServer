const {Router} = require('express');
const {userCb} = require('../controllers/user');
const {userGet, userPost, userPut, userDelete} = userCb

const router = Router();

router.get('/',userGet);

router.put('/:id',userPut);

router.delete('/',userDelete);

router.post('/',userPost);

module.exports = router;