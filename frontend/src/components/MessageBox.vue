<script setup>
import { Icon } from '@iconify/vue';
import {ref} from 'vue';

const messages = ref(['Hola', 'Cómo estas?', 'Bien gracias por preguntar', 'Hola mundo', 'Adios mundo', 'Chao chao',])
const username = ref("Carlos")
const currentMsg = ref("");

function addMessage(message) {
    console.log(message);
    return messages.value.push(message);
}

</script>
<template>
    <div class="container" v-for="(message, index) in messages.slice(-4)" :key="index">
        <div class="container-fluid ratio-21x9 mb-1 ">
            <textarea name="" id="message" class="bg-blur fw-normal w-100 rounded-4 overflow-y-scroll text-black"
                disabled>   {{ message }}</textarea>
        </div>
    </div>
    <div class=" container">
        <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">
                <Icon icon="material-symbols-light:alternate-email" />
            </span>
            <input type="text" id="msgBox" class="form-control" :placeholder="username" aria-label="Username"
                aria-describedby="addon-wrapping" maxlength="256" v-model="currentMsg">
            <button type="button" class="btn btn-outline-secondary bg-light" @click="addMessage(currentMsg)">
                <Icon icon="mdi:send"/>
            </button>
        </div>
    </div>
    <div>&nbsp</div>
</template>

<style>
.bg-blur {
    /* Making the bg blur */
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    /* Making an outline for my bg */
    border-radius: 5px;
    border: 1.5px solid rgba(255, 255, 255, 0.637);
    position: relative;
    /* Hiding the resizer from the textarea */
    resize: none;
}

.bg-blur::-webkit-scrollbar {
    display: none;
}
</style>