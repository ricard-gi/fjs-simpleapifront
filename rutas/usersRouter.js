import express from 'express';

import { DataTypes, QueryTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

const Model = sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
    },
    { tableName: 'users', timestamps: false }
);


const router = express.Router();

router.get('/', function (req, res, next) {

    Model.findAll()
        .then(items => res.json(items))
        .catch(error => res.json({
            ok: false,
            error: error
        }))

});


router.get('/prova', function (req, res, next) {
    sequelize.query(
        'SELECT g.name, m.text FROM `groups` g JOIN messages m ON m.groups_id = g.id',
        {
            type: QueryTypes.SELECT
        }
    ).then(items => res.json(items))
    .catch(err => console.log(err));


});



router.get('/names', function (req, res, next) {
    sequelize.query(
        'SELECT name FROM users',
        {
            type: QueryTypes.SELECT
        }
    ).then(items => res.json(items))
    .catch(err => console.log(err));


});

router.get('/ids', function (req, res, next) {

    Model.findAll({
        attributes: ["id"]
    })
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
    console.log(req.body)
    Model.create(req.body)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
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


export default router;


