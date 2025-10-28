<template>
  <div class="orders-view">
    <div class="page-header">
      <h1>所有订单</h1>
      <p class="page-description">查看和管理所有订单信息</p>
    </div>
    
    <div class="orders-content">
      <div class="orders-grid">
        <div 
          v-for="order in orders" 
          :key="order.id" 
          class="order-card"
        >
          <div class="order-header">
            <h3>订单 #{{ order.id }}</h3>
            <span class="order-status" :class="order.status">{{ order.statusText }}</span>
          </div>
          
          <div class="order-details">
            <p><strong>客户:</strong> {{ order.customer }}</p>
            <p><strong>产品:</strong> {{ order.product }}</p>
            <p><strong>数量:</strong> {{ order.quantity }}</p>
            <p><strong>总价:</strong> ¥{{ order.totalPrice }}</p>
            <p><strong>下单时间:</strong> {{ order.orderDate }}</p>
          </div>
          
          <div class="order-actions">
            <button class="btn btn-primary">查看详情</button>
            <button class="btn btn-secondary">编辑</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟订单数据
const orders = ref([
  {
    id: '001',
    customer: '张三',
    product: '镜像产品A',
    quantity: 2,
    totalPrice: 199.00,
    orderDate: '2024-01-15 10:30',
    status: 'pending',
    statusText: '待处理'
  },
  {
    id: '002',
    customer: '李四',
    product: '镜像产品B',
    quantity: 1,
    totalPrice: 299.00,
    orderDate: '2024-01-15 14:20',
    status: 'processing',
    statusText: '处理中'
  },
  {
    id: '003',
    customer: '王五',
    product: '镜像产品C',
    quantity: 3,
    totalPrice: 599.00,
    orderDate: '2024-01-14 16:45',
    status: 'completed',
    statusText: '已完成'
  },
  {
    id: '004',
    customer: '赵六',
    product: '镜像产品A',
    quantity: 1,
    totalPrice: 99.50,
    orderDate: '2024-01-14 09:15',
    status: 'cancelled',
    statusText: '已取消'
  }
]);
</script>

<style scoped>
.orders-view {
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

.orders-content {
  max-width: 1200px;
  margin: 0 auto;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
  margin-bottom: 20px;
}

.order-details p {
  margin: 8px 0;
  color: #555;
  font-size: 0.95rem;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

@media (max-width: 768px) {
  .orders-grid {
    grid-template-columns: 1fr;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .order-actions {
    flex-direction: column;
  }
}
</style>
