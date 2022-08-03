<template>
<div>
  <h1>More Movies</h1>
  <h3>{{ category }}</h3>
</div>
  
</template>


<script>
export default{
   name: 'moremovies',
   props: ["category"],
}
</script>

