const app = require('express')();

const logger = (msg, type='log') => {
    console[type] && console[type].call(null, msg);
};

const errorLogger = msg => logger(msg, 'error');

const analyzeError = error => errorLogger(error);
const errorlog = error => errorLogger(error);

const every = (req, res, next) => logger('every');
const everyPost = (req, res, next) => logger('every post');

app.use(every);
app.post('/*', everyPost);

app.get('/users', (req, res) => {
    const users = {users: ['sdw1211', 'killerdong']};
    logger(`users list: ${users.toString()}`);
    res.json(users);
});

app.post('/users', (req, res) => {

    const tenPercentFailureMaker = ({success = () => {}, failure = () => {}}) => {
        const random = Math.floor(Math.random() * 10);
        const EXCEPTION_NUMBER = 7;

        random === EXCEPTION_NUMBER ? failure() : success();
    };

    tenPercentFailureMaker({
        success: () => res.json({msg: '입력 성공'})
        , failure: () => {throw new Error('입력 실패')}});
});

app.use('/error', (req, res) => {
    throw new Error('Error Test');
});

const noHandler = (req, res) => {
    res.status(404);
    res.send('404 ERROR');
};

app.use(noHandler);

const errorHandler1 = (err, req, res, next) => {
    analyzeError(err);
    next(err);
};

const errorHandler2 = (err, req, res, next) => {
    errorlog(err);
    res.status(500);
    res.json({msg: err.message});
};

app.use(errorHandler1, errorHandler2);

app.listen(3000, () => logger(`Express started on http://localhost:3000; press Ctrl + c to terminate.`));


