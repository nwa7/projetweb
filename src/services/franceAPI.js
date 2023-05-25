const loadCity = async function() {
  const departments = await loadDepartments();
  const departmentsMap = new Map(departments.map(department => [department.code, department.name]));

  const regions = await loadRegions();
  const regionsMap = new Map(regions.map(region => [region.code, region.name]));

  const response = await fetch("https://geo.api.gouv.fr/communes");
  if (response.status === 200) {
    const cities = await response.json();
    return cities.map(city => ({
      nom: city.nom,
      population: city.population,
      codePostal: city.codesPostaux[0],
      code: city.code,
      localisation: city.localisation,
      codeRegion: city.codeRegion,
      departement: departmentsMap.get(city.codeDepartement),
      region: regionsMap.get(city.codeRegion)
    }));
  } else {
    throw new Error(response.statusText);
  }
};

const loadDepartments = async function() {
  const response = await fetch("https://geo.api.gouv.fr/departements?fields=code,nom");
  if (response.status === 200) {
    const departments = await response.json();
    return departments.map(department => ({
      code: department.code,
      name: department.nom
    }));
  } else {
    throw new Error(response.statusText);
  }
};

const loadRegions = async function() {
  const response = await fetch("https://geo.api.gouv.fr/regions?fields=code,nom");
  if (response.status === 200) {
    const regions = await response.json();
    return regions.map(region => ({
      code: region.code,
      name: region.nom
    }));
  } else {
    throw new Error(response.statusText);
  }
};


export { loadDepartments, loadRegions, loadCity };
