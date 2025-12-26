<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    },
    user: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['send-message', 'upload-photo']);

const currentMsg = ref('');
const showError = ref(false);
const fileInput = ref(null);
const sending = ref(false);

const lastMessages = ref([]);

watch(() => props.messages, () => {
    lastMessages.value = props.messages.slice(0, 4);
}, { immediate: true })

const sendMessage = async () => {
    if (!currentMsg.value.trim()) {
        showError.value = true;
        setTimeout(() => {
            showError.value = false;
        }, 2000)
        return;
    }

    sending.value = true;
    try {
        emit('send-message', currentMsg.value.trim());
        currentMsg.value = '';
    } catch (error) {
        console.error('Error at sending message', error);
    } finally {
        sending.value = false;
    }
};

const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

</script>
<template>
    <div class="container"> <!-- Contenedor principal de los mensajes -->
        <div class="container" v-for="(message, index) in lastMessages" :key="message.id || index">
            <div class="container-fluid">
                <strong class="text-primary">{{ message.user }}</strong>
            </div>
            <div class="container-fluid ratio-21x9 mb-1 mx-auto ">
                <textarea name="" id="message" class="bg-blur fw-normal w-100 rounded-4 overflow-y-scroll text-black"
                    disabled>   {{ message.text }}</textarea>
            </div>
        </div>
        <!-- Para cuando no hay mensajes -->
        <div v-if="lastMessages.length === 0" class="text-center text-light py-3 bg-blur mb-2 w-25 mx-auto">
            <Icon icon="material-symbols-light:chat-outline" class="me-2 my-auto" color="white" />
            No hay mensajes aún
        </div>
        <!-- Mensajes de error -->
        <div v-if="showError" class="alert alert-danger alert-dismissible fade show mt-2 mx-auto w-50" role="alert">
            <strong>Error!</strong>
            <span>
                El mensaje no puede estar vacío.
            </span>
            <button type="button" class="btn-close" @click="showError = false"></button>
        </div>
    </div>
    <div class=" container"> <!-- Contenedor del input-->
        <form @submit.prevent="sendMessage" class="w-100">
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                    <Icon icon="material-symbols-light:upload-file" />
                </span>
                <input type="text" id="msgBox" class="form-control" :placeholder="'Dí algo ' + user"
                    aria-label="Username" aria-describedby="addon-wrapping" maxlength="255" v-model="currentMsg">
                <button type="button" class="btn btn-outline-secondary bg-light" @click="addMessage(currentMsg)">
                    <Icon icon="material-symbols-light:send" />
                </button>
            </div>

            <div class="d-flex justify-content-between mt-1">
                <small class="text-secondary">
                    Usuario: {{ user }}
                </small>
                <small class="text-secondary">
                    {{ currentMsg.length }}/255 carácteres
                </small>
            </div>
        </form>
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