
$(document).ready(function()
{
  $(".favoriteIcon").on("click",function()
  {
    var imageURL = $(this).prev().attr("src");
    
    if ($(this).attr("src")== "img/favorite.png")
    {
     $(this).attr("src","img/favorite_on.png")
      updateFavorite("add",imageURL); // add new record
    }
    else 
    {
      $(this).attr("src","img/favorite.png");
      updateFavorite("delete",imageURL);// delete
      
    }
  });
  
  $(".keywordLink").on("click", function()
  {
    $.ajax(
      {
        method: "get",
        url: "/api/displayFavorites",
        data:{"keyword": $(this).text().trim()},
        success: function(rows, status)
        {
          $("#favorites").html("");
          rows.forEach(function(row, index)
          {  
            if(index%4==0)
            {
              $("#favorites").append("<br>");              
            } else
            {              
              $("#favorites").append("");
            }            
            $("#favorites").attr("class","imageCountainer");
            $("#favorites").append("<img class='image' width ='100' height='100' src="+row.imageURL+ ">");
            $("#favorites").append("<img class='image' width ='15' height='15' src='/img/favorite_on.png'>")                      
          });          
        }      
      }); //ajax  
   });	 
      
  
  function updateFavorite(action, imageURL)
  {
    $.ajax({      
      method: "get",
      url: "/api/updateFavorite",
      data:{"imageURL": imageURL, "keyword":$("#keyword").val(), "action": action}        
    }); //ajax    
  }
});

