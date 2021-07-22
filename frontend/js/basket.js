// const cart = [
//   {
//     _id: "123",
//     title: "Big ted",
//     type: "black",
//     qunaity: 12,
//     price: 1000,
//   },
//   {
//     _id: "1233",
//     title: "Small ted",
//     type: "pink",
//     qunaity: 2,
//     price: 15,
//   },
//   {
//     _id: "1233",
//     title: "Small ted",
//     type: "blue",
//     qunaity: 1,
//     price: 15,
//   },
// ];

// const pinkTed = {
//   _id: "1233",
//   title: "Small ted",
//   type: "pink",
//   price: 7.5,
// };

// Add a product
// for (let i = 0; i < cart.length; i++) {
//   if (pinkTed._id === cart[i]._id && cart[i].type === pinkTed.type) {
//     cart[i].qunaity += 1;
//     cart[i].price += pinkTed.price;
//   }
// }

// console.log(cart);
fetch("http://localhost:3000/api/order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contact: {
      firstName: "John",
      lastName: "Doe",
      address: "2, Walker Lane",
      city: "Dundee",
      email: "testingT@sth.com",
    },
    products: ["5be9c8541c9d440000665243"],
  }),
})
  .then((data) => {
    console.log(data);
    return data.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
