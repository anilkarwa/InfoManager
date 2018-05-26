<template>
  <div>
    <!-- <header>
      <span>Vue.js PWA</span>
    </header> -->
    <!-- <main> -->
      <!-- <img src="./assets/logo.png" alt="Vue.js PWA"> -->
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    <!-- </main> -->
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
export default {
  name: 'app'
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.7s, transform 0.7s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

/* body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
} */
</style>
