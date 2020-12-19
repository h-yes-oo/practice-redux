const express = require('express');
const app = express();
const port = 3000;

app.set('views','./views')
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.get('/with-redux',function(req,res){
    res.render('with-redux.html');
})

app.listen(port,() => {
    console.log('connected')
})