const {request, response, json} = require('express');
const Usuario = require('../models/userClass');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar_jwt');
const { googleVerify } = require('../helpers/google_verify');

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

const googleSignIn = async (req = request, res = response, next) =>{

    const {id_token}  = req.body;

    try{

        const {email, name, picture} = await googleVerify(id_token);

        let user = await Usuario.findOne({mail:email});

        if(!user){

            // Tengo que crearlo

            const data = {

                name,
                mail:email,
                password:':P',
                picture,
                google:true,
                role:'USER_ROLE'

            };

            user = new Usuario(data);

            await user.save()

        }

        // Si el usuario en DB

        if(!user.status){

            return res.status(401).json({

                msg:'Hable con el adminsitrador, usuario bloqueado'

            });

        };

        const token = await generarJWT(user.id);

        res.json({
            msg:'Todo OK!',
            token,
            user

        });

    }catch(err){

        console.log(err);

        return res.status(400).json({

            ok:false,
            msg:'El token no se pudo verificar'

        });

    };

};

module.exports = {
    login,
    googleSignIn
};