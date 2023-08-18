import Connection from './database/db.js';
import { getDocument, updateDocument } from './controller/document-controller.js'
import { User } from './schema/schema.js';
import { notFound, errorHandler } from './middlewares.js';
import api from './api/index.js';

import { Server } from 'socket.io';
import sharedSession from 'express-socket.io-session';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import cookieSession from 'cookie-session';

import dotenv from 'dotenv';
dotenv.config();

import './auth/passport.js';
import './auth/passportGoogleSSO.js';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: [
  `${process.env.FRONTEND_URL}`,
], credentials: true }));
app.use(express.json());

const sessionMiddleware = session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  // store: MongoStore.create({
  //   mongoUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-scribble-docs.9bbttdh.mongodb.net/?retryWrites=true&w=majority`,
  // }),  
  cookie: {
    maxAge: 10800000 // 3 hours in milliseconds
  }
});

app.use(sessionMiddleware);

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 9000;
Connection();

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    session_user: req.session,
    cookie_user: req.user,
  });
});

app.post("/api/users", async (req, res) => {
  try {
    const userList = await User.find();
    res.status(200).send({
      users: userList,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
    });
  }
})

const server = app.listen(PORT, () => {
  console.log('Server listening on port 9000');
});

const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    methods: ['GET', 'POST']
  }
});

io.use(sharedSession(sessionMiddleware, {
  autoSave: true
}));

io.on('connection', socket => {
  socket.on('get-document', async (documentId, userId, docTitle) => {
    const document = await getDocument(documentId, userId, docTitle);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', delta => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
    })

    socket.on('save-document', async data => {
        await updateDocument(documentId, data);
    })
  })
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);
