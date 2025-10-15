<script setup>
import { ref } from 'vue';




// const navis = ref(["首页", "订单", "库存"]);//导航显示内容

const navis = ref([{ title: "首页", id: "1-0" }
    , { title: "订单", id: "2-0", children: [{ title: "所有订单", id: "2-1" }, { title: "我的订单", id: "2-2" }] }
    , { title: "库存", id: "3-0", children: [{ title: "所有库存", id: "3-1" }, { title: "我的库存", id: "3-2" }] }
]);//导航显示内容
</script>



<template>


    <aside>
        <ul>
            <template v-for="data in navis">

                <li class="navigation-item-container">{{ data.title }}</li>

                <ul v-for="value in data.children">
                    <li class="navigation-item-container">{{ value.title }}</li>
                </ul>

            </template>
        </ul>
    </aside>

</template>

<style scoped>
.navigation-item-container {
    padding: 5px 10px;
}
</style>