let endpoint = "https://hickory-quilled-actress.glitch.me/"
let computers = []
/*
Api call to fetch all the computers from the server, parses json and returns
the list of computers.
*/
async function getComputers() {
    try {
        const response = await fetch(endpoint + "computers")
        computers = await response.json()
        console.log(computers)
        return computers
         

    } catch (error) {
        console.error("Something went wrong ", error)
    }
}

export default getComputers