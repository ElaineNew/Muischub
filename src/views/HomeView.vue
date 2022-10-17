<template>
  <div class="home">
  <div class="error" v-if="error">Could not fetch the data</div>
    <div v-if="documents" >
      <ListView :playlists="documents"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListView from '@/components/ListView.vue'
import getCollection from '@/composables/getCollection';
export default {
  name: 'HomeView',
  components: {ListView},
  setup(){
    const {documents, error} = getCollection('playlists')
    
    return{documents, error}
  }
}
</script>
