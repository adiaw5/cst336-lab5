
const request = require("request");
const mysql = require("mysql");
module.exports = {
/**
* Return random image URLS from an API
* @param string keyword - searcterm
* @param int imageCount - number of random images
* @return array of image URLs
*/
getRondomImages_cb:function (keyword, imageCount, callback)
{
  var resouceURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+ "&client_id=9ce620d0452a606d94cc3d5f85b4070b3ecd068d12bacf8651f64cdbb5e85e7f"
  request(resouceURL, function (error, response, body) 
  {    
    if(!error){
      var parsedData = JSON.parse(body);
      var imageURLs = [];
      for(let i = 0; i < imageCount; i++)
      {
        imageURLs.push(parsedData[i].urls.regular);    
      }
      //console.log(imageURLs);
      callback(imageURLs);
      } else 
      {
      //res.render("results", {"Error": "Unable to access API"}); 
      console.log("error", error);
      }  
    });  
  },


/**
* Return random image URLS from an API
* @param string keyword - searcterm
* @param int imageCount - number of random images
* @return array of image URLs
*/
getRondomImages: function (keyword, imageCount)
{
  var resouceURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+ "&client_id=9ce620d0452a606d94cc3d5f85b4070b3ecd068d12bacf8651f64cdbb5e85e7f"
  
  return new Promise(function(resolve, reject){                     
                    
  request(resouceURL, function (error, response, body) 
  {    
    if(!error){
      var parsedData = JSON.parse(body);
      var imageURLs = [];
      for(let i = 0; i < imageCount; i++)
      {
        imageURLs.push(parsedData[i].urls.regular);    
      }
      //console.log(imageURLs);
      resolve(imageURLs);
      } else 
      {
      //res.render("results", {"Error": "Unable to access API"}); 
      console.log("error", error);
      }  
    }); 
   });
  },
  
  // Function returns the  the connection
  createConnection: function()
  {
    var conn = mysql.createPool(
  {
    host:"us-cdbr-iron-east-02.cleardb.net",
    user:"b11703dbb8d26f",
    password: "aaf02e3d",
    database: "heroku_c17da31e3db1a8c"    
  });    
  return conn; 
  }  
}




