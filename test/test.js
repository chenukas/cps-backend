const orderRouter = require("../routes/order.routes");
const Order = require("../models/order.model");
const Item = require("../models/item.model");
const assert = require("assert");
const { response } = require("express");

//IT18206906 - Test Case 1(Positive)
describe("Add Item", () => {
  it("add item to Database", () => {
    const item = new Item({
      itemName: "Bricks",
      quantity: 100,
      unitPrice: 40,
      description: "This is a test item",
      supplier: "5f8a08c5072b9b31186ce359",
    });
    item
      .save()
      .then(() => {
        assert(!item.isNew);
      })
      .catch(() => {
        console.log("error");
      });
  });
});

//IT18206906 - Test Case 2(Negative)
describe("Add Item without Name", () => {
  it("add item to Database", () => {
    const item = new Item({
      quantity: 100,
      unitPrice: 40,
      description: "This is a test item",
      supplier: "5f8a08c5072b9b31186ce359",
    });
    item
      .save()
      .then(() => {
        assert(!item.isNew);
      })
      .catch(() => {
        console.log("Error:Item name is required");
      });
  });
});

//IT18206906 - Test Case 3(Positive)
describe("Delete Item", () => {
  it("delete item from Database", () => {
    Item.findByIdAndDelete("5f8a0a5d072b9b31186ce35e").then((result) => {
      assert(response.status == 200);
      done();
    });
  });
});

describe("Create Orders", () => {
  it("create a order in DB", () => {
    const order = new Order({
      orderID: "19",
      requisitionID: "5f8ab6f91f68124ffc8b9822",
      status: "pending",
    });
    order
      .save()
      .then(() => {
        assert(!order.isNew);
      })
      .catch(() => {
        console.log("error");
      });
  });
});

describe("Retrieve orders", () => {
  let order;
  /*beforeEach((done) => {
        order = Order({
            orderID:"5f8a87d06027a1266c2f512f",
            requisitionID:"5f8ab6f91f68124ffc8b9822",
            status:"pending"
        })
        order.save()
        .then(()=> {
            done();
        })
    })*/

  it("Order Read", () => {
    Order.find({
      orderID: "5f8a87d06027a1266c2f512f",
    }).then((orders) => {
      assert(order._id.toString() === orders[0]._id.toString());
      done();
    });
  });
});
