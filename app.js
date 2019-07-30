const express = require("express");
const app = express();

// Set engine to EJS so that you can render images
app.set('view engine','ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");


//Root 
//root route
app.get("/", async function(req, res)
{
  var imageURLs = await tools.getRondomImages("",1);
  res.render("index", {"imageURLs": imageURLs});
});

// Search route
app.get("/search", async function(req, res)
{
  var keyword = req.query.keyword;
  var imageCount = 9;
  var imageURLs = await tools.getRondomImages(keyword,9);
  res.render("results", {"imageURLs": imageURLs, "keyword":keyword});
//   getRondomImages_cb(keyword,imageCount,function(imageURLs)
//   {
//     res.render("results", {"imageURLs": imageURLs});    
//   });  
});

app.get("/api/updateFavorite", async function(req, res)
{
  var conn = await tools.createConnection();  
  var sql;
  var sqlParam;
  if (req.query.action == "add"){
    sql = "INSERT INTO favorites(imageURL, keyword) VALUES (?,?)";  
    sqlParam = [req.query.imageURL, req.query.keyword];
  } else 
  {
    sql = "Delete FROM favorites WHERE imageURL =?";  
    sqlParam = [req.query.imageURL];    
  }
  
  conn.connect(function(err){
    if(err) throw err;
    conn.query(sql,sqlParam, function(err, result){      
      
    }); //Query   
  });// connection
  res.send("it works")
});//updateFavorite

app.get("/displayKeyword", async function(req, res)
{
  var imageURLs = await tools.getRondomImages("",1);
  var likes 
  var sql="SELECT distinct keyword FROM `favorites` ORDER BY keyword"
  var conn = await tools.createConnection();  
  
    conn.connect(function(err) 
    {
      if(err) throw err;
      conn.query(sql,function(err, result)
      {    
        if(err) throw err;
        res.render("favorites", {"rows": result, "imageURLs": imageURLs});
        console.log(result);      
      }); //Query  
    });//updateFavorite
  });

app.get("/api/displayFavorites", async function(req, res)
{
  var imageURLs = await tools.getRondomImages("",1);
  var conn = await tools.createConnection();  
  var sql = "SELECT imageURL FROM `favorites` WHERE keyword =?";
  var sqlParam = [req.query.keyword];
  //console.log(sqlParam);
  conn.connect(function(err) 
  {
    if(err) throw err;
    conn.query(sql, sqlParam, function(err, results)
    {    
      if(err) throw err;
      //res.render("favorites", {"row": results})
      //res.render("favorites", {"rows": results, "imageURLs": imageURLs});
      //console.log(results);
      res.send(results);
         
     }); //Query
   });//updateFavorite  
});


app.listen(process.env.PORT,process.env.IP, function()
{
  console.log("The server is up and running");
});




