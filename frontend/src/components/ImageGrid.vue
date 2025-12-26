<script setup>
import { Icon } from '@iconify/vue';
import { ref, watch, computed } from 'vue';

const props = defineProps({
    photos: {
        type: Array,
        default: () => []
    },
    user: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['upload-photo']);

const currentPage = ref(0);
const fileInput = ref(null);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const shortenFileName = (filename) => {
    if (!filename) return 'Sin nombre';
    if (filename.length <= 30) return filename;
    const extension = filename.split('.').pop();
    const name = filename.substring(0, 15);
    return `${name}...${extension ? '.' + extension : ''}`;
};

const getFileExtension = (fileName) => {
    if (!fileName) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const iconMap = {
        'jpg': 'mdi:file-jpg-box',
        'jpeg': 'mdi:file-jpg-box',
        'png': 'mdi:file-png-box',
        'gif': 'mdi:file-gif-box',
        'webp': 'mdi:file-image',
        'bmp': 'mdi:file-image',
        'svg': 'mdi:file-image',
        'default': 'mdi:file'
    };
    return iconMap[ext] || iconMap.default;
};

const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona una imagen.');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert('La imagen es demasiado grande (máximo 10MB)');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;
        emit('upload-photo', {
            base64: base64,
            filename: `${Date.now()}-${file.name}`,
            originalFilename: file.name
        });

        if (fileInput.value) {
            fileInput.value.value = '';
        }
    };
    reader.onerror = () => {
        alert('Error al leer el archivo');
    };
    reader.readAsDataURL(file);
};

const changePage = (page) => {
    const totalPages = Math.ceil(props.photos.length / 20);
    if (page >= 0 && page < totalPages) {
        currentPage.value = page;
    }
};

const visiblePhotos = computed(() => {
    const start = currentPage.value * 20;
    const end = start + 20;
    return props.photos.slice(start, end);
});

watch([() => props.photos, currentPage], () => {
    const start = currentPage.value * 20;
    const end = start + 20;
    visiblePhotos.value = props.photos.slice(start, end);
}, { immediate: true });

const totalPages = computed(() => {
    return Math.ceil(props.photos.length / 20);
});

const getFileSize = (base64) => {
    if (!base64) return '0 KB';
    const stringLength = base64.length - (base64.split(',')[0].length + 1);
    const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;

    if (sizeInBytes < 1024) {
        return `${Math.round(sizeInBytes)} bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
        return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
        return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
};

</script>

<template>
    <!-- Mensaje cuando no hay fotos -->
    <div v-if="photos.length === 0" class="col-12 text-center py-5  h-100">
        <Icon icon="material-symbols-light:hide-image" class="display-1 text-secondary" />
        <h5 class="text-secondary">No hay fotos todavía</h5>
        <p class="text-secondary">¡Sé el primero en subir una foto!</p>
    </div>
    <div class="container text-center"> <!-- grid de las imagenes -->
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 mt-4 mb-2" v-for="(photo, index) in photos" :key="index">
                <div class="card h-100">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <img :src="photo.base64" class="img-fluid mx-auto d-block" alt="Image" width="250px">
                    </div>
                    <div class="card-footer small bg-body-secondary">
                        <div class="row small text-black font-monospace">
                            <span>
                                <Icon icon="mdi:account" class="me-1" />
                                {{ photo.user }}
                            </span>
                            <span class="text-secondary">
                                {{ formatDate(photo.date) }}
                            </span>
                            <p :title="photo.originalFilename || photo.filename">
                                <Icon icon="material-symbols:image" /> {{ photo.originalFilename || photo.filename }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4" v-if="totalPages > 1"> <!-- Paginas -->
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 0 }">
                        <button class="page-link" @click="changePage(currentPage - 1)">Anterior</button>
                    </li>
                    <li class="page-item" v-for="page in totalPages" :key="page"
                        :class="{ active: currentPage === page - 1 }">
                        <button class="page-link" @click="changePage(page - 1)">
                            {{ page }}
                        </button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                        <button class="page-link" @click="changePage(currentPage + 1)">Siguiente</button>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- Contador de fotos -->
        <div class="row mt-2">
            <div class="col-12">
                <p class="text-secondary small">
                    Mostrando {{ visiblePhotos.length }} de {{ photos.length }} fotos
                    <span v-if="totalPages > 1">(Página {{ currentPage + 1 }} de {{ totalPages }})</span>
                </p>
            </div>
        </div>

        <input type="file" ref="fileInput" accept="image/*" @change="handleFileSelect" class="d-none" id="fileInput" />

        <div class="mt-4 mb-5"> <!-- Subir foto -->
            <label for="fileInput" class="btn btn-primary">
                <Icon icon="mdi:upload" class="me-2" />
                Subir Nueva Foto
            </label>
        </div>
    </div>
</template>
<style scoped>
.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>