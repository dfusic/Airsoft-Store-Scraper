const express = require("express");
const app = express();
const cors = require("cors");
const files = require('./aeg.json')
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  const { query } = req;
  const { search, sort } = query;
  if(search){
    let items = [];
    files.forEach((file) => {
      if(file.title.toLowerCase().includes(search.toLowerCase())){
        items.push(file);
      }
    })
    res.json(items)
  }

  if(sort){
    if(sort === 'asc'){
      res.json(files.sort((a,b) => a.priceEuro - b.priceEuro));
    }
    if(sort === 'desc'){
      res.json(files.sort((a,b) => b.priceEuro - a.priceEuro));
    }
  }

  res.json(files)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
