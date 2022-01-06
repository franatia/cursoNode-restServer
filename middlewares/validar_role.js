const { request, response } = require("express");
const role = require("../models/role");
const { findById } = require("../models/userClass");

const validAdminRole = (req = request, res = response, next) =>{

    if(!req.usuario){

        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        });

    };

    const {role, name} = req.usuario;

    console.log(role);

    if(role !== 'ADMIN_ROLE'){

        return res.status(401).json({
            msg:`${name} no es administrador - No tiene permisos`
        });

    };

    next();

}

const validRole = ( ...roles ) => {

    return (req = request, res = response, next) =>{

        if(!req.usuario){

            return res.status(500).json({
                msg:'Validar token primero'
            });

        };

        if(!roles.includes(req.usuario.role)){

            return res.status(401).json({
                msg:`El servicio require uno de estos roles ${roles}`
            });

        };

        next();

    }

}



module.exports = {
    validAdminRole,
    validRole
};