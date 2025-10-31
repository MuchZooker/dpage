<!-- src/views/OrderTemplateDetailsView.vue -->
<template>
    <div class="order-template-details-view">

        <!-- 多行数据输入区域 -->
        <div class="items-section">
            <div class="items-header">
                <h4>产品明细</h4>
            </div>

            <div class="items-list">
                <div v-for="(item, itemIndex) in currentTemplate.items" :key="item.id" class="item-row">
                    <div class="item-number">{{ itemIndex + 1 }}</div>

                    <div class="item-fields">

                        <div class="form-group">
                            <label>产品图片</label>
                            <div class="image-upload">
                                <div v-if="item.image" class="image-preview">
                                    <img :src="item.image" alt="预览" class="preview-img">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>产品描述</label>
                            <input v-model="item.description" type="text" class="form-input" placeholder="请输入产品描述">
                        </div>
                        <div class="form-group">
                            <label>单价 ($) *</label>
                            <input v-model.number="item.price" type="number" step="0.01" class="form-input"
                                placeholder="0.00">
                        </div>

                        <div class="form-group">
                            <label>数量 *</label>
                            <input v-model.number="item.quantity" type="number" class="form-input" placeholder="0">
                        </div>

                        <div class="form-group">
                            <label>小计 ($)</label>
                            <div class="item-total">${{ calculateItemTotal(item) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="template-preview">
                <div class="preview-details">
                    <div class="template-items">
                        <div class="items-summary">
                            <span class="items-count">{{ currentTemplate.items ? currentTemplate.items.length : 0 }}
                            </span>
                            <span class="total-price">Total: ${{ calculateTotal(currentTemplate) }}</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import router from '../router/index'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentTemplate = ref({
    id: null,
    name: '',
    items: [
        {
            id: 1,
            name: '',
            description: '',
            image: '',
            price: 0,
            quantity: 0
        }
    ]
});

// Calculate total for a template
const calculateTotal = (template) => {
    if (template.items && template.items.length > 0) {
        return template.items.reduce((total, item) => {
            return total + ((item.price || 0) * (item.quantity || 0));
        }, 0).toFixed(2);
    }
    return '0.00';
};

// Calculate item total
const calculateItemTotal = (item) => {
    return ((item.price || 0) * (item.quantity || 0)).toFixed(2);
};

// Go back to templates list
const goBack = () => {
    router.push({ name: 'OrderTemplates' });
};

// Load template data on component mount
onMounted(() => {
    // Try to get template data from route state
    // console.log(route.query.template);


    if (history.state.template) {
        try {
            currentTemplate.value = JSON.parse(history.state.template);
        } catch (e) {
            console.error('Failed to parse template data', e);
        }
    } else {
        // Handle case where data is not available
        console.warn('No template data found in route state');
    }
});
</script>

<style scoped>
.order-template-details-view {
    width: 100%;
    padding-left: 50px;
    padding-right: 50px;
}

.order-templates-view {
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

.template-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.template-form-section {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* max-width: 1000px; */
    margin-left: auto;
    margin-right: auto;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.form-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
}

.form-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid #eee;
    margin-top: 10px;
}

.total-preview {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.total-label {
    color: #666;
    font-weight: 500;
}

.total-value {
    color: #e74c3c;
    font-size: 1.2rem;
    font-weight: 600;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

/* 多行数据样式 */
.items-section {
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.items-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dee2e6;
}

.items-header h4 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
}

.btn-sm {
    padding: 8px 12px;
    font-size: 0.85rem;
}

.items-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.item-row {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    transition: box-shadow 0.3s ease;
}

.item-row:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-number {
    width: 30px;
    height: 30px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.item-fields {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    flex: 1;
}

.item-fields .form-group {
    margin-bottom: 0;
}

.item-total {
    padding: 8px 12px;
    background: #e3f2fd;
    border-radius: 6px;
    color: #1976d2;
    font-weight: 600;
    text-align: center;
    border: 1px solid #bbdefb;
}

.item-actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background-color: #c82333;
}

.btn-danger:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

/* 模板预览样式 */
.template-items {
    margin-top: 15px;
}

.items-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    font-size: 0.9rem;
}

.items-count {
    color: #666;
    font-weight: 500;
}

.total-price {
    color: #e74c3c;
    font-weight: 600;
}

.items-preview {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.item-preview {
    padding: 8px;
    background: white;
    border-radius: 6px;
    font-size: 0.85rem;
    border: 1px solid #e9ecef;
    margin-bottom: 5px;
}

.item-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.item-image {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
}

.item-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.no-image {
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 0.7rem;
}

.item-details {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
}

.item-name {
    color: #333;
    font-weight: 500;
    font-size: 0.9rem;
}

.item-desc {
    color: #666;
    font-size: 0.8rem;
}

.item-price {
    color: #e74c3c;
    font-weight: 600;
    font-size: 0.85rem;
}

.more-items {
    text-align: center;
    color: #666;
    font-size: 0.8rem;
    font-style: italic;
    padding: 5px;
}

.btn {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
}

.btn-success {
    background-color: #28a745;
    color: white;
}

.btn-success:hover:not(:disabled) {
    background-color: #218838;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover:not(:disabled) {
    background-color: #545b62;
}

.btn-icon {
    font-size: 1rem;
}

.templates-content {
    /* max-width: 1200px; */
    margin: 0 auto;
}

.empty-state {
    text-align: center;
    padding: 80px 20px;
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
    font-size: 1.5rem;
}

.empty-state p {
    color: #666;
    font-size: 1.1rem;
}

.templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
}

.template-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.template-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.template-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.template-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.3rem;
}

.template-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 4px;
}

.edit-btn {
    background-color: #17a2b8;
    color: white;
}

.edit-btn:hover {
    background-color: #138496;
}

.delete-btn {
    background-color: #dc3545;
    color: white;
}

.delete-btn:hover {
    background-color: #c82333;
}

.template-preview {
    display: flex;
    gap: 15px;
}

.preview-image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
}

.template-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 0.9rem;
}

.preview-details {
    flex: 1;
}

.template-name {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 1.2rem;
    font-weight: 600;
}

.template-description {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 15px;
    line-height: 1.4;
}

.template-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.meta-label {
    color: #666;
    font-size: 0.8rem;
    font-weight: 500;
}

.meta-value {
    color: #333;
    font-weight: 600;
    font-size: 0.9rem;
}

.total-price {
    color: #e74c3c;
    font-size: 1.1rem;
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

.form-input,
.form-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #007bff;
}

.form-textarea {
    resize: vertical;
    min-height: 80px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.image-upload {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.file-input {
    display: none;
}

.upload-btn {
    padding: 10px 16px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #666;
}

.upload-btn:hover {
    border-color: #007bff;
    background: #e3f2fd;
    color: #007bff;
}

.image-preview {
    position: relative;
    display: inline-block;
}

.preview-img {
    width: 50%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.remove-image {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
}

.total-preview {
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #e74c3c;
    text-align: center;
}
</style>