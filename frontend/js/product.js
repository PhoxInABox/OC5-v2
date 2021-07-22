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
  return idTeddie;
  console.log(idTeddie);
  getTeddieItem(Teddies, idTeddie);
}

function getTeddieItem(Teddies, idTeddie) {
  let choosenTeddie = Teddies.find((Teddies) => Teddies["_id"] == idTeddie);
  console.log(choosenTeddie);
  createCardTeddie(choosenTeddie, idTeddie);
}

function createCardTeddie(choosenTeddie, idTeddie) {
  let row = document.createElement("div");
  const mainProduct = document.getElementById("main-product");
  mainProduct.appendChild(row);
  row.classList.add("row", "mx-auto", "my-3", "w-75");

  let card = document.createElement("div");
  row.appendChild(card);
  card.classList.add("card", "col", "m-auto", "p-5");

  let imageTeddie = document.createElement("img");
  card.appendChild(imageTeddie);
  imageTeddie.classList.add("card-img-top", "card-img-small", "img-fluid");
  imageTeddie.src = choosenTeddie.imageUrl;

  let divCardBody = document.createElement("div");
  card.appendChild(divCardBody);
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
  //write a button here
  divLinkPrice.appendChild(linkProduct);

  let buttonBuy = document.createElement("button");
  divCardBody.appendChild(buttonBuy);
  buttonBuy.classList.add("btn", "btn-warning", "block-right");

  buttonBuy.textContent = "Add to Cart";
  console.log(idTeddie);
  getSizeTeddie(buttonBuy, idTeddie);
}

function chooseSize(divCardBody, choosenTeddie) {
  let sentenceChoiceSize = document.createElement("p");
  divCardBody.appendChild(sentenceChoiceSize);
  sentenceChoiceSize.classList.add("text-left", "my-3");
  sentenceChoiceSize.textContent = "Choose a Size :";

  let choiceSize = document.createElement("select");
  divCardBody.appendChild(choiceSize);
  choiceSize.classList.add("form-control", "mb-5");
  choiceSize.id = "list";

  numberSizes = choosenTeddie.colors;
  for (let i = 0; i < numberSizes.length; i++) {
    let optionSize = document.createElement("option");
    choiceSize.appendChild(optionSize);
    optionSize.textContent = choosenTeddie.colors[i];
    optionSize.value = choosenTeddie.colors[i];
  }
}

function getSizeTeddie(buttonBuy, idTeddie) {
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
  const id = getIdUrlAndCard();

  try {
    let response = await fetch("http://localhost:3000/api/Teddies/" + id);
    if (response.ok) {
      let Teddies = await response.json();
      createCardTeddie(Teddies);
      console.log(Teddies);
    } else {
      console.error("Server : ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
}

getTeddies();
