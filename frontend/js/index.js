function createCardTeddies(Teddies) {
  let row = document.createElement("div");
  const mainHome = document.getElementById("main-home");
  mainHome.appendChild(row);
  row.classList.add("row");

  for (let i = 0; i < Teddies.length; i++) {
    let col = document.createElement("div");
    let card = document.createElement("div");
    col.appendChild(card);
    col.classList.add("col-12", "col-sm-6", "col-md-4");
    card.classList.add("card");
    row.appendChild(col);

    let imageTeddie = document.createElement("img");
    card.appendChild(imageTeddie);
    imageTeddie.classList.add("card-img-top", "card-img-small", "img-fluid");
    imageTeddie.src = Teddies[i].imageUrl;

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
    //tolocalestring - check notes

    let linkProduct = document.createElement("a");
    //write button here
    linkProduct.classList.add("btn", "btn-warning", "block-right");
    linkProduct.textContent = "Select";
    linkProduct.href = "/frontend/page/product.html?id=" + Teddies[i]._id;
    divLinkPrice.appendChild(linkProduct);
  }
}

function createButtonLinkProduct(linkProduct) {
  let buttonBuy = document.createElement("button");
  linkProduct.appendChild(buttonBuy);

  // //
}

async function getTeddies() {
  try {
    let response = await fetch("http://localhost:3000/api/teddies");
    if (response.ok) {
      let Teddies = await response.json();
      console.log(Teddies);
      createCardTeddies(Teddies);
    } else {
      console.error("Server : ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
}

getTeddies();
