<script setup>
import { Icon } from "@iconify/vue";
const images = [
    "https://cdn-icons-png.flaticon.com/512/9584/9584876.png",
    "https://cdn-icons-png.flaticon.com/512/10278/10278187.png",
    "https://cdn.pixabay.com/photo/2025/10/07/10/59/parrot-9878922_1280.jpg",
    "https://images.pexels.com/photos/237266/pexels-photo-237266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
]

// console.log(images[0]);

</script>

<template>
    <div class="container text-center">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 mt-4 mb-2" v-for="(image, index) in images" :key="index">
                <div class="card h-100">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <img :src="image" class="img-fluid mx-auto d-block" alt="Image" width="250px">
                    </div>
                    <div class="card-footer small bg-body-secondary">
                        <div class="row small text-black font-monospace">
                            <p class="">{{ image }}</p>
                        </div>
                        <div class="row small">
                            <Icon icon="mdi:file" style="color: gray" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link">Anterior</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Siguiente</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>