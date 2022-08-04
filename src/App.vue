<template>
  <div>
    <TheHeader id="header"></TheHeader>
    <div class="content">
      <RouterView />
    </div>
    <TheFooter></TheFooter>
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

#navbar {
  display: flex;
  align-items: center;
  background-color: #131a27;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
}

#header + .content {
  padding-top: 80px;
}

#menu {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
}

#title {
  text-align: center;
  font-size: 26px;
  text-transform: capitalize;
  padding-left: 15px;
  color: #fff;
}

.bar-items {
  width: 100%;
}

a {
  padding: 20px;
}

li:hover {
  background-color: #8d99cf;
}

a {
  text-decoration: none;
  font-size: 18px;
  color: #fff;
}

.fa {
  display: none;
}

@media (max-width: 675px) {
  #navbar {
    flex-direction: column;
  }

  .fa {
    display: block;
    padding: 0 25px;
    position: absolute;
    right: 0;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
  }

  #menu {
    flex-direction: column;
    padding: 5px 0;
  }

  a {
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }

  .hide {
    display: none;
  }
  .nav-brand {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0px;
    background-color: #2d2d58;
  }
}
</style>
