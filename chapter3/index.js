const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('메인 페이지');
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('about 페이지');
});
  

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
}); 

app.use((err, req, res, next) => {
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate.`));