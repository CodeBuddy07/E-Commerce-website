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
var previewButton = document.getElementById('previewButton');
var productName = document.getElementById('productName');
var productNameError = document.getElementById('productNameErrorText');
var productPrice = document.getElementById('productPrice');
var productPriceError = document.getElementById('productPriceErrorText');
var productCode = document.getElementById('productCode');
var productCodeError = document.getElementById('productCodeErrorText');
var productDescription = document.getElementById('productDescription');
var productDescriptionError = document.getElementById('productDescriptionErrorText');
var productImage = document.getElementById('productImage');
var extraProductImage1 = document.getElementById('extraProductImage1');
var extraProductImage2 = document.getElementById('extraProductImage2');
var extraProductImage3 = document.getElementById('extraProductImage3');
var TextAreaLength = document.getElementById('textAreaLength');
const LoadingIcon = document.getElementById('loadingIcon');


productName.onkeyup = function () { productNameError.innerText = '' };

productPrice.onkeyup = function () { productPriceError.innerText = '' };

productDescription.onkeyup = function () {
    productDescriptionError.innerText = ''
    TextAreaLength.innerText = productDescription.value.length;
};

productCode.onkeyup = function () {
    productCodeError.innerText = '';

};


var done = false;


submitButton.addEventListener('click', function () {
    done = true;
    if (productCode.value !== '') {

        if (productName.value !== '') {

            if (productPrice.value !== '') {

                if (productDescription.value !== '') {

                    if (productCode.value.length >= 4) {

                        if (parseFloat(productPrice.value) > 0) {

                            if (productImage.value !== '') {

                                LoadingIcon.classList.replace('hidden', 'flex');

                                firebase.storage().ref("Product_Images/" + productImage.files[0].name).put(productImage.files[0]).then(function () {
                                    firebase.storage().ref("Product_Images/" + productImage.files[0].name).getDownloadURL().then(function (url) {

                                        firebase.database().ref("BlackPearl").once('value', (snapshot) => {

                                            var data = snapshot.val();
                                            var ProductCodes = Object.keys(data)
                                            console.log(ProductCodes, ' ', productCode.value, ProductCodes.includes(productCode.value))
                                            if (data !== null) {


                                                if (ProductCodes.includes(productCode.value)) {
                                                    showAlert('Error Massage!', 'Product Key Already Used.Try Different Product Key', 'text-red-400')
                                                    LoadingIcon.classList.replace('flex', 'hidden');
                                                } else {

                                                    firebase.database().ref("BlackPearl/" + productCode.value).set({
                                                        defaultImageURL: url,
                                                        Name: productName.value,
                                                        Price: productPrice.value,
                                                        Description: productDescription.value,
                                                    })

                                                    

                                                    if (extraProductImage1.files[0] !== undefined) {

                                                        firebase.storage().ref("Product_Images/" + extraProductImage1.files[0].name).put(extraProductImage1.files[0]).then(function () {
                                                            firebase.storage().ref("Product_Images/" + extraProductImage1.files[0].name).getDownloadURL().then(function (url1) {
                                                                firebase.database().ref("BlackPearl/" + productCode.value).update({

                                                                    ExtraImageURL1: url1,
                                                                });
                                                            })
                                                        });


                                                    }


                                                    if (extraProductImage2.files[0] !== undefined) {

                                                        firebase.storage().ref("Product_Images/" + extraProductImage2.files[0].name).put(extraProductImage2.files[0]).then(function () {
                                                            firebase.storage().ref("Product_Images/" + extraProductImage2.files[0].name).getDownloadURL().then(function (url2) {
                                                                firebase.database().ref("BlackPearl/" + productCode.value).update({

                                                                    ExtraImageURL2: url2,
                                                                });
                                                            })
                                                        });

                                                    }

                                                    if (extraProductImage3.files[0] !== undefined) {

                                                        firebase.storage().ref("Product_Images/" + extraProductImage3.files[0].name).put(extraProductImage3.files[0]).then(function () {
                                                            firebase.storage().ref("Product_Images/" + extraProductImage3.files[0].name).getDownloadURL().then(function (url3) {
                                                                firebase.database().ref("BlackPearl/" + productCode.value).update({

                                                                    ExtraImageURL3: url3,
                                                                });
                                                            })
                                                        });

                                                    }

                                                    showAlert('Successful!', 'Your Product Added Successfully To The Database', 'text-green-400');
                                                    LoadingIcon.classList.replace('flex', 'hidden');
                                                    

                                                }


                                            } else {
                                                showAlert("Error Massage!", 'Firebase Empty Data Error.', "text-red-400");
                                            }


                                        })
                                    })
                                });




                            } else {
                                showAlert("Error Massage!", 'Default Product Image Is Required.', "text-red-400");
                            }

                        } else {
                            productPriceError.innerText = '*Numbers Positive Only';
                        }

                    } else {
                        productCodeError.innerText = '*Minimum 4 Character';
                    }

                } else {
                    productDescriptionError.innerText = '*Input Field is Empty';
                }
            } else {
                productPriceError.innerText = '*Input Field is Empty';
            }
        } else {
            productNameError.innerText = '*Input Field is Empty';
        }
    } else {
        productCodeError.innerText = '*Input Field is Empty';
    }


});


