<template>
  <div class="my-inventory-view">
    <div class="page-header">
      <h1>我的库存</h1>
      <p class="page-description">管理您个人的库存信息</p>
    </div>
    
    <div class="inventory-summary">
      <div class="summary-card">
        <div class="summary-icon">📊</div>
        <div class="summary-content">
          <h3>{{ myProducts.length }}</h3>
          <p>我的产品总数</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon">💰</div>
        <div class="summary-content">
          <h3>¥{{ totalValue.toFixed(2) }}</h3>
          <p>库存总价值</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon">📈</div>
        <div class="summary-content">
          <h3>{{ averagePrice.toFixed(2) }}</h3>
          <p>平均单价</p>
        </div>
      </div>
    </div>
    
    <div class="inventory-content">
      <div class="inventory-toolbar">
        <div class="search-section">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索我的产品..."
            class="search-input"
          >
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" @click="showAddModal = true">
            <span class="btn-icon">➕</span>
            添加产品
          </button>
          <button class="btn btn-secondary" @click="exportInventory">
            <span class="btn-icon">📤</span>
            导出库存
          </button>
        </div>
      </div>
      
      <div class="inventory-list">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="inventory-item"
        >
          <div class="product-main">
            <div class="product-image">
              <div class="image-placeholder">{{ product.name.charAt(0) }}</div>
            </div>
            
            <div class="product-details">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              
              <div class="product-meta">
                <div class="meta-item">
                  <span class="meta-label">库存:</span>
                  <span class="meta-value" :class="getStockClass(product.stock)">{{ product.stock }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">单价:</span>
                  <span class="meta-value price">¥{{ product.price }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">总价值:</span>
                  <span class="meta-value">¥{{ (product.stock * product.price).toFixed(2) }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">添加时间:</span>
                  <span class="meta-value">{{ product.addedDate }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="product-actions">
            <button class="action-btn edit-btn" @click="editProduct(product)">
              <span class="btn-icon">✏️</span>
              编辑
            </button>
            <button class="action-btn stock-btn" @click="adjustStock(product)">
              <span class="btn-icon">📦</span>
              调整库存
            </button>
            <button class="action-btn delete-btn" @click="deleteProduct(product.id)">
              <span class="btn-icon">🗑️</span>
              删除
            </button>
          </div>
        </div>
        
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <div class="empty-icon">📦</div>
          <h3>暂无库存</h3>
          <p>您还没有添加任何产品到库存中</p>
          <button class="btn btn-primary" @click="showAddModal = true">
            添加第一个产品
          </button>
        </div>
      </div>
    </div>
    
    <!-- 添加产品模态框 -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>添加新产品</h3>
          <button class="modal-close" @click="showAddModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>产品名称</label>
            <input v-model="newProduct.name" type="text" class="form-input">
          </div>
          <div class="form-group">
            <label>产品描述</label>
            <textarea v-model="newProduct.description" class="form-textarea"></textarea>
          </div>
          <div class="form-group">
            <label>库存数量</label>
            <input v-model.number="newProduct.stock" type="number" class="form-input">
          </div>
          <div class="form-group">
            <label>单价</label>
            <input v-model.number="newProduct.price" type="number" step="0.01" class="form-input">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showAddModal = false">取消</button>
          <button class="btn btn-primary" @click="addProduct">添加产品</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showAddModal = ref(false);
const searchQuery = ref('');

// 新产品表单
const newProduct = ref({
  name: '',
  description: '',
  stock: 0,
  price: 0
});

// 模拟我的库存数据
const myProducts = ref([
  {
    id: 1,
    name: '我的镜像产品A',
    description: '个人定制的镜像产品',
    stock: 50,
    price: 99.00,
    addedDate: '2024-01-10',
    status: 'in-stock'
  },
  {
    id: 2,
    name: '我的镜像产品B',
    description: '个人开发的专业镜像',
    stock: 15,
    price: 299.00,
    addedDate: '2024-01-12',
    status: 'low-stock'
  },
  {
    id: 3,
    name: '我的镜像产品C',
    description: '企业级个人镜像',
    stock: 0,
    price: 599.00,
    addedDate: '2024-01-08',
    status: 'out-of-stock'
  },
  {
    id: 4,
    name: '我的镜像产品D',
    description: '轻量级个人镜像',
    stock: 30,
    price: 199.00,
    addedDate: '2024-01-14',
    status: 'in-stock'
  }
]);

// 计算统计数据
const totalValue = computed(() => {
  return myProducts.value.reduce((total, product) => {
    return total + (product.stock * product.price);
  }, 0);
});

const averagePrice = computed(() => {
  if (myProducts.value.length === 0) return 0;
  const totalPrice = myProducts.value.reduce((total, product) => total + product.price, 0);
  return totalPrice / myProducts.value.length;
});

// 过滤产品
const filteredProducts = computed(() => {
  if (!searchQuery.value) return myProducts.value;
  
  return myProducts.value.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 获取库存状态样式类
const getStockClass = (stock) => {
  if (stock === 0) return 'out-of-stock';
  if (stock < 20) return 'low-stock';
  return 'in-stock';
};

// 添加产品
const addProduct = () => {
  if (!newProduct.value.name || !newProduct.value.description) {
    alert('请填写产品名称和描述');
    return;
  }
  
  const product = {
    id: Date.now(),
    name: newProduct.value.name,
    description: newProduct.value.description,
    stock: newProduct.value.stock || 0,
    price: newProduct.value.price || 0,
    addedDate: new Date().toISOString().split('T')[0],
    status: newProduct.value.stock > 20 ? 'in-stock' : newProduct.value.stock > 0 ? 'low-stock' : 'out-of-stock'
  };
  
  myProducts.value.push(product);
  
  // 重置表单
  newProduct.value = {
    name: '',
    description: '',
    stock: 0,
    price: 0
  };
  
  showAddModal.value = false;
};

// 编辑产品
const editProduct = (product) => {
  console.log('编辑产品:', product);
  // 这里可以打开编辑模态框
};

// 调整库存
const adjustStock = (product) => {
  console.log('调整库存:', product);
  // 这里可以打开库存调整模态框
};

// 删除产品
const deleteProduct = (productId) => {
  if (confirm('确定要删除这个产品吗？')) {
    const index = myProducts.value.findIndex(p => p.id === productId);
    if (index > -1) {
      myProducts.value.splice(index, 1);
    }
  }
};

// 导出库存
const exportInventory = () => {
  console.log('导出库存');
  // 这里可以实现导出功能
};
</script>

<style scoped>
.my-inventory-view {
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

.inventory-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
}

.summary-icon {
  font-size: 2.5rem;
  margin-right: 15px;
}

.summary-content h3 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
  font-weight: 700;
}

.summary-content p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 0.9rem;
}

.inventory-content {
  max-width: 1000px;
  margin: 0 auto;
}

.inventory-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-section {
  flex: 1;
  max-width: 400px;
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

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
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

.btn-icon {
  font-size: 1rem;
}

.inventory-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inventory-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.inventory-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-main {
  display: flex;
  flex: 1;
  gap: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.image-placeholder {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.product-details {
  flex: 1;
}

.product-name {
  margin: 0 0 8px 0;
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

.product-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-label {
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

.meta-value {
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
}

.meta-value.price {
  color: #e74c3c;
  font-size: 1.1rem;
}

.meta-value.in-stock {
  color: #28a745;
}

.meta-value.low-stock {
  color: #ffc107;
}

.meta-value.out-of-stock {
  color: #dc3545;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;
}

.action-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 120px;
  justify-content: center;
}

.edit-btn {
  background-color: #17a2b8;
  color: white;
}

.edit-btn:hover {
  background-color: #138496;
}

.stock-btn {
  background-color: #28a745;
  color: white;
}

.stock-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
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
  margin-bottom: 20px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-textarea {
  height: 80px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .inventory-toolbar {
    flex-direction: column;
    gap: 15px;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: center;
  }
  
  .inventory-item {
    flex-direction: column;
  }
  
  .product-main {
    flex-direction: column;
    gap: 15px;
  }
  
  .product-actions {
    margin-left: 0;
    margin-top: 15px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .product-meta {
    grid-template-columns: 1fr;
  }
}
</style>
