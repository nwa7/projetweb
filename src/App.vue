
<template>

  <header>

      <h1>Hello World</h1>
   
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
      Gallery 
    }
  }
</script>

<style>
</style>