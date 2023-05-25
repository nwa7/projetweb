<template>
  <div id="app">
    <header>
      <h1>Villes</h1>
    </header>
    <nav>
      <router-link to="/"> Présentation </router-link>

      <router-link to="/gallery"> Galerie </router-link>

      <router-link to="/game"> Jeu </router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
  <footer>
      <h2>Fin de la page</h2>
    </footer>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterLink
  }
};
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
 .cities-gallery{
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  flex-wrap: wrap;
}

</style>
