import chalk from 'chalk';
import fs from 'fs';

//console.log(chalk.yellow("Test"));
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

if(!fileExists){
    fs.writeFileSync('expenseList.json',JSON.stringify(expenseList),'utf8');
}

if(args[0]==="add"){
    addExpense(args);
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
    if(data.length !== 2){
        console.log("Enter the expense to add!");
    }


}

/************************************************************************
Name of the function: viewExpense()
Inputs: user input
Output: Displays all the expenses in the list
*************************************************************************/
function viewExpenses(data){

}

/************************************************************************
Name of the function: deleteExpense()
Inputs: user input
Output: Deletes an expense from the json file
*************************************************************************/
function deleteExpense(data){

}
/************************************************************************
Name of the function: expenseSummary()
Inputs: user input
Output: Summarizes the expenses
*************************************************************************/
function expenseSummary(data){

}
