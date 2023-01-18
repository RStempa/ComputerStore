import fetchPosts from "./fetchComputers.js"
import computerView from "./computerView.js"
import work from "./work.js"
import bank from "./bank.js"

const endpoint = "https://hickory-quilled-actress.glitch.me/"
const choicesElement = document.getElementById("choices") 
const displayElement = document.getElementById("displayDiv")
const payElement = document.getElementById("pay")
const bankBtn = document.getElementById("bank")
const workBtn = document.getElementById("work")
const balanceElement = document.getElementById("balance")
const loanBtn = document.getElementById("loan")
const outstandingElement = document.getElementById("outstandingDiv")
const workElement = document.getElementById("workBody")
const repayBtn = document.createElement("a")
const lapInfo = document.getElementById("lapInfo")


const theComputers = await fetchPosts()

computerView.addComputersToMenu(theComputers)
/*
Handles the event of select menu when changed to another computer.
*/
const handleComputerMenuChange = e => {
    let selectedComputer = theComputers[e.target.selectedIndex]
    let specs = selectedComputer.specs
    let theInfo = specs.join('\n')
    lapInfo.innerText = theInfo
    let imgPath = theComputers[e.target.selectedIndex].image
    let imgSrc = endpoint + imgPath
    let template = `<div class="card-horizontal">
    <div class="img-square-wrapper">
        <img id="computerImg" src="${imgSrc}" alt="">
    </div>
    <div class="card-body">
        <h4 class="card-title">${selectedComputer.title}</h4>
        <p class="card-text">${selectedComputer.description}</p>
    </div>
    <div>
        <p class="card-text">${selectedComputer.price} kr</p>
        <a href="#" class="btn btn-info" id = "buy">Buy</a>
    </div>
</div>`  
    displayElement.innerHTML = template

    const buyBtn = document.getElementById("buy")
    buyBtn.addEventListener("click", () => {
        let price = Number(selectedComputer.price)
        // check if enough money
        if (price <= bank.getBalance()) {
            alert("You have bought " + selectedComputer.title)
            // deduct price from balance
            bank.withdraw(price)
            // update balance element
            balanceElement.innerText = `${bank.getBalance()} kr`

        } else {
            alert("You dont have enough money to buy " + selectedComputer.title)
        }
    })
}

choicesElement.addEventListener("change", handleComputerMenuChange)
/*
Banks the amount earned, if there is a loan 10% is deducted and repayed towards
the loan. Then the balance and pay element are updated.
*/
bankBtn.addEventListener("click", () => { 

    if (bank.getLoaned() > 0) {
        let toPayBack = work.getSalary() / 10
        work.setSalary(work.getSalary() - toPayBack)
        bank.repayLoan(toPayBack)
    }

    bank.deposit(work.getSalary())
    work.transfer()
    payElement.innerText = `${work.getSalary()} kr`
    balanceElement.innerText = `${bank.getBalance()} kr`
    const outstanding = document.getElementById("outstanding")

    if(outstanding != null) {
       outstanding.innerText = `${bank.getLoaned()} kr`
    }
})
/*
Eventlistener for work button and updates the pay element with current 
salary.
*/
workBtn.addEventListener("click", () => {
    work.doWork()
    payElement.innerText = `${work.getSalary()} kr`
})
/*
Eventlistener for loan button. Checks if there is money in account in order to take a loan,
checks if the amount is within range of how much is allowed to borrow. Updates balance, outstanding loan and
reveals a repay button to the dom. Else a prompt with message is displayed.
*/
loanBtn.addEventListener("click", () => {
    let eligable = bank.canTakeLoan()
    console.log("eligable " + eligable)
    if (eligable === true) {
        var wantBorrow = Number(prompt("How much would you like to borrow?"))  
        let allowed = bank.canBorrowAmount(wantBorrow)
        if (allowed === true) {
            bank.takeLoan(wantBorrow)
            balanceElement.innerText = `${bank.getBalance()} kr`
            let template = `<p class="card-text">Loan</p>
            <p class="card-text" id = "outstanding">${bank.getLoaned()} kr</p>`
            outstandingElement.innerHTML = template
            repayBtn.className = "btn btn-danger"
            repayBtn.innerText = "Repay"
            workElement.appendChild(repayBtn)
            repayBtn.addEventListener("click", repay)
        } else {
            alert("Enter a number, not more than double your balance or less than 0!")
        }    
        
    } else if(eligable === false) {
        alert("You can not get the loan!")
    }
})
/*
Repays loan with whatever is in salary amount. Sets the element for outstanding loan, 
pay and balance to new values.
*/
function repay() {
    let thePay = work.getSalary()
    bank.repayLoan(thePay)
    document.getElementById("outstanding").innerText = `${bank.getLoaned()} kr`
    work.transfer()
    payElement.innerText = `${work.getSalary()} kr`
    balanceElement.innerText = `${bank.getBalance()} kr`
    if (bank.getLoaned === 0) {
        workElement.removeChild(repayBtn)
    }
}

