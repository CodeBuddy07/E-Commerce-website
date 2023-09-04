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

const CardContainer = document.getElementById('cardContainer');
const LoadingIcon = document.getElementById('loadingIcon');

const firebaseConfig = {
    apiKey: "AIzaSyAOhQP8jkCNberWRA9PefljnOYlHWG9WW4",
    authDomain: "e-commerce-team.firebaseapp.com",
    databaseURL: "https://e-commerce-team-default-rtdb.firebaseio.com",
    projectId: "e-commerce-team",
    storageBucket: "e-commerce-team.appspot.com",
    messagingSenderId: "179278069948",
    appId: "1:179278069948:web:d7480e1797dbe5feaed0b9",
    measurementId: "G-GT3M3WQEEH"
};


firebase.initializeApp(firebaseConfig);

firebase.database().ref('BlackPearl').once('value', (keys) => {
    var keyList = keys.val();
    for (let i in keyList) {
        console.log(keyList[i]);
        const card = document.createElement('div');
        card.setAttribute('class', 'card border    bg-base-100 shadow-xl');
        card.innerHTML = `
                <figure>
                    <img src="${keyList[i].defaultImageURL}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2  class="w-max card-title">${keyList[i].Name}</h2>
                    <p class="max-w-full break-words min-h-[73.5px] ">${keyList[i].Description}</p>
                    <h2 class="text-lg text-right font-semibold "> <span class="font-extrabold text-yellow-400 text-2xl">৳</span> <span >${keyList[i].Price}</span> TK </h2>
                    <div class="card-actions justify-end">
                        <button id="buyButton" class="btn btn-primary">Buy Now</button>
                    </div>
                 </div>
            `;
        CardContainer.appendChild(card);
        LoadingIcon.classList.replace('flex','hidden'); 
        

    }
});


