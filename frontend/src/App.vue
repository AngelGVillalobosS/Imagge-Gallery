<script setup>
import ImageGrid from './components/ImageGrid.vue';
import MessageBox from './components/MessageBox.vue';
import NavBar from './components/NavBar.vue';
import {onMounted, onUnmounted, ref} from 'vue';
import * as api from  './services/api.js'

const currentUser = ref('');
const photos = ref([]);
const messages = ref([]);
const loading = ref(false);

let messagePollingInterval = null;

const selectUser = async() => {
  try{
    const response = await api.getRandomUser();
    if (response.success) {
      currentUser.value = response.user;
      console.log('Selected user: ', currentUser.value);
    } else{
      currentUser.value = 'Usuario';
      console.log('Using default user');
    }
  } catch(e){
    console.error('Error getting the user', e);
    currentUser.value = 'User';
  }
};

const checkServerHealth = async () => {
  try{
    const health = await api.checkServerHealth();
    console.log('Server status: ', health);
    return health.success === 'OK';
  } catch(e){
    console.error('The server isnt aviable', e);
    return false;
  }
};

onMounted(async () => {
  console.log('Starting app...');

  // Verificar servidor
  const isServerOK = await checkServerHealth();
  if (!isServerOK) {
    alert('Server is not aviable, be sure it runs on: http://localhost:3000');
  }

  // Inicializar datos
  await selectUser();
  startMessagePolling();

  console.log('Aplicación inicializada correctamente');
});

onUnmounted(() => {
  if (messagePollingInterval) {
    clearInterval(messagePollingInterval);
    console.log('Message polling stopped');
  }
});
</script>

<template>
  <nav class="sticky-top">
    <NavBar />
  </nav>
  <div class="container">
    <ImageGrid />
    <div class="sticky-md-bottom">
      <MessageBox
        :messages="messages"
        :user="currentUser"
        @send-message="handleSendMessage"
        @upload-photo="handleUploadPhoto"
      />
    </div>
  </div>
</template>

<style scoped></style>
