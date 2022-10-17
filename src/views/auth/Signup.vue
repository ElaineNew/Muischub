<template>
  <form action="" @submit.prevent="handleSubmit">
    <input type="text" placeholder="Display Name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{error}}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>loading</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const {error, signup, isPending} = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        
        const handleSubmit = async ()=> {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                console.log('user signed up');
                router.push({name: "UserPlaylists"})

            }
        }
        return {error, email, password,displayName, handleSubmit, isPending}
    }

}
</script>

<style>

</style>