// Get url param through product id
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);

let request = new XMLHttpRequest();

const cart = JSON.parse(window.localStorage.getItem('cart')) || [];

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:3000/api/products/' + productId, true)

request.onload = function () {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        
        //creating img element and setting its src and altTxt attrib
        const divImage = document.getElementsByClassName('item__img');
        const image = document.createElement('img');
        image.src = data.imageUrl;
        image.alt = data.altTxt;

        //getting data of colors from the back-end
        const color = document.getElementById("colors");
        const allColors = data.colors;

        //inserting title, price and description for each product in the DOM
        document.getElementById('title').innerHTML = data.name;
        document.getElementById('price').innerHTML = data.price;
        document.getElementById('description').innerHTML = data.description;
        
        // inserting the image in the DOM
        divImage[0].appendChild(image)          
       
        // inserting the colors array of each product in the DOM  
        for(let i=0; i < allColors.length; i++){
            let selectColor = allColors[i];
            let showColors = document.createElement("option");
            showColors.textContent = selectColor;
            showColors.value = selectColor;
            color.appendChild(showColors);
        }
        
    } else {
        const errorMessage = document.createElement('behavior');
        errorMessage.textContent = `Gah, it's not working!`;
        allProducts.appendChild(errorMessage);
    }
    
};

// Send request
request.send();

//Get DOM elements
const addToCartButton = document.getElementById("addToCart");
let colorDropDown = document.getElementById('colors');
let productColor = document.getElementsByTagName('option');
let productQuantity = document.getElementById('quantity');

colorDropDown.appendChild(productColor[0]);

//add change eventlistner to choose color from dropDown Menu
colorDropDown.addEventListener ('change', ($event) => {

    productColor.textContent = $event.target.value;
})

//add input eventlistner to put quatity 
productQuantity.addEventListener ('input', ($event) => {

     productQuantity.textContent =  $event.target.value;    
});

//add click eventlistener for addTocartButton
addToCartButton.addEventListener ('click', () => {

    const selectedQuantity = Number(productQuantity.value);
    const selectedColor = productColor.textContent; 

    //Make condition to limit quantity between 1 and  100    
    if(!selectedColor){
        alert("select color");
        return;
    }
        console.log({selectedQuantity})
    if(selectedQuantity < 1 || selectedQuantity > 100){
        alert('select quantity between 1 and 100')
        return;
    }  

    // Incrementing quantity of an item  with same id and color
    const existingIndex = cart.findIndex((cartProduct) => 
        cartProduct.id === productId && cartProduct.color === selectedColor);

    if(existingIndex >= 0){
    cart[existingIndex].productQuantity = cart[existingIndex].productQuantity + selectedQuantity;

    } else {
    cart.push({id : productId, 
        color : selectedColor, 
        productQuantity : selectedQuantity});
    }
  
    window.localStorage.setItem('cart', JSON.stringify(cart))
                 
});

console.log(cart);




