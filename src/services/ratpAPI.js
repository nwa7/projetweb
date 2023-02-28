const getRatpData = async function(){
    const response = await fetch("https://data.ratp.fr/api/v2")
    if (response.status == 200){
        return response.json()
    }
    else {
        new Error(response.statusText)
    }
}
export {getRatpData}