<template>
  <div class="city-details">
    <!-- Display city details here -->
    <h2>{{ city.name }}</h2>
    <p>Population: {{ city.population }}</p>
    <p>Code Postal: {{ city.cp }}</p>
    <!-- Add other city details as needed -->
  </div>
</template>

<script>
export default {
  name: 'CityDetails',
  props: {
    city: { // Receive the city object as a prop
      type: Object,
      required: true
    }
  },
  // Add any additional logic or methods for the city details page
}
</script>

<style>
/* Add styles for the city details page */
</style>
