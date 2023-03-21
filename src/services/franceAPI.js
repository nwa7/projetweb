const loadCityData = async function() {
  const response = await fetch("https://geo.api.gouv.fr/communes");
  return response.json();
};
  
  const loadDepartmentData = async function() {
    const response = await fetch("https://geo.api.gouv.fr/departements");
    return response.json();
  };
  
  const loadRegionData = async function() {
    const response = await fetch("https://geo.api.gouv.fr/regions");
    return response.json();
  };
  
  
  const  searchCities = async function() {
    if (this.query === "") {
      this.searchResults = [];
      return;
    }

    const response = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${this.query}&fields=nom,codeDepartement,codeRegion`
    );
    const data = await response.json();
    this.searchResults = data;
  };

  
  export { loadCityData, loadDepartmentData, loadRegionData, searchCities };