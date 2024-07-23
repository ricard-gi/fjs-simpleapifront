import express from 'express';

import { DataTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

const Message = sequelize.define(
    'Message',
    {
        text: DataTypes.STRING,
        groups_id: DataTypes.INTEGER,
        users_id: DataTypes.INTEGER
    },
    { tableName: 'messages', timestamps: false }
);

const User = sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
    },
    { tableName: 'users', timestamps: false }
);

Message.belongsTo(User, { foreignKey: 'users_id' });


const router = express.Router();

router.get('/', function (req, res, next) {

    Message.findAll({include: [User]})
        .then(items => res.json(items))
        .catch(error => res.json({
            ok: false,
            error: error
        }))

});


router.get('/:id', function (req, res, next) {
    Message.findOne({ where: { id: req.params.id } })
        .then(item => res.json({
            ok: true,
            data: item
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});


router.get('/group/:id', function (req, res, next) {
    Message.findAll({ where: { groups_id: req.params.id } })
        .then(items => res.json({
            ok: true,
            data: items
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});



router.post('/', function (req, res, next) {
    console.log(req.body)
    Message.create(req.body)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))

});

router.put('/:id', function (req, res, next) {
    Message.findOne({ where: { id: req.params.id } })
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

    Message.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }))

});


export default router;


