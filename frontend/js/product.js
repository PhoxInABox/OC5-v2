class MyProduct {
  constructor(idTeddie, selectedSizes) {
    this.idTeddie = idTeddie;
    this.selectedSizes = selectedSizes;
  }
}

function getIdUrlAndCard(Teddies) {
  let urlSearch = new URLSearchParams(window.location.search);
  console.log(urlSearch);
  let idTeddie = urlSearch.get("id");
  console.log(idTeddie);
  getTeddieItem(Teddies, idTeddie);
}

function getTeddieItem(Teddies, idTeddie) {
  let choosenTeddie = Teddies.find((Teddies) => Teddies["_id"] == idTeddie);
  console.log(choosenTeddie);
  createCardTeddie(choosenTeddie, idTeddie);
}

function createCardTeddie(choosenTeddie, idTeddie) {
  let divParentParent = document.createElement("div");
  const mainProduct = document.getElementById("main-product");
  mainProduct.appendChild(divParentParent);
  divParentParent.classList.add("row", "mx-auto", "my-3", "w-75");

  let divParent = document.createElement("div");
  divParentParent.appendChild(divParent);
  divParent.classList.add("card", "col", "m-auto", "p-5");

  let imageTeddie = document.createElement("img");
  divParent.appendChild(imageTeddie);
  imageTeddie.classList.add("card-image-top", "photo", "img-fluid");
  imageTeddie.src = choosenTeddie.imageUrl;

  let divCardBody = document.createElement("div");
  divParent.appendChild(divCardBody);
  divCardBody.classList.add(
    "card-body",
    "text-center",
    "px-0",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );

  let titleTeddie = document.createElement("h3");
  divCardBody.appendChild(titleTeddie);
  titleTeddie.classList.add("card-title", "title-product");
  titleTeddie.textContent = choosenTeddie.name;

  let descriptionTeddie = document.createElement("p");
  divCardBody.appendChild(descriptionTeddie);
  descriptionTeddie.classList.add("description-product", "text-justify");
  descriptionTeddie.textContent = choosenTeddie.description;

  chooseSize(divCardBody, choosenTeddie);

  let divLinkPrice = document.createElement("div");
  divCardBody.appendChild(divLinkPrice);
  divLinkPrice.classList.add(
    "d-flex",
    "flex-md-row",
    "flex-column",
    "justify-content-between"
  );

  let priceTeddie = document.createElement("p");
  divLinkPrice.appendChild(priceTeddie);
  priceTeddie.classList.add("price-product", "font-weight-bold");
  priceTeddie.textContent = "£" + choosenTeddie.price / 100;

  let linkProduct = document.createElement("a");
  divLinkPrice.appendChild(linkProduct);

  let buttonBuy = document.createElement("button");
  linkProduct.appendChild(buttonBuy);
  buttonBuy.classList.add("btn", "btn-warning", "block-right");

  buttonBuy.textContent = "Add to Cart";
  console.log(idTeddie);
  getLensTeddie(buttonBuy, idTeddie);
}

function chooseSize(divCardBody, choosenTeddie) {
  let sentenceChoiceLens = document.createElement("p");
  divCardBody.appendChild(sentenceChoiceLens);
  sentenceChoiceLens.classList.add("text-left", "my-3");
  sentenceChoiceLens.textContent = "Choose a Size :";

  let choiceLens = document.createElement("select");
  divCardBody.appendChild(choiceLens);
  choiceLens.classList.add("form-control", "mb-5");
  choiceLens.id = "list";

  numberSizes = choosenTeddie.Sizes;
  for (let i = 0; i < numberSizes.length; i++) {
    let optionLens = document.createElement("option");
    choiceLens.appendChild(optionLens);
    optionLens.textContent = choosenTeddie.Sizes[i];
  }
}

function getLensTeddie(buttonBuy, idTeddie) {
  buttonBuy.addEventListener("click", function () {
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    let selectedSizes = document.getElementById("list").value;
    // console.log(selectedSizes);
    if (basketContent === null) {
      basketContent = [];
    }
    let product = new MyProduct(idTeddie, selectedSizes);
    basketContent.push(product);
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
  });
}

async function getTeddies() {
  try {
    let response = await fetch("http://localhost:3000/api/Teddies");
    if (response.ok) {
      let Teddies = await response.json();
      console.log(Teddies);
      getIdUrlAndCard(Teddies);
    } else {
      console.error("Retour du serveur : ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
}

getTeddies();
