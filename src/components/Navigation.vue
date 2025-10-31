<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

// 导航菜单配置
const navis = ref([
  {
    title: "首页",
    id: "1-0",
    path: "/home/order-template",
    icon: "🏠"
  },
  {
    title: "订单",
    id: "2-0",
    children: [
      { title: "所有订单", id: "2-1", path: "/home/orders" },
      { title: "我的订单", id: "2-2", path: "/home/my-orders" },
      { title: "订单模板", id: "2-3", path: "/home/order-template" }
    ],
    icon: "📋"
  },
  // {
  //   title: "库存",
  //   id: "3-0",
  //   children: [
  //     { title: "所有库存", id: "3-1", path: "/inventory" },
  //     { title: "我的库存", id: "3-2", path: "/my-inventory" }
  //   ],
  //   icon: "📦"
  // }
]);

// 控制子菜单展开/收起
const expandedItems = ref(new Set());

const toggleExpanded = (itemId) => {
  if (expandedItems.value.has(itemId)) {
    expandedItems.value.delete(itemId);
  } else {
    expandedItems.value.add(itemId);
  }
};

const isActive = (path) => {
  return route.path === path;
};
</script>



<template>
  <aside class="navigation-sidebar">
    <div class="navigation-header">
      <h2>XX</h2>
    </div>

    <nav class="navigation-menu">
      <ul class="menu-list">
        <template v-for="item in navis" :key="item.id">
          <!-- 有子菜单的项目 -->
          <li v-if="item.children" class="menu-item has-children">
            <div class="menu-item-header" @click="toggleExpanded(item.id)"
              :class="{ active: expandedItems.has(item.id) }">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-title">{{ item.title }}</span>
              <span class="menu-arrow" :class="{ expanded: expandedItems.has(item.id) }">▼</span>
            </div>

            <ul v-show="expandedItems.has(item.id)" class="submenu">
              <li v-for="child in item.children" :key="child.id" class="submenu-item">
                <RouterLink :to="child.path" class="submenu-link" :class="{ active: isActive(child.path) }">
                  {{ child.title }}
                </RouterLink>
              </li>
            </ul>
          </li>

          <!-- 没有子菜单的项目 -->
          <li v-else class="menu-item">
            <RouterLink :to="item.path" class="menu-link" :class="{ active: isActive(item.path) }">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-title">{{ item.title }}</span>
            </RouterLink>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.navigation-sidebar {
  height: 100vh;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  background: white;
  border-right: 1px solid var(--color-border-2);
  box-shadow: none;
  box-shadow: initial;
}

.navigation-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.navigation-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
}

.navigation-menu {
  flex: 1;
  padding: 20px 0;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  margin-bottom: 5px;
}

.menu-link,
.menu-item-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.menu-link:hover,
.menu-item-header:hover {
  background: rgba(255, 255, 255, 0.1);
  /* color: white; */
  border-left-color: #ffd700;
}

.menu-link.active,
.menu-item-header.active {
  background: rgba(255, 255, 255, 0.2);
  /* color: white; */
  border-left-color: #ffd700;
}

.menu-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.menu-title {
  flex: 1;
  font-weight: 500;
}

.menu-arrow {
  transition: transform 0.3s ease;
  font-size: 0.8rem;
}

.menu-arrow.expanded {
  transform: rotate(180deg);
}

.submenu {
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.1);
  color: black;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submenu-item {
  margin: 0;
}

.submenu-link {
  display: block;
  padding: 10px 20px 10px 50px;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  border-left: 3px solid transparent;
}

.submenu-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgb(21, 122, 236);
  border-left-color: #ffd700;
}

.submenu-link.active {
  background: rgba(255, 255, 255, 0.15);
  color: rgb(21, 122, 236);
  border-left-color: #ffd700;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navigation-sidebar {
    width: 100%;
    height: auto;
  }

  .menu-link,
  .menu-item-header {
    padding: 15px 20px;
  }

  .submenu-link {
    padding: 12px 20px 12px 50px;
  }
}
</style>