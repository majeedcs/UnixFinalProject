export function displayDesktops(products) {
    const computerListing = document.querySelector(".product-Listings");

    const filteredProducts = products.products.filter(product => product.category_id === 5);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("desktop-item");
        productElement.classList.add("card");
        productElement.style.width = "18rem";
        productElement.innerHTML = `
            <img src="${product.thumbnail_image}" class="card-img-top" alt="Image of ${product.item_title}">
            <div class="card-body">
                <h1 class="product-name">${product.item_title}</h3>
                <p class="card-text">${product.description}</p>
                <p class="product-price">$${product.unit_price}</p>
            </div>
        `;
        const prodDetails = createCustomElement(productElement,'a', "Product Details");
        prodDetails.setAttribute("item-id", product.item_id);
        prodDetails.addEventListener('click', () => {
        // When clicked save the information of the item clicked
        console.log("show clicked....")
        console.log(prodDetails)
        sessionStorage.setItem("show-id", prodDetails.getAttribute("item-id"))
        window.location = "item-listing.html";
    })
        computerListing.appendChild(productElement);
    });  
}

function createCustomElement(parent,newElementName,content){
    const newElem = document.createElement(newElementName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}