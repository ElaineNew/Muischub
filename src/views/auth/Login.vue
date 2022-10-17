<template>
  <form action="" @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{error}}</div>
    <button v-if="!isPending">log in</button>
    <button v-if="isPending" disabled>loading</button>
  </form>
</template>

<script>
    import {ref} from 'vue'
    import useLogin from '@/composables/useLogin';
    import { useRouter } from 'vue-router';
export default {
    setup(){
        const {error, login, isPending} = useLogin()
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const handleSubmit = async ()=> {
            const res = await login(email.value, password.value)
            if(!error.value){
                console.log('user logged in');
                router.push({name: "UserPlaylists"})
            }
        }
        return {error, login, email, password, handleSubmit, isPending}
    }

}
</script>

<style>

</style>