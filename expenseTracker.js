import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.blue("Hello! This is your digital expense tracker!"));
console.log("Follow the instructions to get the best out of our tool.");
console.log("To "+chalk.green("add")+" an expense, type "+chalk.green("add <expense description> <expense amount>"));
console.log("To "+chalk.green("update")+" an expense, type "+chalk.green("update <id> <expense description> <expense amount>"));
console.log("To "+chalk.green("delete")+" an expense, type "+chalk.green("delete <expense id>"));
console.log("To "+chalk.green("view")+" all expenses, type "+chalk.green("view"));
console.log("To "+chalk.green("summary")+" an expense, type "+chalk.green("summary"));
console.log("To "+chalk.green("summary-month")+" an expense, type "+chalk.green("summary <month>"));

let expenseObject;
let currentTime = new Date();

const args = process.argv.slice(2);
let expenseList = [];
const fileExists = fs.existsSync('expenseList.json');
//console.log(args);
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//console.log(month[args[1]-1]);
if(!fileExists){
    fs.writeFileSync('expenseList.json',JSON.stringify(expenseList),'utf8');
}

if(args[0]==="add"){
    addExpense(args);
}
if(args[0]==="update"){
    updateExpense(args);
}
if(args[0]==="view"){
    viewExpenses();
}
if(args[0]==="delete"){
    deleteExpense(args[1]);
}

if(args[0]==="summary" && args.length<=1){
    expenseSummary();
}

if(args[0]==="summary" && args.length>1){
    monthlyExpenseSummary();
}
/************************************************************************
Name of the function: loadData()
Inputs: no arguments
Output: loads the data into json file
*************************************************************************/
function loadData(){
    
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    expenseList.push(...existingTasks);
    fs.writeFileSync('expenseList.json',JSON.stringify(expenseList,null,2),'utf8');
}
/************************************************************************
Name of the function: addExpense()
Inputs: user input
Output: Adds an expense into the json file
*************************************************************************/
function addExpense(data){
    if(data.length !== 2){
        console.log("Enter the expense to add!");
    }
    let randomId = Math.floor(Math.random()*100);

    expenseObject = {
        desc: data[1],
        amount: data[2],
        id: randomId,
        createdAt: currentTime.toLocaleString(),
        currentMonth: month[currentTime.getMonth()],
        updatedAt: ""
    }
    console.log(expenseObject);
    expenseList.push(expenseObject);
    loadData();
}

/************************************************************************
Name of the function: updateExpense()
Inputs: user input
Output: Updates an expense into the json file based on the id given in the input
*************************************************************************/
function updateExpense(data){
    let inpId = Number(data[1]);
    let newDesc = data[2];
    let newAmount = data[3];
    
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingExpenses = JSON.parse(fileContent);
    for(let i=0; i<existingExpenses.length; i++){
        
        if(existingExpenses[i].id===inpId){
            existingExpenses[i].desc = newDesc;
            existingExpenses[i].amount = newAmount;
            existingExpenses[i].updatedAt = currentTime.toLocaleString();
        }
        
    }
    
    expenseList.push(...existingExpenses);
    fs.writeFileSync('expenseList.json',JSON.stringify(expenseList,null,2),'utf8');


}

/************************************************************************
Name of the function: viewExpense()
Inputs: user input
Output: Displays all the expenses in the list
*************************************************************************/
function viewExpenses(){
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingExpenses = JSON.parse(fileContent);
    console.log(existingExpenses);

}

/************************************************************************
Name of the function: deleteExpense()
Inputs: user input
Output: Deletes an expense from the json file
*************************************************************************/
function deleteExpense(data){
    console.log(data);
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingExpenses = JSON.parse(fileContent);
    for(let i=0; i<existingExpenses.length; i++){
        
        if(existingExpenses[i].id===Number(data)){
            existingExpenses.splice(i,1);
            fs.writeFileSync('expenseList.json',JSON.stringify(existingExpenses,null,2),'utf8');
        }
        
    }
    console.log("Deleted the expense with id "+data+"successfully!");
    
    
}
/************************************************************************
Name of the function: expenseSummary()
Inputs: user input
Output: Summarizes the expenses
*************************************************************************/
function expenseSummary(){
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingExpenses = JSON.parse(fileContent);
    let totalAmount = 0;
    for(let i=0;i<existingExpenses.length;i++){
        let eachAmount = Number(existingExpenses[i].amount);
        totalAmount += eachAmount;
    }
    console.log("Total expenses so far: "+totalAmount);
}
/************************************************************************
Name of the function: monthlyExpenseSummary()
Inputs: user input
Output: Summarizes the expenses for the given month
*************************************************************************/
function monthlyExpenseSummary(){
    let reqMonth = month[args[1]-1];
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingExpenses = JSON.parse(fileContent);
    let totalAmount = 0;
    for(let i=0; i<existingExpenses.length; i++){
        if(existingExpenses[i].currentMonth == reqMonth){
            let eachAmount = Number(existingExpenses[i].amount);
            totalAmount += eachAmount;
        }
    }
    console.log("Total expenses for the month of "+reqMonth+": "+totalAmount);
    
}