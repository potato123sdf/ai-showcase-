import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './AddTool.css';

const AddTool = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '对话AI',
    url: '',
    features: '',
    detailedDescription: '',
    useCases: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['对话AI', '图像生成', '编程工具', '写作工具', '搜索工具', '镜像站', '其他'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('请先登录');
      setLoading(false);
      return;
    }

    const toolData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      useCases: formData.useCases.split(',').map(u => u.trim()).filter(u => u)
    };

    try {
      await axios.post(`${API_URL}/api/tools`, toolData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-tool-container">
      <button onClick={() => navigate('/')} className="back-btn">
        ← 返回
      </button>

      <div className="add-tool-card">
        <h2 className="add-tool-title">上传AI工具</h2>
        <p className="add-tool-subtitle">分享你发现的优秀AI工具</p>

        <form onSubmit={handleSubmit} className="add-tool-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label">工具名称 *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="例如：ChatGPT"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">简短描述 *</label>
            <input
              type="text"
              name="description"
              className="form-input"
              placeholder="一句话介绍这个工具"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">分类 *</label>
            <select
              name="category"
              className="form-input"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">官网链接 *</label>
            <input
              type="url"
              name="url"
              className="form-input"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">详细介绍 *</label>
            <textarea
              name="detailedDescription"
              className="form-textarea"
              placeholder="详细介绍这个工具的功能和特点"
              value={formData.detailedDescription}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">主要特性（用逗号分隔）</label>
            <input
              type="text"
              name="features"
              className="form-input"
              placeholder="例如：自然对话, 代码生成, 文本创作"
              value={formData.features}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">使用场景（用逗号分隔）</label>
            <input
              type="text"
              name="useCases"
              className="form-input"
              placeholder="例如：内容创作, 代码辅助, 学习辅导"
              value={formData.useCases}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '提交中...' : '提交'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTool;
