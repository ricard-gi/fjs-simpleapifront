//importamos express y controladores
import express from "express";
import alumnesRouter from './rutas/alumnesRouter.js';
import usersRouter from './rutas/usersRouter.js';
import groupsRouter from './rutas/groupsRouter.js';
import messagesRouter from './rutas/messagesRouter.js';

//instanciamos nueva aplicación express
const app = express();

app.use(express.json());



//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/api/alumnes', alumnesRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/messages', messagesRouter);

app.use(express.static('FRONT/dist'));

//arranque del servidor
const port = 3001
app.listen(port, () => console.log(`API listening on port ${port}!`))

