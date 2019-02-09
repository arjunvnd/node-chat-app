const path = require('path');
const express=require('express');
const bodyparser=require('body-parser')
const app = express();
const publicPath=path.join(__dirname+'./../public')
app.use(bodyparser.json())
app.use(express.static(publicPath))

app.listen(3000,()=>{
    console.log(`Serever running on port 3000`)
})









