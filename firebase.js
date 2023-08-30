// firebase Connection

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

var submitButton = document.getElementById('submitButton');
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');

submitButton.addEventListener('click', function () {
    if (productName.value === '' || productPrice === '') {
        alert('input Fields Are Empty')
    }
    else if (productName.value == 'x' && productPrice.value == 'y') {
        firebase.database().ref('BlackPearl').once('value', (keys) => {
            var data = keys.val();
            document.getElementById('demo').innerText = data.Name;
        });
        ;
    }
    else {
        firebase.database().ref("BlackPearl").set({
            Name: productName.value,
            Price: productPrice.value
        });
        console.log(productName)
    }
})

function readURL(input) {
    // if (input.files && input.files[0]) {
        document.getElementById('productImg').setAttribute('src', input.value)
        console.log(input.value)
    //   var reader = new FileReader();
    //   reader.onload = function (e) {
    //     document.getElementById('productImg').setAttribute('src', `.${e.target.result}`)
    //   };
    //   reader.readAsDataURL(input.files[0]);
    // }
  }

  var loadFile = function(event) {
    var image = document.getElementById('productImg');
    image.src = URL.createObjectURL(event.target.files[0]);
};

// firebase.database().ref("New Data").set({"name2": "hol2435",roll : 45});

// firebase.database().ref('New Data').once('value',(keys) => {var data = keys.val();
// console.log(data.name);

// console.log(keys.exists());
// });