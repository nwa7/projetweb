<template>
  <div id="app">
    <header>
      <h1>Villes de France</h1>
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
      <h5>Elia ROARD 2023</h5>
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
    color: #ff8585;
    background-color: rgb(1, 1, 29);
    min-height: 100vh;
  }
header{
  min-height: 40vh;
  background: url(./assets/city.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow:hidden;
}
footer{
  text-align:right;
  padding-bottom:5px;
  padding-right:20px;
}
h1{
    font-size: 80px;
    margin-top:20%;
    color: rgb(1, 1, 29);
    text-transform: uppercase;
}
.cities-gallery{
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  flex-wrap: wrap;
}
nav {
  background-color: rgb(1, 1, 29);
  padding: 10px;
}

nav a {
  color: #ff8585;
  text-decoration: none;
  margin: 0 10px;
  font-size: 18px;
}

nav a:hover {
  color: #a12f2f;
}


</style>
