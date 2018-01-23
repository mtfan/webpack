const express = require('express');
const app = express();

app.use(express.static("../build"));

app.get('/api/current',function (req,res) {
  res.json({
    "errorCode": "0000000",
    "errorMessage": "处理成功",
    "succeed": true,
    "data": +new Date()
  })
})

app.listen(3000, () => {
  console.log('listem on 3000 o(*￣︶￣*)o');
})