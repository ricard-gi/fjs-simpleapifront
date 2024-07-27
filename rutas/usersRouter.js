import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import autentica from './autentica.js';
import multer from 'multer';
import path from 'path';
import slugify from 'slugify';

const durada = 60 * 60 * 1000;
const secretKey = "setze-jutges";

const Model = sequelize.define(
    'User',
    {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING
    },
    { tableName: 'users', timestamps: false }
);

const router = express.Router();

// Configuració de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // carpeta on es desaran les imatges
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);
        const slug = slugify(baseName, { lower: true, strict: true });
        cb(null, `${timestamp}_${slug}${ext}`); // afegim un timestamp al nom de la imatge
    }
});

const upload = multer({ storage: storage });

router.get('/', autentica, function (req, res, next) {
    Model.findAll()
        .then(items => res.json(items))
        .catch(error => res.json({
            ok: false,
            error: error
        }));
});

router.get('/secret', autentica, function (req, res, next) {
    res.json({ ok: true, data: "paraula secreta: aicnalubma!" });
});

router.get('/open', function (req, res, next) {
    res.json({ ok: true, data: "paraula no protegida: 1234" });
});

// nou usuari amb imatge
router.post('/', upload.single('foto'), function (req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;

    // Afegir el nom de la imatge al cos de la petició
    if (req.file) {
        req.body.image = req.file.filename;
    }

    Model.create(req.body)
        .then(item => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }));
});

router.delete('/:id', function (req, res, next) {
    Model.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }));
});

router.post('/login', (req, res) => {
    const response = {};
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ ok: false, msg: "name o password no rebuts" });
    }

    Model.findOne({ where: { name: name } })
        .then((usuari) => {
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
                    name: usuari.name,
                    id: usuari.id,
                },
                secretKey
            );
            res.json(response);
        })
        .catch(err => res.status(400).json({ ok: false, msg: err }));
});

export default router;
