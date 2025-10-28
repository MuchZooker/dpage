<template>
  <div class="my-orders-view">
    <div class="page-header">
      <h1>我的订单</h1>
      <p class="page-description">查看您个人的订单信息</p>
    </div>
    
    <div class="filter-section">
      <div class="filter-tabs">
        <button 
          v-for="status in statusFilters" 
          :key="status.value"
          @click="activeFilter = status.value"
          class="filter-tab"
          :class="{ active: activeFilter === status.value }"
        >
          {{ status.label }}
        </button>
      </div>
    </div>
    
    <div class="orders-content">
      <div class="orders-list">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id" 
          class="order-item"
        >
          <div class="order-info">
            <div class="order-header">
              <h3>订单 #{{ order.id }}</h3>
              <span class="order-status" :class="order.status">{{ order.statusText }}</span>
            </div>
            
            <div class="order-details">
              <div class="detail-row">
                <span class="label">产品:</span>
                <span class="value">{{ order.product }}</span>
              </div>
              <div class="detail-row">
                <span class="label">数量:</span>
                <span class="value">{{ order.quantity }}</span>
              </div>
              <div class="detail-row">
                <span class="label">总价:</span>
                <span class="value price">¥{{ order.totalPrice }}</span>
              </div>
              <div class="detail-row">
                <span class="label">下单时间:</span>
                <span class="value">{{ order.orderDate }}</span>
              </div>
            </div>
          </div>
          
          <div class="order-actions">
            <button class="btn btn-outline">查看详情</button>
            <button 
              v-if="order.status === 'pending'" 
              class="btn btn-danger"
            >
              取消订单
            </button>
            <button 
              v-if="order.status === 'completed'" 
              class="btn btn-success"
            >
              再次购买
            </button>
          </div>
        </div>
        
        <div v-if="filteredOrders.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>暂无订单</h3>
          <p>您还没有相关状态的订单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 状态筛选选项
const statusFilters = [
  { label: '全部', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
];

const activeFilter = ref('all');

// 模拟我的订单数据
const myOrders = ref([
  {
    id: '001',
    product: '镜像产品A',
    quantity: 2,
    totalPrice: 199.00,
    orderDate: '2024-01-15 10:30',
    status: 'pending',
    statusText: '待处理'
  },
  {
    id: '002',
    product: '镜像产品B',
    quantity: 1,
    totalPrice: 299.00,
    orderDate: '2024-01-15 14:20',
    status: 'processing',
    statusText: '处理中'
  },
  {
    id: '003',
    product: '镜像产品C',
    quantity: 3,
    totalPrice: 599.00,
    orderDate: '2024-01-14 16:45',
    status: 'completed',
    statusText: '已完成'
  },
  {
    id: '004',
    product: '镜像产品A',
    quantity: 1,
    totalPrice: 99.50,
    orderDate: '2024-01-14 09:15',
    status: 'cancelled',
    statusText: '已取消'
  },
  {
    id: '005',
    product: '镜像产品D',
    quantity: 2,
    totalPrice: 399.00,
    orderDate: '2024-01-13 11:20',
    status: 'completed',
    statusText: '已完成'
  }
]);

// 根据筛选条件过滤订单
const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') {
    return myOrders.value;
  }
  return myOrders.value.filter(order => order.status === activeFilter.value);
});
</script>

<style scoped>
.my-orders-view {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.page-description {
  color: #666;
  font-size: 1.1rem;
}

.filter-section {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.filter-tabs {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-tab {
  padding: 10px 20px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  background-color: #f8f9fa;
}

.filter-tab.active {
  background-color: #007bff;
  color: white;
}

.orders-content {
  max-width: 800px;
  margin: 0 auto;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.order-info {
  flex: 1;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.order-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.order-status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.order-status.processing {
  background-color: #d1ecf1;
  color: #0c5460;
}

.order-status.completed {
  background-color: #d4edda;
  color: #155724;
}

.order-status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.order-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
  font-weight: 600;
}

.value.price {
  color: #e74c3c;
  font-size: 1.1rem;
}

.order-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 100px;
}

.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 10px;
}

.empty-state p {
  color: #666;
}

@media (max-width: 768px) {
  .order-item {
    flex-direction: column;
  }
  
  .order-actions {
    margin-left: 0;
    margin-top: 15px;
    flex-direction: row;
  }
  
  .order-details {
    grid-template-columns: 1fr;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
  }
}
</style>
