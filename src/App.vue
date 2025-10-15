<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';
</script>

<template>

  <!-- <Header></Header> -->
  <div class="navigation-left-container">
    <Navigation></Navigation>
  </div>

  <div class="content-contaienr">
    <RouterView />
  </div>



</template>

<style scoped>
.navigation-left-container {
  width: 250px;
  height: 100%;
  background-color: white;
}

.content-contaienr {
  /* 铺满剩余宽度 */
  flex-grow: 1;
}
</style>
