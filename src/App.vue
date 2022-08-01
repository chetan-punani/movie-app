<template>
  <div>
    <div id="navbar">
      <div class="nav-brand">
        <div id="menu">
          <h2><RouterLink to="/">MovieFelx</RouterLink></h2>
        </div>
        <i class="fa fa-navicon" v-on:click="display"></i>
      </div>

      <div class="bar-items" :class="{ hide: !show }">
        <div id="menu">
          <RouterLink to="/"> Home </RouterLink>

          <RouterLink to="/about"> About </RouterLink>

          <RouterLink to="/service"> Service </RouterLink>

          <RouterLink to="/contact"> Contact Us </RouterLink>
        </div>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script>
export default {
  data() {
    return {
    
      show: false,
    };
  },
  methods: {
    display() {
      this.show = !this.show;
    },
   
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"); */

body {
  margin: 0;
  padding: 0;
  font-family: "Lato", sans-serif;
}
h1 {
  text-align: center;
  font-size: 36px;
  text-transform: capitalize;
}
h2 {
  padding-left: 15px;
  color: #fff;
  margin: 0;
}

#navbar {
  display: flex;
  align-items: center;
  background-color: #2d2d58;
  width: 100%;
}

#menu { 
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  margin: 0;
  padding: 0;
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
