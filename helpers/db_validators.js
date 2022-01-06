const Role = require('../models/role');
const Usuario = require('../models/userClass');

const roleValid = async (role = '')=>{
        
    const existsRol = await Role.findOne({role});

    if (!existsRol){
        throw new Error(`El rol ${role} no esta registrado en DB`);
    }

};

const existsEmail = async(mail = '') =>{

    const exEmail = await Usuario.findOne({mail});

    if(exEmail){

        throw new Error(`El mail ${mail} esta en uso, prueba con otro`);

    };

};

const existsUserById = async(id) =>{

    const exUser = await Usuario.findById(id);

    if(!exUser){

        throw new Error(`El id ${id} no existe, ingrese uno valido`);

    };

};

module.exports = {
    roleValid,
    existsEmail,
    existsUserById
};