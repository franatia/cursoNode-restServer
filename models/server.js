const express = require('express');
const cors = require('cors');

class Server{

    constructor(){

        this.app = express();

        this.port = process.env.PORT;

        this.usuariosPath = '/api'

        // Middlewares
        this.middlewares();
        
        // Rutas de mi app
        this.routes();

    }

    middlewares(){

        // Directorio public
        this.app.use(express.static('public'));

        // Middlewares cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen(){

        this.app.listen(this.port, ()=>{

            console.log('Server run on port', this.port);
        
        });

    }

}

module.exports = Server;