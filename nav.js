document.getElementById('searchButton').addEventListener('click', function () {
    document.getElementById('searchBox').style.display = "flex";
    document.getElementById('searchButton').style.display = "none";
    document.getElementById('brandLogo').style.display = "none";
})
document.getElementById('cancelSearchBox').addEventListener('click', function () {
    document.getElementById('searchBox').style.display = "none";
    document.getElementById('searchButton').style.display = "flex";
    document.getElementById('brandLogo').style.display = "block";
})




