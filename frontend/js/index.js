function createCardTeddies(Teddies) {
  let divParentParent = document.createElement("div");
  const mainHome = document.getElementById("main-home");
  mainHome.appendChild(divParentParent);
  divParentParent.classList.add(
    "row-cols-1",
    "row-cols-md-4",
    "row-cols-lg-5",
    "d-flex",
    "flex-wrap",
    "justify-content-between",
    "align-items-between"
  );

  for (let i = 0; i < Teddies.length; i++) {
    let divParent = document.createElement("div");
    divParentParent.appendChild(divParent);
    divParent.classList.add("card", "col", "m-3", "pt-3");

    let imageTeddie = document.createElement("img");
    divParent.appendChild(imageTeddie);
    imageTeddie.classList.add("card-image-top", "photo", "img-fluid");
    imageTeddie.src = Teddies[i].imageUrl;

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
    titleTeddie.classList.add("card-title", "title");
    titleTeddie.textContent = Teddies[i].name;

    let descriptionTeddie = document.createElement("p");
    divCardBody.appendChild(descriptionTeddie);
    descriptionTeddie.classList.add("description", "text-justify");
    descriptionTeddie.textContent = Teddies[i].description;

    let divLinkPrice = document.createElement("div");
    divCardBody.appendChild(divLinkPrice);
    divLinkPrice.classList.add("d-flex", "flex-row", "justify-content-between");

    let priceTeddie = document.createElement("p");
    divLinkPrice.appendChild(priceTeddie);
    priceTeddie.classList.add("price", "my-2", "font-weight-bold");
    priceTeddie.textContent = "£" + Teddies[i].price / 100;

    let linkProduct = document.createElement("a");
    divLinkPrice.appendChild(linkProduct);
    getUrlProduct(Teddies, i, linkProduct);
    createButtonLinkProduct(linkProduct);
  }
}

function getUrlProduct(Teddies, i, linkProduct) {
  let splitUrl = window.location.pathname.split("/");
  let lastItem = splitUrl.pop();
  let url =
    window.location.origin +
    window.location.pathname.replace(lastItem, "./frontend/page/product.html");

  let urlObj = new URL(url);
  let idTeddies = Teddies[i]._id;
  urlObj.searchParams.append("id", idTeddies);
  linkProduct.href = urlObj;
}

function createButtonLinkProduct(linkProduct) {
  let buttonBuy = document.createElement("button");
  linkProduct.appendChild(buttonBuy);
  buttonBuy.classList.add("btn", "btn-warning", "block-right");
  // Ajout texte au bouton
  buttonBuy.textContent = "Select";
}

async function getTeddies() {
  try {
    let response = await fetch("http://localhost:3000/api/Teddies");
    if (response.ok) {
      let Teddies = await response.json();
      createCardTeddies(Teddies);
    } else {
      console.error("Retour du serveur : ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
}

getTeddies();
