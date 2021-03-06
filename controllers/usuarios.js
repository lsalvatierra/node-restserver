const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');




const usuariosGet = async (req = request, res = response) => {
    //const {nombre, apellido= 'Sin Apellido'} = req.query;
    //const {limite = 5, desde = 0 } = req.query;
    const {page = 1, perPage = 5 } = req.query;
    const fil = 'te';
    const query = { estado: true  };
    //Esta forma es menos optima
    // const usuarios = await Usuario.find(query)
    //                     .skip(Number(desde))
    //                     .limit(Number(limite));
    //const total = await Usuario.countDocuments(query);
    //El resultado va esperar que la promesa concluya  con las dos operaciones terminadas.
    var numberPerPage = parseInt(perPage);
    const desde = (page-1) * numberPerPage;
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(numberPerPage))
    ]);
    const totalPages = Math.ceil(total / perPage);
    var paginationData = {"perPage": numberPerPage, totalPages, total };  
    res.json({
        paginationData,
        usuarios
    })
    // res.json({
    //     total,
    //     usuarios
    // })
}; 


const usuariosPost = async (req, res = response) => {
  
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en BD
    await usuario.save();
    res.json({
        usuario
    })
}; 



const usuariosPut = async (req, res = response) => {
    const {id} = req.params;
    //Se quitan los 3 primeros atributos de la desestructuración.
    const {_id, password, google, correo, ... resto } = req.body;
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);        
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        usuario
    })
}; 



const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false });
    res.json({
       usuario
    })
}; 


module.exports= {
    usuariosGet, usuariosPost, usuariosPut, usuariosDelete
}