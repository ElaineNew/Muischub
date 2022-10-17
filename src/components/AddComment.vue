<template>

<form class="leave-comment" @submit.prevent="handleSubmit">        
    <label>写评论</label>
    <input type="textarea" placeholder="评论一下吧……" v-model ="userComment" required>
    <button v-if="!isPending">Leave a comment</button>
    <button v-if="isPending" disabled>Saving</button>
</form>

</template>

<script>
import {ref} from 'vue'
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/getUser';
export default {
    props: ['playlist'],
    setup(props){
        const userComment = ref('')
        const {user} = getUser()
        const {addComment, isPending, error} = useDocument('playlists', props.playlist.id)

        const handleSubmit = async() => {
        const newComment = {
            content: userComment.value,
            commentedBy: user.value.displayName,
            commentedUserId: user.value.uid,
            id: Math.floor(Math.random() * 1000000)

        }
            console.log(newComment);
            console.log(user.value.uid);
            await addComment({
                comments:[...props.playlist.comments, newComment],
            })
            userComment.value = ''
        }

        return { handleSubmit, isPending, error, userComment}
    }

}
</script>

<style scoped>
.leave-comment{
        display: contents;
    }
</style>