const getMeta = async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
};

function Refresh(){
    location.reload();
}


var loadDefaultImage = function (event) {
    getMeta(URL.createObjectURL(event.target.files[0])).then(img => {
        if (img.naturalWidth / img.naturalHeight == 16 / 9) {
            var image = document.getElementById('productImg');
            image.src = URL.createObjectURL(event.target.files[0]);
        }
        else {
            showAlert("Error Massage!", 'Image Resolution Not Matched. [ Ratio: 16:9 ]', "text-red-400");

            document.getElementById('productImage').value = '';
        }
    });

};


var loadExtraImage = function (event) {
    getMeta(URL.createObjectURL(event.target.files[0])).then(img => {
        console.log(img.naturalWidth / img.naturalHeight)
        console.log(16 / 9)
        if (img.naturalWidth / img.naturalHeight !== 16 / 9) {
            showAlert("Error Massage!", 'Image Resolution Not Matched. [ Ratio: 16:9 ]', "text-red-400");
            event.target.value = '';
        }
    });

};

function loadProductPreview(input, preview) {
    var inputField = document.getElementById(input);
    if (inputField.value !== '') {
        document.getElementById(preview).innerText = inputField.value;
    } else {
        document.getElementById(preview).innerText = 'Null';
    }

}

previewButton.addEventListener('click', function (file) {
    // // console.log(firebase.database().ref("BlackPearl"))
    // firebase.database().ref("BlackPearl").once('value',function (snapshot) {
    //     // console.log(snapshot)
    //     console.log(snapshot.val())
    //     var data = snapshot.val();
    //         var ProductCodes = Object.keys(data)

    //     if (data !== null) {
    //         if (ProductCodes.includes('AB01')) {
    //             console.log('Goted')
    //         } else {
    //             console.log('No')
    //         }
    //     }else{
    //         console.log('Data is empty!')
    //     }

    // })
    console.log(done);
})


function showAlert(title, massage, color) {
    const AlertBox = document.createElement('dialog');
    AlertBox.setAttribute('id', 'my_modal_5');
    AlertBox.setAttribute('class', 'modal modal-bottom sm:modal-middle');
    AlertBox.innerHTML = `

            <form method="dialog" class="${color} modal-box">
                <h3 class="font-bold text-lg">${title}</h3>
                <p class="py-4">*${massage}</p>
                <div class="modal-action">
                    <!-- if there is a button in form, it will close the modal -->
                    <button onclick="Refresh()" class="btn">Close</button>
                </div>
            </form>
    
    `
    document.getElementById('main').appendChild(AlertBox);
    document.getElementById('my_modal_5').showModal();
}



// firebase.database().ref("New Data").set({"name2": "hol2435",roll : 45});

// firebase.database().ref('BlackPearl').once('value',(keys) => {var data = keys.val();
// for(let i in data){
//     console.log(data[i].Name);
// }
// });
// console.log(keys.exists());
// });
// // firebase.database().ref('BlackPearl').once('value', (keys) => {
//     var data = keys.val();
//     document.getElementById('demo').innerText = data.Name;
// });

// firebase.database().ref("BlackPearl/"+productCode.value).set({
//     ExtraImageURL1: url1,
//     ExtraImageURL2: url2,
//     ExtraImageURL3: url3,
//     defaultImageURL: url,
//     Name: productName.value,
//     Price: productPrice.value,
//     Description: productDescription.value,
// })


