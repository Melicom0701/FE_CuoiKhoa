<script setup>
import {  computed } from 'vue';
import NavBar from './components/layout/NavBar.vue';
import SideBar from './components/layout/SideBar.vue';
import { useRoute } from 'vue-router';

const excludedRoutes = ['login', 'register','reset-pass'];

const shouldShowNavigation = computed(() => {
  const route = useRoute();
  return !excludedRoutes.includes(route.name);
});
</script>

<template>
  <main>
    <div>
      <Notifications :duration="10000" :closeOnClick="true" :reverse="true"/>
      <!-- Sử dụng v-if để kiểm tra điều kiện shouldShowNavigation -->
      <template v-if="shouldShowNavigation">
        <NavBar></NavBar>
        <Side-bar></Side-bar>
      </template>
      
      <div >
        <RouterView/>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  line-height: 1.5;
  display: block;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
