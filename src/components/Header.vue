<script setup>
import { ref } from 'vue';




const navsValue = ref(["标题1", "标题2", "标题3", "标题2", "标题3", "标题2", "标题3", "标题2", "标题3", "标题2", "标题3"]);


</script>

<template>
    <div class="header-container">

        <nav>
            <a class="header-main-icon">XXXX管理系统</a>
            <a class="header-item-menu" v-for="value in navsValue">
                <span> {{ value }}</span>
            </a>
        </nav>
    </div>
</template>

<style>
nav {
    width: 100%;
}

.header-main-icon {
    font-size: large;
    margin-right: 80px;

}

.header-container {


    padding-left: 15px;
    padding-right: 15px;
    background-color: white;
    padding-top: 15px;
    padding-bottom: 15px;
}

.header-item-menu {
    padding-left: 5px;
    padding-right: 5px;
    color: #3c3c43;
}
</style>