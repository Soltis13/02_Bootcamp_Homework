//require npm libraries
var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require("fs");

//Pre defeined varriables
var ProductIds = [];
var connected = false;


//connect to database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

//Application part 1

//display all of the items available for sale. Include the ids, names, and prices of products for sale.
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    connection.end();
    console.log("\n\nThe following Items are now for sale in the its-not-amazon store.\n\n")
    console.log("------------------------------------------------------------------------")
    for(var i=0;i<res.length;i++){
      console.log("\n   ITEM:       "+res[i].item_id)
      ProductIds.push(res[i].item_id)
      console.log("\n   Product:    "+res[i].product_name)
      console.log("\n   Department: "+res[i].department_name)
      console.log("\n   Price($):   "+res[i].price)
      console.log("\n   Qty:        "+res[i].stock_quantity)
      console.log("\n----------------------------------")
      
    }
    console.log("\n\n\n")
    UserEntry(ProductIds)
  });
}

function UserEntry(ProductIds){
//prompt user with two messages
//1. The first should ask them the ID of the product they would like to buy.
  var re = /([0-9])/;
  inquirer.prompt([
    {
      type: "input",
      message: "What product (Product ID) would you like to buy?",
      name: "Ids",
      validate: function validateUserEntry(Ids){
        for(var i=0;i<ProductIds.length;i++){
          if(ProductIds[i]===Ids){
            return true
          }else{return "Not a valid selection."}
        }
      }
    },
    {
      type: "input",
      message: "How many units do you wish to purchase?",
      name: "units",
      validate: function validateUserUnits(name){
        if(!re.exec(name)){
          return "Not a valid entry."
        }else{return true}
      }
    }

  ]).then(answers =>{
    console.log(answers)
  })

  //2. The second message should ask how many units of the product they would like to buy.
  }

function main(){
  readProducts();
}

main()
//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

//However, if your store does have enough of the product, you should fulfill the customer's order.

//This means updating the SQL database to reflect the remaining quantity.

//Once the update goes through, show the customer the total cost of their purchase.