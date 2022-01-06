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
    }
});

UsuarioSchema.methods.toJSON = function(){
    
    const {__v,password,...user} = this.toObject();
    
    return user;

}

module.exports = model( 'Usuario', UsuarioSchema );