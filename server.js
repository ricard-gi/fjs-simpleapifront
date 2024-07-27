//importamos express y controladores
import express from "express";
import alumnesRouter from './rutas/alumnesRouter.js';
import usersRouter from './rutas/usersRouter.js';
import groupsRouter from './rutas/groupsRouter.js';
import messagesRouter from './rutas/messagesRouter.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//instanciamos nueva aplicación express
const app = express();

// Middleware per interpretar JSON
app.use(express.json());

// Middleware per interpretar dades de formularis multipart
app.use(express.urlencoded({ extended: true }));


app.use(cors());


//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/api/alumnes', alumnesRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/messages', messagesRouter);

// Middleware per servir fitxers estàtics des de la carpeta 'uploads'
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('FRONT/dist'));

//arranque del servidor
const port = 3001
app.listen(port, () => console.log(`API listening on port ${port}!`))

