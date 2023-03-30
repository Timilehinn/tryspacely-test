const express = require('express');
const compression = require('compression');
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'build'),{
  setHeaders: (res, path) => {
    if(/\.js$|.css/.test(path)){
      res.set('Content-Encoding', 'gzip')
    }
  }
}));

app.use(compression())

app.listen(3004, ()=>{
  console.log('Server started')
})