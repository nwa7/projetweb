
<template>

  <header>

      <h1>Villes</h1>
   
  </header>

  <main>
        <getGallery/>

  </main>


</template>

<script>
  import getGallery from './components/gallery.vue';
  export default {
    name : 'App',
    components : {
      getGallery
    }
  }
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    color: #ff85859d;
    background-color: rgb(1, 1, 29);
    min-height: 100vh;
  }
  header{
    min-height: 40vh;
    background: url(./assets/city.jpg) no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow:hidden;
}
h1{
    font-size: 80px;
    color: rgb(1, 1, 29);
    text-transform: uppercase;
}
 .games-gallery{
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  flex-wrap: wrap;
}

</style>