<template>
  <div>
    <TheHeader></TheHeader>
    <div>
      <RouterView />
    </div>
    <TheFooter id="footer"></TheFooter>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from "./components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter
  },
};
</script>

<style scoped>
* {
  font-family: "Comfortaa", cursive;
}

#footer{
  bottom: 0;
}


</style>
