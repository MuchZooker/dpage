<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from '../components/Navigation.vue';
</script>
<template>
    <div class="app-container">
        <div class="navigation-left-container">
            <Navigation></Navigation>
        </div>

        <div class="content-container">
            <RouterView />
        </div>
    </div>
</template>

<style>
.app-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

.navigation-left-container {
    width: 280px;
    min-width: 280px;
    height: 100vh;
    background-color: transparent;
    flex-shrink: 0;
}

.content-container {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    background-color: #f5f5f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .app-container {
        flex-direction: column;
    }

    .navigation-left-container {
        width: 100%;
        height: auto;
        min-width: unset;
    }

    .content-container {
        height: calc(100vh - 200px);
    }
}
</style>
