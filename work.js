let salary = 0
//let hasLoan = false
/*
Adds 100 to the salary on each click.
*/
const doWork = () => {
    salary += 100
}
/*
Sets the amount in salary to 0 when money is repayed 
to the bank.
*/
const transfer = () => {
    salary = 0
}
/*
Returns current amount in salary.
*/
const getSalary = () => {
    return salary
}
/*
Sets the salary when bank button is clicked. 
*/
const setSalary = (amount) => {
    salary = amount
}
/*

*/
/* const setLoan = () => {
    hasLoan = true
} */

const work = {
    doWork,
    transfer,
    getSalary,
    //setLoan,
    setSalary
}

export default work