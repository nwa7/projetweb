<script>
import {loadDepartmentData, loadRegionData, searchCities } from './services/franceAPI.js';

export default {
  data() {
    return {
      query: "",
      searchResults: [],
      departments: [],
      regions: [],
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
  },

async mounted() {
  try {
    this.departments = await loadDepartmentData();
    this.regions = await loadRegionData();
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
    <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.code">
        {{ result.nom }} ({{ getDepartmentName(result.codeDepartement) }} - {{ getRegionName(result.codeRegion) }})
      </li>
    </ul>
    <p v-else> ... </p>
  </div>
</template>

