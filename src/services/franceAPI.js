const loadCityData = async function() {
    const response = await fetch("https://geo.api.gouv.fr/communes")
    if (response.status == 200) {
      return response.json()
    } else {
      new Error(response.statusText)
    }
  }
  
  const loadDepartmentData = async function() {
    const response = await fetch("https://geo.api.gouv.fr/departements");
    return response.json();
  };
  
  const loadRegionData = async function() {
    const response = await fetch("https://geo.api.gouv.fr/regions");
    return response.json();
  };
  
  export { loadCityData, loadDepartmentData, loadRegionData };
  