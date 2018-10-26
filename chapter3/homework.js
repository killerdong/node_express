const app = require('express')();
const analyzeError = error => console.error(error);
const errorlog = error => console.error(error);

const every = (req, res, next) => {
    console.log('every');
    next();
};

const everyPost = (req, res, next) => {
    if (req.method === 'POST') {
        console.log('every post');
    }
    
    next();
};

app.use(every, everyPost);

app.get('/users', (req, res) => {
    const users = {users: ['sdw1211', 'killerdong']};
    console.log(`users list: ${users.toString()}`);
    res.json(users);
});

app.post('/users', (req, res) => {
    console.log(`get users: ${{users: ['sdw1211', 'killerdong']}.toString()}`);
    const random = Math.floor(Math.random() * 10);

    if (random === 7) {
        throw new Error('Random Error');
    }  

    res.json({msg: '입력완료'});
});

app.use('/error', (req, res) => {
    throw new Error('Error Test');
});

app.use((req, res) => {
    res.status(404);
    res.send('404 ERROR');
});

const errorHandler1 = (err, req, res, next) => {
    analyzeError(err);
    next(error);
};

const errorHandler2 = (err, req, res, next) => {
    errorlog(err);
    res.json({msg: '에러!!!'});
};

app.use(errorHandler1, errorHandler2);

app.listen(3000, () => console.log(`Express started on http://localhost:3000; press Ctrl + c to terminate.`));


