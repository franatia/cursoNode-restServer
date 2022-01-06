const {response, request} = require('express');
const Usuario = require('../models/userClass.js');
const bcryptjs = require('bcryptjs');

const userGet = async (req = request ,res = response)=>{

    const {limite = 5, desde = 0} = req.query;
    const query = {status:true}

    const resp = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)    
        .limit(limite)
    ]);

    res.json({
        resp
    });

}

const userPut = async (req = request ,res = response)=>{

    const {id} = req.params;
    const {_id, password, google, mail, ...resto} = req.body;

    // Validar contra DB

    if(password){
        
        
        const salt = await bcryptjs.genSaltSync();

        resto.password = await bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        from:'put',
        usuario
    });

}

const userPost = async(req = request, res = response)=>{

    const {name, mail, password, role} = req.body;
    const usuario = new Usuario({name, mail, password, role});

    // Encriptar el pass
    const salt = await bcryptjs.genSaltSync();

    usuario.password = await bcryptjs.hashSync(password, salt);

    // Almacenamos usuario
    await usuario.save();

    res.status(201).json({
        usuario
    })

}

const userDelete = async(req = request,res = response)=>{

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{status:false});

    res.json(usuario);

}

const userCb = {

    userGet,
    userPost,
    userPut,
    userDelete

}

module.exports = {

    userCb

}