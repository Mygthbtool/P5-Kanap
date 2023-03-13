const cart = JSON.parse(window.localStorage.getItem('cart')) || [];

let request = new XMLHttpRequest()
// Open a new connection, using the GET request
request.open('GET', 'http://localhost:3000/api/products/', true)

function renderCartTotal(){
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((product) => {            

    let productRecover = productData.find((el) => el._id === product.id);
    totalQuantity += Number(product.productQuantity)
    totalPrice += Number(productRecover.price) * Number(product.productQuantity);
      
    })
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;

}
function updateCart (event, index){
    const newValue = event.target.value;
    console.log(newValue, index)
    cart[index].productQuantity = newValue;
    renderCartTotal();
    window.localStorage.setItem('cart', JSON.stringify(cart))

}
function renderCart(cart, data){
    
    if (request.status >= 200 && request.status < 400) {
       // Loop to post all the products in the cart
       cart.forEach((product, index) => {            
        // Method to find back product's proprieties which are not passed by localStorage
           let productRecover = data.find((el) => el._id === product.id);
           let article = {
            name: productRecover.name,
            color: product.color,
            id: product.id,
            image: productRecover.imageUrl,
            altText: productRecover.altTxt,
            quantity: product.productQuantity,
            price: productRecover.price
           };          
        // Inserting selected items into the DOM
            const section = document.getElementById('cart__items');

            article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id', "{product-ID}")
            article.setAttribute('data-color', "{product-color}")
            section.appendChild(article)

            const divImage = document.createElement('div')
            divImage.classList.add('cart__item__img')
            article.appendChild(divImage)

            const image = document.createElement('img')
            divImage.appendChild(image)
            image.src = productRecover.imageUrl
            image.alt = productRecover.altTxt

            const itemContent = document.createElement('div')
            itemContent.classList.add('cart__item__content')
            article.appendChild(itemContent)

            const itemContentDescrp = document.createElement('div')
            itemContentDescrp.classList.add('cart__item__content__description')
            itemContent.appendChild(itemContentDescrp)

            const productName = document.createElement('h2')
            productName.textContent = productRecover.name;
            const productColor = document.createElement('p')
            productColor.textContent = product.color
            const productPrice = document.createElement('p')
            productPrice.innerHTML = '€' + productRecover.price

            itemContentDescrp.appendChild(productName)
            itemContentDescrp.appendChild(productColor)
            itemContentDescrp.appendChild(productPrice)

            const itemContentSettings = document.createElement('div')
            itemContentSettings.classList.add('cart__item__content__settings')
            itemContent.appendChild(itemContentSettings)

            const itemContentSettingsQty = document.createElement('div')
            itemContentSettingsQty.classList.add('cart__item__content__settings__quantity')
            itemContentSettings.appendChild(itemContentSettingsQty)

            const quantityWord = document.createElement('p')
            quantityWord.textContent = 'Quantity : '
            itemContentSettingsQty.appendChild(quantityWord)

            let productQuantity = document.createElement('input')
            productQuantity.classList.add('itemQuantity')
            productQuantity.setAttribute('type', "number")
            productQuantity.setAttribute('name', "itemQuantity")
            productQuantity.setAttribute('min', "1")
            productQuantity.setAttribute('max', "100")
            productQuantity.setAttribute('value', '')
            productQuantity.value = product.productQuantity
            productQuantity.addEventListener('change', (event) => updateCart(event, index))
            itemContentSettingsQty.appendChild(productQuantity)

            const itemContentSettingsDelete = document.createElement('div')
            itemContentSettingsDelete.classList.add('cart__item__content__settings__delete')
            itemContentSettings.appendChild(itemContentSettingsDelete)

            const deleteProduct = document.createElement('p')
            deleteProduct.classList.add('deleteItem')
            deleteProduct.textContent = 'Delete'
            itemContentSettingsDelete.appendChild(deleteProduct)
                                        
            
        });  
        renderCartTotal();
        
    }else {
        const errorMessage = document.createElement('behavior')
        errorMessage.textContent = `error, it's not working!`
        const section = document.getElementById('cart__items');
        section.appendChild(errorMessage)
    }
    
}
let productData;
request.onload = function () {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response)
 productData = data;

  renderCart(cart, productData);
};    
 
