import express from 'express';

import { DataTypes } from "sequelize";

import sequelize from "../loadSequelize.js";

const Group = sequelize.define(
    'Group',
    {
        name: DataTypes.STRING
    },
    { tableName: 'groups', timestamps: false }
);

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

Group.hasMany(Message, { foreignKey: 'groups_id' });
Message.belongsTo(User, { foreignKey: 'users_id' });


const router = express.Router();

router.get('/', function (req, res, next) {

    Group.findAll({
        include: [
            {model: Message, include: [
                {model: User, attributes: ['name']}
            ], attributes: ["text"]},
        ]
    })
        .then(items => res.json(items))
        .catch(error => res.json({
            ok: false,
            error: error
        }))

});


router.get('/:id', function (req, res, next) {
    Group.findOne({ where: { id: req.params.id } })
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
    Group.create(req.body)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))

});

router.put('/:id', function (req, res, next) {
    Group.findOne({ where: { id: req.params.id } })
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

    Group.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }))

});


export default router;


