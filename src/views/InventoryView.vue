<template>
  <div class="inventory-view">
    <div class="page-header">
      <h1>所有库存</h1>
      <p class="page-description">查看和管理所有库存信息</p>
    </div>
    
    <div class="inventory-stats">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <h3>{{ totalProducts }}</h3>
          <p>总产品数</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <h3>{{ inStockProducts }}</h3>
          <p>有库存</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>{{ lowStockProducts }}</h3>
          <p>库存不足</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">❌</div>
        <div class="stat-content">
          <h3>{{ outOfStockProducts }}</h3>
          <p>缺货</p>
        </div>
      </div>
    </div>
    
    <div class="inventory-content">
      <div class="inventory-filters">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索产品..."
            class="search-input"
          >
        </div>
        <div class="filter-select">
          <select v-model="statusFilter" class="filter-select-input">
            <option value="all">全部状态</option>
            <option value="in-stock">有库存</option>
            <option value="low-stock">库存不足</option>
            <option value="out-of-stock">缺货</option>
          </select>
        </div>
      </div>
      
      <div class="inventory-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
        >
          <div class="product-image">
            <div class="image-placeholder">{{ product.name.charAt(0) }}</div>
          </div>
          
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-details">
              <div class="detail-item">
                <span class="label">库存数量:</span>
                <span class="value" :class="getStockClass(product.stock)">{{ product.stock }}</span>
              </div>
              <div class="detail-item">
                <span class="label">单价:</span>
                <span class="value price">¥{{ product.price }}</span>
              </div>
              <div class="detail-item">
                <span class="label">分类:</span>
                <span class="value">{{ product.category }}</span>
              </div>
            </div>
            
            <div class="product-actions">
              <button class="btn btn-primary">编辑</button>
              <button class="btn btn-secondary">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const statusFilter = ref('all');

// 模拟库存数据
const products = ref([
  {
    id: 1,
    name: '镜像产品A',
    description: '高质量镜像产品，适用于各种场景',
    stock: 150,
    price: 99.00,
    category: '基础产品',
    status: 'in-stock'
  },
  {
    id: 2,
    name: '镜像产品B',
    description: '专业级镜像产品，功能强大',
    stock: 25,
    price: 299.00,
    category: '专业产品',
    status: 'low-stock'
  },
  {
    id: 3,
    name: '镜像产品C',
    description: '企业级镜像产品，稳定可靠',
    stock: 0,
    price: 599.00,
    category: '企业产品',
    status: 'out-of-stock'
  },
  {
    id: 4,
    name: '镜像产品D',
    description: '轻量级镜像产品，快速部署',
    stock: 80,
    price: 199.00,
    category: '基础产品',
    status: 'in-stock'
  },
  {
    id: 5,
    name: '镜像产品E',
    description: '定制化镜像产品，灵活配置',
    stock: 5,
    price: 799.00,
    category: '定制产品',
    status: 'low-stock'
  },
  {
    id: 6,
    name: '镜像产品F',
    description: '开源镜像产品，社区支持',
    stock: 200,
    price: 0.00,
    category: '开源产品',
    status: 'in-stock'
  }
]);

// 计算统计数据
const totalProducts = computed(() => products.value.length);
const inStockProducts = computed(() => products.value.filter(p => p.status === 'in-stock').length);
const lowStockProducts = computed(() => products.value.filter(p => p.status === 'low-stock').length);
const outOfStockProducts = computed(() => products.value.filter(p => p.status === 'out-of-stock').length);

// 过滤产品
const filteredProducts = computed(() => {
  let filtered = products.value;
  
  // 按搜索关键词过滤
  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  // 按状态过滤
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(product => product.status === statusFilter.value);
  }
  
  return filtered;
});

// 获取库存状态样式类
const getStockClass = (stock) => {
  if (stock === 0) return 'out-of-stock';
  if (stock < 30) return 'low-stock';
  return 'in-stock';
};
</script>

<style scoped>
.inventory-view {
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

.inventory-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 15px;
}

.stat-content h3 {
  margin: 0;
  font-size: 2rem;
  color: #333;
  font-weight: 700;
}

.stat-content p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 0.9rem;
}

.inventory-content {
  max-width: 1200px;
  margin: 0 auto;
}

.inventory-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-box {
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.filter-select {
  min-width: 150px;
}

.filter-select-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.product-info {
  padding: 20px;
}

.product-name {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
}

.product-details {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.label {
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

.value {
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
}

.value.price {
  color: #e74c3c;
  font-size: 1.1rem;
}

.value.in-stock {
  color: #28a745;
}

.value.low-stock {
  color: #ffc107;
}

.value.out-of-stock {
  color: #dc3545;
}

.product-actions {
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
  flex: 1;
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
  .inventory-filters {
    flex-direction: column;
  }
  
  .inventory-grid {
    grid-template-columns: 1fr;
  }
  
  .inventory-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
