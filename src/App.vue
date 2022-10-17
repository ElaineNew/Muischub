<template>
  <div class="app">
  <Navbar></Navbar>
  <div class="content">
    <router-view/>
  </div>
</div>
</template>


<script>
import Navbar from './components/navbar.vue'
export default {
  components:{Navbar},

}
</script>


<style>
.content{
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
.app {
  min-height: 1000px;
  background: rgba(199, 225, 226,0.5);

}

</style>
