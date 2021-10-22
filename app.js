const express = require('express')
const app = express()
const port = 8037
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')




// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now()+'.jpg')
//   }
// })
// const upload = multer({ storage: storage })

// app.use(bodyParser.urlencoded({extended: false})
const parseJson = bodyParser.json()

// app.post('/upload', 
//   upload.array('photos',20), 
//   function (req, res, next) {
//   // console.log(`req:`)
//   // console.log(req)
//   console.log(`req.files:`)
//   console.log(req.files)
//   console.log(`req.body:`)
//   console.log(req.body)
//   res.send({
//     success: true,
//     message: 'upload success'
//   })
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
app.post('/abtest_config', function(req, res, next){
  console.log(new Date())
  var writeStream = fs.createWriteStream(path.resolve('body.txt'), "ascii");

  // This pipes the POST data to the file
  req.pipe(writeStream);
  req.on('end', function () {
    res.send({
      success: true,
      data: '',
      message: 'catch success'
    })
  });

  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.log('write stream error')
    console.log(err);
  });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})