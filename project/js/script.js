import { fetchData } from "/js/modules/fetchWrapper.js";
import { displayProducts } from "/js/modules/products.js";
import { displayRecommended } from "/js/modules/home.js";
import { displayComputerParts } from "/js/modules/computer.js";
import { displayDeals } from "/js/modules/deals.js";
import { displayLaptops } from "/js/modules/laptop.js";
import { displayDesktops } from "/js/modules/desktop.js";
import { productDetails } from "/js/modules/itemDetails.js";
import { initLeafletMap } from "./modules/map.js";

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app");
    fetchProducts();
}

async function fetchProducts() {
    try {
        console.log("fetching products...");

        const response = await fetch('data/products.json'); 
        if (!response.ok) {
            throw new Error('Failed to fetch the local JSON file');
        }

        const products = await response.json();
        console.log(products);

        const page = document.querySelector("[data-page]").dataset.page;
        console.log(page);
        if (page === "home-page") {
            displayRecommended(products);
            hasSearchBar() 
        } else if (page === "product-listing-page") {
            displayProducts(products);
            hasSearchBar() 
        } else if (page === "computer-parts-page") {
            displayComputerParts(products);
            hasSearchBar() 
        } else if (page === "deals-page") {
            displayDeals(products);
            hasSearchBar() 
        } else if (page === "laptop-page") {
            displayLaptops(products);
            hasSearchBar()
        } else if (page === "desktop-page") {
            displayDesktops(products);
            hasSearchBar()
        } else if (page === "item-details") {
            productDetails(products);
        } else if (page === "map-page") {
            initLeafletMap();
        } else {
            console.log("no matching page.");
        }
            
        
    } catch (error) {
        console.log(`Error while fetching: ${error.message}`);
    }
}

function hasSearchBar() {
    const searchBar = document.querySelector("#input-search-show")
    searchBar.addEventListener('input', () => {
        // 1) Get what the user typed in the input box.
        const searchKeyword = "" + searchBar.value;
        console.log(searchKeyword)
        const productItem = document.querySelector(".product-Listings");
        productItem.childNodes.forEach(item => {
            item.childNodes.forEach(elem=> {
                // console.log(elem);
                if (elem.hasChildNodes()) {
                    elem.childNodes.forEach(elemChild => {
                        // console.log(elemChild.className);
                        if (elemChild.className === "product-name") {
                            // console.log(elemChild.textContent);
                            if (elemChild.textContent.toLowerCase().includes(searchKeyword.toLowerCase())) {
                                item.style.display = "block";
                            } else {
                                item.style.display = "none";
                            
                            }
                        }
                    });
                }
            });
        });
    });
}