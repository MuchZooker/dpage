<script setup>
import { ref } from 'vue';
import Order from '@/components/Order.vue';

const data = ref(["Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1", "Data1"]);
</script>

<template>


    <div class="dashboard-container">

        <a class="dashboard-item-container" v-for="value in data">

            <Order></Order>
        </a>
    </div>


</template>
<style>
.dashboard-container {

    display: flex;
    flex-wrap: wrap;
}

.dashboard-item-container {
    padding: 10px 15px;
    border-radius: 5px;
    background-color: white;
    margin: 10px 15px;
}
</style>