

// let postRequest = new XMLHttpRequest();
// postRequest.open('GET', 'http://localhost:3000/api/products/');
  
// let data = JSON.parse(postRequest.response);
//   

//      if (postRequest.status >= 200 && postRequest.status < 400) {
//         

//         for (let product of allProducts { 
//             const allProducts = document.getElementById('items');
           
//             let card =  document.createElement('a');
//             card.setAttribute = ('href', './product.html?id=' + product._id)

//             let article = document.createElement('article');
//             let image = document.createElement('img');
//             let name = document.createElement('h3');
//             let description = document.createElement('p');
            
            
//             image.src = product.imageUrl;
//             name.textContent = product.name;
//             description.textContent = product.description;
            

//             allProducts.appendChild(card);
//             card.appendChild(article);
//             article.appendChild(image);
//             article.appendChild(name);
//             article.appendChild(description);

            
//             allProducts.push(product[i]);  

//             console.log(product.name);
//         }  
            //return
       
//     } 
          
//  

// postRequest.send();

//-----------------------------------------------------------------------
const allProducts = document.getElementById('items');
// Create a request variable and assign a new XMLHttpRequest object to it.
let request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:3000/api/products', true)

request.onload = function () {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        data.forEach((product) => {
            // Create an anchorLink with a href attribute
            const card = document.createElement('a')
            card.setAttribute('href', './product.html?id=' + product._id)
            //create an article tag as a block for the card
            const article = document.createElement('article')
            // Create an img and set the image source to the products's image
            const image = document.createElement('img')
            image.src = product.imageUrl

            // Create an h3 and set the text content to the product's name
            const name = document.createElement('h3')
            name.textContent = product.name

            // Create a p and set the text content to the product's description
            const description = document.createElement('p')
            description.textContent = product.description
            product.description = product.description.substring(0, 100) // Limit to 100 chars

            // Append the cards to the section element
            allProducts.appendChild(card)
            card.appendChild(article)

            // Each article will contain an image,name and a description
            article.appendChild(image)
            article.appendChild(name)
            article.appendChild(description)
            
        })
    } else {
        const errorMessage = document.createElement('behavior')
        errorMessage.textContent = `Gah, it's not working!`
        allProducts.appendChild(errorMessage)
    }
};

// Send request
request.send();





