//require npm libraries
var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require("fs");
const Tablefy = require("tablefy")

//Pre defeined varriables
var productIds = [];

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
function connect(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });
  readProducts()
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    let table = new Tablefy()
    var storeInfo = res
    // Log all results of the SELECT statement
   
    console.log("\n\nThe following Items are now for sale in the its-not-amazon store.\n\n")
    console.log("------------------------------------------------------------------------")
    table.draw(res)
    // for(var i=0;i<res.length;i++){
    //   console.log("\n   ITEM:       "+res[i].item_id)
    //   productIds.push(res[i].item_id)
    //   console.log("\n   Product:    "+res[i].product_name)
    //   console.log("\n   Department: "+res[i].department_name)
    //   console.log("\n   Price($):   "+res[i].price)
    //   console.log("\n   Qty:        "+res[i].stock_quantity)
    //   console.log("\n----------------------------------")
      
    // }
    console.log("\n\n\n")
    UserEntry(productIds, storeInfo)
  });
}

function UserEntry(productIds, storeInfo){
  //console.log(productIds)
  //console.log(productIds.length)
//prompt user with two messages

  var re = /([0-9])/;
  inquirer.prompt([
    //1. The first should ask them the ID of the product they would like to buy.
    {
      type: "input",
      name: "Ids",
      message: "What product (Product ID) would you like to buy?"     

    },
    
    //2. The second message should ask how many units of the product they would like to buy.
    {
      type: "input",
      name: "units",
      message: "How many units do you wish to purchase?",
      validate: function validateUserUnits(name, Ids){
        if(!re.exec(name)){
          console.log("Not a valid entry.")
          return false
        }else if(name.units>storeInfo[Ids-1].stock_quantity){
          console.log("Error. Not enough inventory.  Only "+storeInfo[userRequest.Ids-1].stock_quantity+" available.") 
          return false
        }
        else{return true}
      }
    }

  ]).then(answers =>{
    //console.log(answers)
    //go to function, check store for purchase
  Purchase(productIds, storeInfo, answers)
  })

 
}

function Purchase(productIds, storeInfo, userRequest){
//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// console.log("answers"+JSON.stringify(userRequest))
// console.log("storeInfo"+JSON.stringify(storeInfo))
// console.log("ProductID"+JSON.stringify(productIds))
// console.log(userRequest.units)
// console.log(userRequest.Ids)
// console.log(storeInfo[userRequest.Ids-1])


//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
if(userRequest.units>storeInfo[userRequest.Ids-1].stock_quantity){
  console.log("Error. Not enough inventory.  Only "+storeInfo[userRequest.Ids-1].stock_quantity+" available.") 
  UserEntry()
}else{
  UpdateProduct(productIds, storeInfo, userRequest)

}

}


function UpdateProduct(productIds, storeInfo, userRequest) {
  console.log("Purchasing "+userRequest.units+" "+storeInfo[userRequest.Ids-1].product_name+"\n");
  
  var updatedQty = storeInfo[userRequest.Ids-1].stock_quantity - userRequest.units
  //console.log("Value to reduce to: "+updatedQty)
  //console.log("Store Item ID to reduce "+ storeInfo[userRequest.Ids-1].item_id)
  
  var query = connection.query(
    
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: updatedQty
      },
      {
        item_id: storeInfo[userRequest.Ids-1].item_id
      }
    ],
    function(err, res) {
      // logs the actual query being run
      if (err) throw err;
      //However, if your store does have enough of the product, you should fulfill the customer's order.

      //This means updating the SQL database to reflect the remaining quantity.

      //Once the update goes through, show the customer the total cost of their purchase.

      console.log("Update Successful.  You purchased "+userRequest.units+" "+storeInfo[userRequest.Ids-1].product_name+"\n")
      //console.log(JSON.stringify(res) + " products updated!\n");
      var cost = userRequest.units * storeInfo[userRequest.Ids-1].price
      console.log("Your total cost is: "+cost)
         
    },
   
  );
  connection.end()

  //console.log(query.sql);
}

function main(){
  connect()
}

main()

