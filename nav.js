document.getElementById('searchButton').addEventListener('click',function(){
    document.getElementById('searchBox').style.display= "flex";
    document.getElementById('upperMenus').style.display = "none";
    document.getElementById('brandLogo').style.display = "none";
})
document.getElementById('cancelSearchBox').addEventListener('click',function(){
    document.getElementById('searchBox').style.display= "none";
    document.getElementById('upperMenus').style.display = "flex";
    document.getElementById('brandLogo').style.display = "block";
})