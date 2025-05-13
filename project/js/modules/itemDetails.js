export function productDetails(products) {
    const computerListing = document.querySelector("#item-listing");
    sessionStorage.getItem("show-id")
    const filteredProducts = products.products.filter(product => product.item_id.toString() === sessionStorage.getItem("show-id"));

        const productElement = document.getElementById("item-listing");
        productElement.classList.add("card");
        productElement.style.width = "30rem";

        productElement.innerHTML = `
             <img src="${filteredProducts[0].thumbnail_image}" class="card-img-top" alt="Image of ${filteredProducts[0].item_title}">
             <div class="card-body">
                 <h1 class="product-name">${filteredProducts[0].item_title}</h3>
                 <p>Brand: ${filteredProducts[0].brand}</p>
                 <p>Make: ${filteredProducts[0].make}</p>
                 <p class="card-text">${filteredProducts[0].description}</p>
                 <p class="product-price">$${filteredProducts[0].unit_price}</p>
                 <p>Quantity of product: ${filteredProducts[0].quantity_in_stock}</p>
                 <p>Product ID: ${filteredProducts[0].item_id}</p>
             </div>
         `;
        console.log(filteredProducts[0].item_title)
        computerListing.appendChild(productElement);

};  
function createCustomElement(parent,newElementName,content){
    const newElem = document.createElement(newElementName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}