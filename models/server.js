const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){

        this.app = express();

        this.port = process.env.PORT;

        this.usuariosPath = '/api';
        this.authPath = '/api/auth';

        // Conectar a DB

        this.conectarDB()

        // Middlewares
        this.middlewares();
        
        // Rutas de mi app
        this.routes();

    }

    async conectarDB(){

        await dbConnection();

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

        this.app.use(this.usuariosPath, require('../routes/userRoutes'));
        this.app.use(this.authPath, require('../routes/authRoutes'))
    }

    listen(){

        this.app.listen(this.port, ()=>{

            console.log('Server run on port', this.port);
        
        });

    }

}

module.exports = Server;