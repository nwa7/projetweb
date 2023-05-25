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

<script>
import {loadCity, loadDepartment, loadRegion, searchCities } from './services/franceAPI.js';
//import {getGallery} from './components/gallery.vue';

export default {
  data() {
    return {
      query: "",
      searchResults: [],
      departments: [],
      regions: [],
      cityData: [],
      selectedCity: null,
    };
  },
  
  methods: {
    searchCities,

    getDepartmentName(code) {
      return this.departments.find((dept) => dept.code === code)?.nom || "Unknown";
    },
    getRegionName(code) {
      return this.regions.find((region) => region.code === code)?.nom || "Unknown";
    },
    displayImage(city) {
      this.selectedCity = city;
    },
  },

  async mounted() {
    try {
      this.departments = await loadDepartment();
      this.regions = await loadRegion();
      this.cityData = await loadCity();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<template>
  <div>
    <label for="search">Sélectionner une ville française :</label>
    <input type="text" id="search" v-model="query" @input="searchCities" />
    <div class="city-list" v-if="searchResults.length">
      <div v-for="(result, index) in searchResults" :key="result.code" :class="{ 'city-item': true, 'first-in-row': index % 5 === 0 }">
        <div class = "card-box">
        <div class="city-image-container">
          <img class="city-image" src="@/assets/city.jpg" alt="City">
          </div>
        <div class="city-details">
          <div class="city-name">{{ result.nom }}</div>
          <div class="city-location">{{ getDepartmentName(result.codeDepartement) }} - {{ getRegionName(result.codeRegion) }}</div>
          </div>
        </div>
      </div>
    </div>
    <p v-else>...</p>
  </div>
</template>

<style>
.city-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.city-item {
  width: 19%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-box {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  margin-top:10px;
  align-items: center;
  justify-content: center;
  background: #ff85859d;
  border-radius: 0% 0% 5% 5%;
  box-shadow:
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
}

.card-box:hover {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  background: #ff60609d;
  border-radius: 0% 0% 5% 5%;
  box-shadow:
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
}

.first-in-row {
  margin-left: 0;
}
.city-image-container {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
}
.city-image {
  width: 100%;
  max-height: 100%;
}
.city-details {
  font-family: 'Noticia Text', serif;
  text-align: center;
  font-size: 14px;
}
.city-name {
  font-family: 'Staatliches', cursive;
  letter-spacing: 1px;
  font-size : 20px;
  margin-bottom: 5px;
  margin-left:2px;
  margin-right:2px;
}
.city-location {
  color: #666666;
}
</style>


franceAPI 
const loadCity = async function() {
  const response = await fetch("https://geo.api.gouv.fr/communes");
  if(response.status == 200) {
    return response.json()
  }
  else {
    new Error(response.statusText)
  }
  console.log(response)
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