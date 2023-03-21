const loadCity = async function() {
  const response = await fetch("https://geo.api.gouv.fr/communes");
  return response.json();
};
  
  const loadDepartment = async function() {
    const response = await fetch("https://geo.api.gouv.fr/departements");
    return response.json();
  };
  
  const loadRegion = async function() {
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

  
  export { loadCity, loadDepartment, loadRegion, searchCities };