request.send();

console.log(cart);

/*---validating the form---*/

// Get DOM elements
const firstNameInput = document.getElementById('firstName')
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
const lastNameInput = document.getElementById('lastName')
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
const addressInput = document.getElementById('address')
const addressErrorMsg = document.getElementById('addressErrorMsg')
const cityInput = document.getElementById('city')
const cityErrorMsg = document.getElementById('cityErrorMsg')
const emailInput = document.getElementById('email')
const emailErrorMsg = document.getElementById('emailErrorMsg')

//Checking the right input format for first name
firstNameInput.addEventListener('input', ($event) => {
     const regex = /^[A-Za-z]*$/;
     let inputResult = regex.test($event.target.value)
    if(inputResult == false){   
    firstNameErrorMsg.textContent = 'error, please enter your name in the right format';
    firstNameErrorMsg.style.display = 'inline';
    }else{
        firstNameErrorMsg.style.display = 'none'; 
    }
});

//Checking the right input format for last name
lastNameInput.addEventListener('input', ($event) => {
    const regex = /^[A-Za-z]*$/;
    let inputResult = regex.test($event.target.value)
   if(inputResult == false){   
   lastNameErrorMsg.textContent = 'error, please enter your name in the right format';
   lastNameErrorMsg.style.display = 'inline';
   }else{
       lastNameErrorMsg.style.display = 'none'; 
   }
});

//Checking the right input format for the address
addressInput.addEventListener('input', ($event) => {
    const regex = /^[\w',-\\/.\s]*$/;
    let inputResult = regex.test($event.target.value)
   if(inputResult == false){   
    addressErrorMsg.textContent = 'error, please enter your address in the right format';
    addressErrorMsg.style.display = 'inline';
   }else{
    addressErrorMsg.style.display = 'none'; 
   }
});

//Checking the right input format for the city
cityInput.addEventListener('input', ($event) => {
    const regex = /^[A-Za-z]*$/;
    let inputResult = regex.test($event.target.value)
   if(inputResult == false){   
    cityErrorMsg.textContent = 'error, please enter your city name in the right format';
    cityErrorMsg.style.display = 'inline';
   }else{
    cityErrorMsg.style.display = 'none'; 
   }
});

//Checking the right input format for the e-mail
emailInput.addEventListener('input', ($event) => {
    const regex = /\S+@\S+\.\S+/g;
    let inputResult = regex.test($event.target.value)
   if(inputResult == false){   
    emailErrorMsg.textContent = 'error, please enter your email address in the right format';
    emailErrorMsg.style.display = 'inline';
   }else{
    emailErrorMsg.style.display = 'none'; 
   }
});

// Send data of the form to back-end when submitting the order

const orderButton = document.getElementById('order')
let orderId = '';

// Add eventListener to order button
orderButton.addEventListener ('click', ($event) => {
    $event.preventDefault();
    const contactForm = {
        firstName : firstNameInput.value,
        lastName: lastNameInput.value,
        address : addressInput.value,
        city : cityInput.value,
        email : emailInput.value
       };
          
       let productToOrder = cart.map(product => product.id);
        console.log(productToOrder);

   submitFormData(productToOrder, contactForm);
});


function makeRequest(data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/products/order');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 400) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      };
      request.setRequestHeader('Content-Type', 'application/json');
      console.log(data);
      request.send(JSON.stringify(data));
    });
  }

  async function submitFormData(productToOrder, contactForm) {
    try { 
      const requestPromise = makeRequest({contact: contactForm, products: productToOrder});
      const response = await requestPromise;
      const responseOrderId = response.orderId;
      localStorage.clear();
      location.href = './confirmation.html?' + responseOrderId
      console.log(responseOrderId);
      
    }catch(errorResponse) {
      console.log(errorResponse);
    }
}













