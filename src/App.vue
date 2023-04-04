<script>
import {loadDepartment, loadRegion, searchCities } from './services/franceAPI.js';
import {getCityData } from './city.js';

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
      this.cityData = await getCityData();
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
        <div class="city-image-container">
          <img class="city-image" src="@/assets/city.jpg" alt="City">
        </div>
        <div class="city-details">
          <div class="city-name">{{ result.nom }}</div>
          <div class="city-location">{{ getDepartmentName(result.codeDepartement) }} - {{ getRegionName(result.codeRegion) }}</div>
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
.first-in-row {
  margin-left: 0;
}
.city-image-container {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.city-image {
  max-width: 100%;
  max-height: 100%;
}
.city-details {
  font-family: 'Noticia Text', serif;
  text-align: center;
  font-size: 14px;
}
.city-name {
  font-family: 'Staatliches', cursive;
  font-weight: bold;
  letter-spacing: 1px;
  font-size : 20px;
  margin-bottom: 5px;
}
.city-location {
  color: #666;
}
</style>
