import express from 'express';

import { DataTypes, QueryTypes } from "sequelize";

import sequelize from "../loadSequelize.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import autentica  from './autentica.js';

const durada = 60 * 60 * 1000;
const secretKey = "setze-jutges";

const Model = sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
        password: DataTypes.STRING
    },
    { tableName: 'users', timestamps: false }
);


const router = express.Router();

router.get('/', autentica, function (req, res, next) {

    Model.findAll()
        .then(items => res.json(items))
        .catch(error => res.json({
            ok: false,
            error: error
        }))

});



router.get('/:id', function (req, res, next) {
    Model.findOne({ where: { id: req.params.id } })
        .then(item => res.json({
            ok: true,
            data: item
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});


router.post('/', function (req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    Model.create(req.body)
        .then(item => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))
});

router.put('/:id', function (req, res, next) {
    Model.findOne({ where: { id: req.params.id } })
        .then((al) =>
            al.update(req.body)
        )
        .then((ret) => res.json({
            ok: true,
            msg: "Record updated",
            data: ret
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }));

});


router.delete('/:id', function (req, res, next) {

    Model.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }))

});





router.post('/login', (req, res) => {
    const response = {};
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ ok: false, msg: "name o password no rebuts" });
    }

    Model.findOne({ where: { name:name } })
        .then((usuari) => {
            console.log(usuari)
            if (usuari && bcrypt.compareSync(password, usuari.password)) {
                return usuari;
            } else {
                throw "usuari/password invalids";
            }
        })
        .then(usuari => {
            response.ok = true;
            response.token = jsonwebtoken.sign(
                {
                  expiredAt: new Date().getTime() + durada,
                  perfil: "administrador",
                  idioma: "catala",
                  nom:usuari.nom,
                  id: usuari.id,
                },
                secretKey
              );
            res.json(response);
        })
        .catch(err => res.status(400).json({ ok: false, msg: err }))

});


export default router;


