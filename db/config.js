const mongoose = require('mongoose');

const dbConnection = async() =>{

    try{

        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log('DB on-line');

    }catch(err){

        console.log(err);
        throw new Error('Error a la hora de inciar la DB');

    }

}

module.exports = {
    dbConnection
}