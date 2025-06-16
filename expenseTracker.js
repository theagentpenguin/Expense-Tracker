import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.yellow("Test"));

let expenseObject;
let currentTime = new Date();

const args = process.argv.slice(2);
let expenseList = [];
//console.log(args);

fs.writeFileSync('expenseList.json',JSON.stringify(expenseList),'utf8');
if(args[0]==="add"){
    addExpense(args);
}

function addExpense(data){
    if(data.length !== 2){
        console.log("Enter the expense to add!");
    }
    let randomId = Math.floor(Math.random()*100);

    expenseObject = {
        desc: data,
        id: randomId,
        createdAt: currentTime.toLocaleString(),
        updatedAt: ""
    }
    console.log(expenseObject);
}