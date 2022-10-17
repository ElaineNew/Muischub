<template>
<div class="add-song">
    <button v-if="!showForm" @click="showForm=true" >Add Songs</button>
    <form @submit.prevent="handleSubmit" v-if="showForm">
        <h4>Add a New Song</h4>
        <input type="text" placeholder="Song title" required v-model="title">
        <input type="text" placeholder="Artist" required v-model="artist">
        <label>Upload audio file</label>
        <input type="file" @change="handleChange">
        <div class="error" v-if="fileError">{{fileError}}</div>
        <button v-if="!isPending">Add</button>
    <button v-else disabled>Saving...</button>
    </form>
</div>  

</template>

<script>
import {ref} from 'vue'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'


export default {
    props:['playlist'],

    setup(props){
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)
        const {updateDoc} = useDocument('playlists', props.playlist.id)
        const {url, filePath, uploadSong} = useStorage()
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)


        const handleSubmit = async () => {
            isPending.value = true
            await uploadSong(file.value)
            const newSong = {
                title: title.value,
                artist: artist.value,
                audioUrl: url.value,
                filePath:filePath.value,
                id: Math.floor(Math.random() * 1000000)
            }
            console.log(newSong);
            const res = await updateDoc({
                songs:[...props.playlist.songs, newSong],
            })
            title.value = ''
            artist.value = ''
            file.value = null
            isPending.value = false

        }

        //allow file types
        const types = ['audio/mp3','audio/mpeg']
        const handleChange = (e) => {
        const selected = e.target.files[0]
        console.log(selected);

        if(selected && types.includes(selected.type)){
            file.value = selected
            fileError.value = null
        }else{
            file.value = null
            fileError.value = 'File type must be "mp3"'
        }
        }

        return {title, artist, showForm, handleSubmit, handleChange, fileError, isPending}
    }

}
</script>

<style scoped>
    .add-song{
        text-align: center;
        margin-top: 40px;
    }
    form{
        min-width: 100%;
        text-align: left;
    }
</style>