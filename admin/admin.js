let navBar = document.getElementById("navbar");
const url = "https://639b3492d5141501974eaf28.mockapi.io/nykaa";
let mainSection = document.getElementById("main");

//--------------------------------------------//
//navbar
navBar.innerHTML = `
<div>
    <button id="removeProducts">Remove Product</button>
    <button id="addProducts">Add Product</button>
    <button id="editProducts">Edit Product</button>
</div>
`;
let removeProductsButton = document.getElementById("removeProducts");

window.addEventListener("load", (event) => {
  event.preventDefault();
  mainSection.innerHTML = `  
  <div id="dashboard">
  <h2>DASHBOARD</h2>

    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl1RGsMu9uIW9b_TaoJ_ILmw_2W9HQY9hFuCrDd8v2SQ&s" alt="user logo">
    <h2>Users : </h2>  
  
    <img src="/photos/sales.png" alt="sales logo">
      <h2>Users : </h2>
  </div>
 
  `;
});

//--------------------------------------------//
//Remove
removeProductsButton.addEventListener("click", () => {
  fetchAndRenderAll();
});

function fetchAndRenderAll() {
  try {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        renderList(data);
      });
  } catch (error) {
    console.log(error);
  }
}

function renderList(data) {
  let CardList = `
    ${data
      .map((ele) =>
        card(
          ele.category,
          ele.details,
          ele.id,
          ele.image,
          ele.name,
          ele.price,
          ele.quantity,
          ele.ratings
        )
      )
      .join("")}    
    `;
  mainSection.innerHTML = CardList;

  // let allbtn = document.querySelectorAll("#removeButton");
  // console.log(allbtn);

  let allCards = document.querySelectorAll(".card");
  console.log(allCards);
var clickedId;
for(let i=0;i<allCards.length;i++){
  
  allCards[i].lastElementChild.lastElementChild.addEventListener('click',()=>{
    console.log(allCards[i].dataset.id);
    clickedId=allCards[i].dataset.id;
    console.log(clickedId)
    // console.log(`${allCards[i].childNodes}`)
  })
  
}

for(let i=0;i<allCards.length;i++){
 
}
  
}

function card(cat, details, id, image, name, price, quantity, ratings) {
  let card = `
        <div class="card" data-id=${id}>
            <div class="card-img">
                <img src=${image} alt='image'>
            </div>
            <div class="card-body">
                <h3 class="name">${name.substring(0, 24)}</h3>
                <div class="description">${details.substring(0, 30)}</div>
                <h3 class="rating">Rating: ${ratings}</h3>
                <h3 class='price'>Price: ${price}</h3>
                <h3 class="quantity">Quantity: ${quantity}</h3>
                <button id="removeButton">Remove</button>
              </div>
        </div>        
        `;
  return card;
}

//--------------------------------------------------//
// addProducts
addProducts.addEventListener("click", () => {
  addProductForm();
});

function addProductForm() {
  mainSection.innerHTML = `
    <form id="addForm" >
    <label for="name" >Product Name : </label><br>
    <input type="text" id="name" required><br>
    <label for="category">Product Category : </label><br>
    <input type="text" id="category" required><br>
    <label for="price">Product Price : </label><br>
    <input type="text" id="price" required><br>
    <label for="details">Product Details : </label><br>
    <input type="text" id="details" required><br>
    <label for="ratings">Product Ratings: </label><br>
    <input type="number" id="ratings" min="1" max="5" required><br>
    <label for="quantity">Product Quantity : </label><br>
    <input type="number" id="quantity" min="1" required><br>
    <label for="image">Product Image : </label><br>
    <input type="text" id="image" required><br>
    <hr>
    <input type="submit" value="Submit">
    </form>    
    `;

  const myform = document.getElementById("addForm");
  const addName = document.getElementById("name");
  const addCategory = document.getElementById("category");
  const addPrice = document.getElementById("price");
  const addDetails = document.getElementById("details");
  const addRatings = document.getElementById("ratings");
  const addQuantity = document.getElementById("quantity");
  const addImage = document.getElementById("image");

  myform.addEventListener("submit", (e) => {
    e.preventDefault();
    var productObject = {
      name: addName.value,
      category: addCategory.value,
      price: addPrice.value,
      details: addDetails.value,
      ratings: addRatings.value,
      quantity: addQuantity.value,
      image: addImage.value,
    };
    addProductToAPI(productObject);
  });
}

function addProductToAPI(obj) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => alert("error"));
}

//-------------------------------------------------------//
// edit
editProducts.addEventListener("click", () => {
  editProduct();
});

function editProduct() {
  mainSection.innerHTML = `
    <form id="addForm" >
    <label for="id" >Please Enter Id : </label><br>
    <input type="number" id="id" required><br>
    <label for="name" >Product Name : </label><br>
    <input type="text" id="name" required><br>
    <label for="category">Product Category : </label><br>
    <input type="text" id="category" required><br>
    <label for="price">Product Price : </label><br>
    <input type="text" id="price" required><br>
    <label for="details">Product Details : </label><br>
    <input type="text" id="details" required><br>
    <label for="ratings">Product Ratings: </label><br>
    <input type="number" id="ratings" min="1" max="5" required><br>
    <label for="quantity">Product Quantity : </label><br>
    <input type="number" id="quantity" min="1" required><br>
    <label for="image">Product Image : </label><br>
    <input type="text" id="image" required><br>
    <hr>
    <input type="submit" value="Submit">
    </form>    
    `;

  const myform = document.getElementById("addForm");
  const id = document.getElementById("id");
  const addName = document.getElementById("name");
  const addCategory = document.getElementById("category");
  const addPrice = document.getElementById("price");
  const addDetails = document.getElementById("details");
  const addRatings = document.getElementById("ratings");
  const addQuantity = document.getElementById("quantity");
  const addImage = document.getElementById("image");

  myform.addEventListener("submit", (e) => {
    e.preventDefault();
    var productObject = {
      name: addName.value,
      category: addCategory.value,
      price: addPrice.value,
      details: addDetails.value,
      ratings: addRatings.value,
      quantity: addQuantity.value,
      image: addImage.value,
    };
    editProductFromAPI(productObject, id.value);
  });
}

function editProductFromAPI(obj, id) {
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => alert("error"));
}



// allCards.forEach((e) => {
  //   console.log(e.button);
  //   allCards.addEventListener("click", (e) => {
  //     console.log(e);
  //   });
  // });

  // for(let i in addCards){
  //   if(i==0){
  //     console.log(addCards[i])
  //   }
  // }

  // rembtn.attributes.addEventListener("click",()=>{
  //     console.log("arun");
  //   })