const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/userClass');


const validarJWT = async(req = request, res = response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    };

    try{
        
        const {uid} = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        // leer el usuario que corresponde al uid

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - usuario inexistente'
            });
        }

        // Verificar si el uid tiene status : true

        if(!usuario.status){
            return res.status(401).json({
                msg:'Token no valido - status:false'
            });
        };

        req.usuario = usuario;

        next();

    }catch(err){

        console.log(err);
        return res.status(401).json({
            msg:'Token no valido'
        })

    }

}

module.exports = {
    validarJWT
}