const choicesElement = document.getElementById("choices")
/*
iterates over the fetched computers and calls method to add them to select element.
*/
const addComputersToMenu = (computerList) => {
    computerList.forEach(computer => addComputerToMenu(computer))
}
/*
Creates and appends options for each computer to the select element.
*/
const addComputerToMenu = (computer) => {
    const computerElement = document.createElement("option")
    computerElement.value = computer.id 
    computerElement.appendChild(document.createTextNode(computer.title))
    choicesElement.appendChild(computerElement)
}

const computerView = {
    addComputersToMenu,
    addComputerToMenu
}

export default computerView