var productNameInput = document.getElementById("productNameInput"); //all input(inbut tag)
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addProductBtn=document.getElementById("addProductBtn");

var alert = document.getElementsByClassName("alert");


var productsContainer;

if (localStorage.getItem("myStorage") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("myStorage"));
    desplayData();

}
function addProduct() {
    if (validation()&&addProductBtn.innerHTML==="Add Product") {
        var product =
        {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescInput.value,
        }
        productsContainer.push(product);
        localStorage.setItem("myStorage", JSON.stringify(productsContainer));
       
        desplayData();
        clearData();

    }
}
addProductBtn.addEventListener("click",addProduct);

function desplayData() {
    var cartona = ``;
    for (i = 0; i < productsContainer.length; i++) {
        cartona += `<tr>
        <td>`+ i + `</td>
       <td>` + productsContainer[i].name + `</td>
       <td>` + productsContainer[i].price + `</td>
       <td>` + productsContainer[i].category + `</td>
       <td>` + productsContainer[i].description + `</td>
       <td><button onclick="updateproducrts(`+ i + `)" class="btn btn-outline-warning">Updata</button></td>
       <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
       </tr>`;
    }

    document.getElementById("tableData").innerHTML = cartona;

}

function clearData() {
    productNameInput.classList.remove("is-valid");
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}


function deleteProduct(indexProduct) {
    productsContainer.splice(indexProduct, 1);
    localStorage.setItem("myStorage", JSON.stringify(productsContainer));
    desplayData();
}
   


function searchProduct(searchterm) {
    var cartona = ``;
    for (i = 0; i < productsContainer.length; i++) {


        if (productsContainer[i].name.toLowerCase().includes(searchterm.toLowerCase()) == true) {

            cartona += `<tr>
            <td>`+ i + `</td>
           <td>` + productsContainer[i].name + `</td>
           <td>` + productsContainer[i].price + `</td>
           <td>` + productsContainer[i].category + `</td>
           <td>` + productsContainer[i].description + `</td>
           <td><button onclick="updateproducrts(`+ i + `)" updateproducrtsclass="btn btn-outline-warning">Updata</button></td>
           <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
           </tr>`;
        }
    }
    document.getElementById("tableData").innerHTML = cartona;
    }
    




function validation() {
    var regex = /^[A-Z]([a-z]|[A-Z]){3}/

    if (regex.test(productNameInput.value)) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        addProductBtn.removeAttribute("disabled");
        alert[0].classList.replace("d-block", "d-none");

        return true;

    }
    else /*if (regex.test(productNameInput.value) == false && productNameInput.value != "")*/ {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        addProductBtn.setAttribute("disabled","true");
        alert[0].classList.replace("d-none", "d-block");
        
        return false;

    }
    /*else {
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.remove("is-invalid");
        alert[0].classList.replace("d-block","d-none");
        
    }*/
}

productNameInput.addEventListener("blur", validation);


  function updateproducrts(updateindex) {
    productNameInput.value = productsContainer[updateindex].name;
    productPriceInput.value = productsContainer[updateindex].price;
    productCategoryInput.value = productsContainer[updateindex].category;
    productDescInput.value = productsContainer[updateindex].desc;
  
    addProductBtn.innerHTML = "Update Product";
   
    
    addProductBtn.onclick = function () {

        if (validation()&&addProductBtn.innerHTML=="Update Product") {
            productsContainer[updateindex].name = productNameInput.value;
            productsContainer[updateindex].price = productPriceInput.value;
            productsContainer[updateindex].category = productCategoryInput.value;
            productsContainer[updateindex].description = productDescInput.value;
            localStorage.setItem("myStorage", JSON.stringify(productsContainer));
            desplayData();
            addProductBtn.innerHTML ="Add Product";
             clearData();
        }
     
     
      
     
    };
  }