
let bankBalance = 0
let loan = 0
let canBorrow = false
/*
Checks for valid input and adds amount to bankbalance 
*/
const deposit = (amount) => {
    if(amount > 0) {
        bankBalance += amount
        if (loan === 0) {
            canBorrow = true
        }
    }   
}
/*
Subtracts amount from bankbalance.
*/
const withdraw = (amount) => {
    bankBalance -= amount
}
/*
Return the amount in bankbalance.
*/
const getBalance = () => {
    return bankBalance
}
/*
Returnes the loaned amount.
*/
const getLoaned = () => {
    return loan
}
/*
Checks if can borrow is set to true or false.
*/
const canTakeLoan = () => {
    if (canBorrow === true) {       
        canBorrow = false
        return true
    }
    return false
}
/*
Checks valid input and if the amount to borrow is within the limit of 
what is allowed related to bankbalance.
*/
const canBorrowAmount = (amount) => {
    if (amount <= (bankBalance * 2) && amount > 0 && Number.isInteger(amount)) {       
        return true
    }
    return false
}
/*
Sets the loan to amount and sets can borrow to false.
*/
const takeLoan = (amount) => {
        loan = amount
        bankBalance += amount 
        canBorrow = false
}
/*
Subtracts the amount from current loan and if needed adds 
whats left to the bankbalance. If loan is repayed 
can borrow is set to true.
*/
const repayLoan = (amount) => {
    loan -= amount
    if (loan <= 0) {
        bankBalance += Math.abs(loan)
        loan = 0
        canBorrow = true
    }

}

const bank = {
    deposit,
    withdraw,
    getBalance,
    getLoaned,
    canTakeLoan,
    takeLoan,
    repayLoan,
    canBorrowAmount
}

export default bank