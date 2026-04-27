import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './ToolDetail.css';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchToolDetail();
  }, [id]);

  const fetchToolDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tools/${id}`);
      setTool(response.data);
    } catch (error) {
      console.error('获取工具详情失败:', error);
      setTool(getMockTool(id));
    } finally {
      setLoading(false);
    }
  };

  const getMockTool = (id) => {
    const mockTools = {
      '1': {
        name: 'ChatGPT',
        description: 'OpenAI开发的强大对话式AI助手，可以回答问题、写作、编程、翻译等多种任务',
        category: '对话AI',
        url: 'https://chat.openai.com',
        features: ['自然对话', '代码生成', '文本创作', '多语言支持', '数据分析', '创意构思'],
        detailedDescription: 'ChatGPT是OpenAI开发的大型语言模型，基于GPT架构。它能够理解和生成自然语言，帮助用户完成各种任务，包括写作、编程、数据分析、创意构思等。ChatGPT通过大规模的预训练和微调，能够进行流畅的对话，理解上下文，并提供有价值的回答和建议。',
        useCases: ['内容创作', '代码辅助', '学习辅导', '翻译服务', '头脑风暴']
      },
      '2': {
        name: 'Claude',
        description: 'Anthropic开发的AI助手，擅长长文本分析、代码理解和安全对话',
        category: '对话AI',
        url: 'https://claude.ai',
        features: ['长文本处理', '代码分析', '安全可靠', '深度思考', '文档理解', '逻辑推理'],
        detailedDescription: 'Claude是由Anthropic开发的AI助手，注重安全性和可靠性。它在处理长文本、复杂推理和代码分析方面表现出色。Claude采用Constitutional AI技术，确保输出内容的安全性和准确性。它特别擅长处理大量文档、进行深度分析和提供详细的解释。',
        useCases: ['文档分析', '代码审查', '研究辅助', '技术写作', '复杂问题解决']
      },
      '3': {
        name: 'Claudeyy镜像站',
        description: 'Claude的免费镜像站，无需注册即可使用，提供稳定的Claude访问服务',
        category: '镜像站',
        url: 'https://claudeyy.com',
        features: ['免费使用', '无需注册', '稳定访问', 'Claude功能', '快速响应', '隐私保护'],
        detailedDescription: 'Claudeyy是Claude的镜像站点，为用户提供免费、便捷的Claude AI访问服务。无需注册账号，即可直接使用Claude的强大功能。该镜像站提供稳定的服务，确保用户能够随时访问Claude进行对话、分析和创作。',
        useCases: ['快速体验Claude', '无账号使用', '临时任务处理', '学习测试', '日常咨询']
      }
    };
    return mockTools[id] || mockTools['1'];
  };

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading">加载中...</div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="detail-container">
        <div className="error">工具不存在</div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/')} className="back-btn">
        ← 返回
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <h1 className="detail-title">{tool.name}</h1>
            <span className="detail-category">{tool.category}</span>
          </div>
        </div>

        <p className="detail-description">{tool.description}</p>

        <div className="detail-section">
          <h2 className="section-title">详细介绍</h2>
          <p className="section-content">{tool.detailedDescription}</p>
        </div>

        {tool.features && tool.features.length > 0 && (
          <div className="detail-section">
            <h2 className="section-title">主要特性</h2>
            <div className="features-list">
              {tool.features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.useCases && tool.useCases.length > 0 && (
          <div className="detail-section">
            <h2 className="section-title">使用场景</h2>
            <div className="use-cases-list">
              {tool.useCases.map((useCase, idx) => (
                <div key={idx} className="use-case-item">
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.url && (
          <div className="detail-actions">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-btn"
            >
              访问官网 →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDetail;
