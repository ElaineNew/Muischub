<template>

<div class="error" v-if="error">{{error}}</div>
<!-- playlist infomation -->
<div class="playlist-details" v-if="playlist">
  <div class="playlist-info">
  <div class="cover">
    <img :src="playlist.coverUrl">
  </div>
  <h2>{{playlist.title}}</h2>
  <p class="username">Created by {{playlist.userName}}</p>
  <p class="description">{{playlist.description}}</p>
  <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
</div>
<!-- song list -->
<div class="song-list">
  <div v-if="!playlist.songs.length">No songs has been added in this playlist yet.</div>
  <div class="single-song" v-for="song in playlist.songs" :key="song.id">
    <div class="details">
     <h3>{{song.title}}</h3>
     <p>{{song.artist}}</p>
     <audio controls :src="song.audioUrl">
            <a :href="song.audioUrl"> Download audio </a>
    </audio>
    </div>
    <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
  </div>
  <AddSong v-if="ownership" :playlist="playlist"/>
  <h4>Comments</h4>
  <div v-if="!playlist.comments.length">暂无评论</div>
  <div v-else>
    <div v-for="comment in playlist.comments" :key="comment.id" >
      <div class="comment">
        <span>{{comment.content}}</span>
        <span class="commentUser">--{{comment.commentedBy}}</span>
      </div>
    <button v-if="comment.commentedUserId === user.uid" class="btn" @click="handleDeleteComment(comment.id)">Delete</button>
      
    </div>

  </div>

  <AddComment :playlist="playlist"/>

</div>

</div>
</template>

<script>
import useStorage from '@/composables/useStorage';
import useDocument from '@/composables/useDocument';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import AddSong from '@/components/AddSong.vue';
import AddComment from '@/components/AddComment.vue';


export default {
    props:['id'],
    components:{ AddSong, AddComment },
    setup(props){
      const {document:playlist, error} = getDocument('playlists', props.id)
      const {user} = getUser()
      const {deleteDoc, updateDoc} = useDocument('playlists', props.id)
      const {deleteImage, deleteSong} = useStorage()
      const router = useRouter()

      const ownership = computed(()=>{
        return playlist.value && user.value && user.value.uid == playlist.value.userId
      })

      const commentOwnership = computed(()=>{
       
        return 1
      })


      const handleDelete = async() => {
        await deleteDoc()
        router.push({name: "home"})
        await deleteImage(playlist.value.filePath)
        for(let i = 0; i < playlist.value.songs.length; i++){
          let path = playlist.value.songs[i].filePath
          console.log(path)
          await deleteSong(path)
        }

      }

      const handleClick = async(id) => {
        const songs = playlist.value.songs.filter((song)=>song.id != id)
        const deletedSong = playlist.value.songs.filter((song)=>song.id = id)
        const deletedSongPath = deletedSong[0].filePath
        console.log(deletedSongPath);
        
        await deleteSong(deletedSongPath)
        await updateDoc({songs})
      }

      const handleDeleteComment = async(id) => {
        const comments = playlist.value.comments.filter((comment)=>comment.id != id)
        await updateDoc({comments})
      }



      return {playlist,user, error, ownership, commentOwnership, handleDelete, handleClick, handleDeleteComment}
    }

}
</script>

<style scoped>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    max-width: 120%;
    max-height: 120%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
  .comment{
    display: flex;
  }
  .btn{
    margin: 0;
    display: flex;
    margin-left: auto;
  }
  
  .commentUser{
    color: #a0a0a0;
    margin-left: auto;
  }
</style>