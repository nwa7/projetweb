
<template>

  <header>

      <h1>Villes</h1>
   
  </header>

  <main>
        <Gallery />


  </main>


</template>

<script>
  import getGallery from './components/gallery.vue';
  export default {
    name : 'App',
    components : {
      getGallery(); 
    }
  }
</script>

<style>
</style>