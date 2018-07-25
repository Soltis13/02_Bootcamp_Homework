//require npm libraries
var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require("fs");
const Tablefy = require("tablefy")

//Pre defeined varriables

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

//function to connect to Database
function connect(){
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});
readProducts()
}

//function to read from the database
function readProducts() {
    
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    var storeInfo = res

    //call query application and send database infomation
    QueryProducts(storeInfo)
});
connection.end()
}

//Running this application will:
function QueryProducts(storeInfo) {
    let table = new Tablefy()
    //List a set of menu options:
    // View Products for Sale
    // View Low Inventory
    // Add to Inventory
    // Add New Product
    inquirer.prompt([
        {
            type: 'list',
            name: 'theme',
            message: "Welcome Manager, select from options below.",
            choices: [
                'View Products for Sale',
                'View Low Investory',
                'Add to Inventory',
                'Add New Product',
                'Quit'
            ]
        }
    ])
    .then(answers =>{
        console.log(answers)
        // If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
        if(answers.theme === "View Products for Sale"){
            console.log("Current Products for Sale:")
            console.log("--------------------------")
            table.draw(storeInfo)
        }
        // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
        else if(answers.theme ==='View Low Investory' ){
            var lowInventory = []
            //console.log(storeInfo)
            for(var i=0;i<storeInfo.length;i++){
                if(storeInfo[i].stock_quantity < 5){
                   
                    console.log("\n   ITEM:       "+storeInfo[i].item_id)
                    console.log("     Product:    "+storeInfo[i].product_name)
                    console.log("     Department: "+storeInfo[i].department_name)
                    console.log("     Price($):   "+storeInfo[i].price)
                    console.log("     Qty:        "+storeInfo[i].stock_quantity)
                    console.log("\n----------------------------------")
                }
            }
            //table.draw(lowInventory)
        }
        // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
        else if(answers.theme ==='Add to Inventory'){

        }
        // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
        else if(answers.theme ==='Add New Product'){

        }
        //quit the program
        else if(answers.theme ==='Quit'){
            //exit program
            connection.end()
            process.exit();
        }

        connection.end()
        
    })
    
}




function Main(){
    //start the connection
    connect()
}
//Start the program
Main()
