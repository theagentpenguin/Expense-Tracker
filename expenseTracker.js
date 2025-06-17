import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.yellow("Test"));

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

function loadData(){
    
    const fileContent = fs.readFileSync('expenseList.json','utf8');
    let existingTasks = JSON.parse(fileContent);
    expenseList.push(...existingTasks);
    fs.writeFileSync('expenseList.json',JSON.stringify(expenseList,null,2),'utf8');
}

function addExpense(data){
    if(data.length !== 2){
        console.log("Enter the expense to add!");
    }
    let randomId = Math.floor(Math.random()*100);

    expenseObject = {
        desc: data[1],
        id: randomId,
        createdAt: currentTime.toLocaleString(),
        updatedAt: ""
    }
    console.log(expenseObject);
    expenseList.push(expenseObject);
    loadData();
}