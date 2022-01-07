const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:[true,'The name is required']
    },
    mail:{
        type:String,
        required:[true,'The mail is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password required']
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
    picture:{
        type:String
    }
});

UsuarioSchema.methods.toJSON = function(){
    
    const {__v,password,_id,...user} = this.toObject();

    user.uid = _id;
    
    return user;

}

module.exports = model( 'Usuario', UsuarioSchema );