const loadCity = async function() {
  const response = await fetch("https://geo.api.gouv.fr/communes");
  if(response.status == 200) {
    return response.json()
  }
  else {
    new Error(response.statusText)
  }
  
};
  
  const loadDepartment = async function() {
    const response = await fetch("https://geo.api.gouv.fr/departements");
    if(response.status == 200) {
      return response.json()
    }
    else {
      new Error(response.statusText)
    }
  };
  
  const loadRegion = async function() {
    const response = await fetch("https://geo.api.gouv.fr/regions");
    if(response.status == 200) {
      return response.json()
    }
    else {
      new Error(response.statusText)
    }
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