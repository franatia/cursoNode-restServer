const {response, request} = require('express');

const userGet = (req = request ,res = response)=>{

    const queryParams = req.query;

    const obj = {

        name:'francisco',
        age:35,
        from:'get'

    }

    res.json({
        ...obj,
        query:queryParams
    });

}

const userPut = (req = request ,res = response)=>{

    const id = req.params.id;

    const obj = {

        name:'francisco',
        age:35,
        from:'put'
    }

    console.log(id)

    res.json({
        ...obj,
        id
    });

}

const userPost = (req = request, res = response)=>{

    const body = req.body;

    const obj = {

        name:'francisco',
        age:35,
        from:'post'

    }
    
    res.status(201).json({
        obj,
        body
    })

}

const userDelete = (req,res = response)=>{

    const obj = {

        name:'francisco',
        age:35,
        from:'delete'

    }

    res.json(obj);

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