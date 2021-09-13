const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    const {nombre, apellido= 'Sin Apellido'} = req.query;
    res.json({
        msg: 'Get API - controlador',
        nombre, apellido
    })
}; 


const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'Post API - controlador',
        nombre, 
        edad
    })
}; 



const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Put API - controlador',
        id
    })
}; 



const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    })
}; 


module.exports= {
    usuariosGet, usuariosPost, usuariosPut, usuariosDelete
}