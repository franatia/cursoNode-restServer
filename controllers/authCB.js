const {request, response} = require('express');
const Usuario = require('../models/userClass');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar_jwt');

const login = async(req = request, res = response) =>{

    const {mail, password} = req.body;

    try{

        // Verificar si el mail existe 

        const user = await Usuario.findOne({mail});
        if(!user){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - mail'
            });
        };

        // Verificar si el usuario esta activo

        if(!user.status){
            return res.status(400).json({
                msg:`Usuario / Password no son correctos - status:${user.status}`
            });
        };


        // Verificar el pasword
        const validPassword = await bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });

    }catch(err){

        console.log(err);

        return res.status(500).json({
            msg:'Hable con el administrador'
        })

    }

};

module.exports = {
    login
};