const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(helmet());
server.use(cookieParser());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/user', userRouter);

server.get('/', (req, res) => {
   res.json({
       message: 'Welcome to DevDesk, your home for code harmony'
   })
});

server.use((err, req, res, next) => {
   console.log(err);
   res.status(500).json({
       errorMessage: 'Server error, please try your request again'
   })
});

server.listen(port, () => {
   console.log(`server running at http://localhost:${port}`)
});
