import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import './Home.css';

const Home = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tools`);
      setTools(response.data);
    } catch (error) {
      console.error('获取工具列表失败:', error);
      setTools(mockTools);
    }
  };

  const mockTools = [
    {
      _id: '1',
      name: 'ChatGPT',
      description: 'OpenAI开发的强大对话式AI助手，可以回答问题、写作、编程、翻译等多种任务',
      category: '对话AI',
      url: 'https://chat.openai.com',
      features: ['自然对话', '代码生成', '文本创作', '多语言支持'],
      detailedDescription: 'ChatGPT是OpenAI开发的大型语言模型，基于GPT架构。它能够理解和生成自然语言，帮助用户完成各种任务，包括写作、编程、数据分析、创意构思等。'
    },
    {
      _id: '2',
      name: 'Claude',
      description: 'Anthropic开发的AI助手，擅长长文本分析、代码理解和安全对话',
      category: '对话AI',
      url: 'https://claude.ai',
      features: ['长文本处理', '代码分析', '安全可靠', '深度思考'],
      detailedDescription: 'Claude是由Anthropic开发的AI助手，注重安全性和可靠性。它在处理长文本、复杂推理和代码分析方面表现出色。'
    },
    {
      _id: '3',
      name: 'Claudeyy镜像站',
      description: 'Claude的免费镜像站，无需注册即可使用，提供稳定的Claude访问服务',
      category: '镜像站',
      url: 'https://claudeyy.com',
      features: ['免费使用', '无需注册', '稳定访问', 'Claude功能'],
      detailedDescription: 'Claudeyy是Claude的镜像站点，为用户提供免费、便捷的Claude AI访问服务，无需注册即可使用。'
    },
    {
      _id: '4',
      name: 'Midjourney',
      description: 'AI图像生成工具，通过文字描述创建精美的艺术作品和图片',
      category: '图像生成',
      url: 'https://midjourney.com',
      features: ['文生图', '高质量输出', '艺术风格', '创意设计'],
      detailedDescription: 'Midjourney是一款强大的AI图像生成工具，能够根据文字描述创建高质量的图像。它在艺术创作、设计和视觉内容生成方面表现出色。'
    },
    {
      _id: '5',
      name: 'Stable Diffusion',
      description: '开源的AI图像生成模型，支持本地部署和高度定制',
      category: '图像生成',
      url: 'https://stability.ai',
      features: ['开源免费', '本地部署', '高度可定制', '社区支持'],
      detailedDescription: 'Stable Diffusion是一个开源的文本到图像生成模型，允许用户在本地运行，提供完全的控制和定制能力。'
    },
    {
      _id: '6',
      name: 'GitHub Copilot',
      description: 'AI编程助手，实时代码建议和自动补全，提升开发效率',
      category: '编程工具',
      url: 'https://github.com/features/copilot',
      features: ['代码补全', 'IDE集成', '多语言支持', '智能建议'],
      detailedDescription: 'GitHub Copilot是由GitHub和OpenAI合作开发的AI编程助手，能够根据上下文提供智能的代码建议和补全。'
    },
    {
      _id: '7',
      name: 'Notion AI',
      description: '集成在Notion中的AI写作助手，帮助生成和优化文档内容',
      category: '写作工具',
      url: 'https://notion.so',
      features: ['文档生成', '内容总结', '翻译功能', '写作优化'],
      detailedDescription: 'Notion AI是集成在Notion工作空间中的AI助手，能够帮助用户快速生成、编辑和优化文档内容。'
    },
    {
      _id: '8',
      name: 'Gemini',
      description: 'Google开发的多模态AI模型，支持文本、图像、视频等多种输入',
      category: '对话AI',
      url: 'https://gemini.google.com',
      features: ['多模态', '强大推理', 'Google集成', '实时信息'],
      detailedDescription: 'Gemini是Google最新的AI模型，具有强大的多模态能力，能够处理文本、图像、音频和视频等多种类型的输入。'
    },
    {
      _id: '9',
      name: 'DALL-E 3',
      description: 'OpenAI的图像生成模型，能创建高质量、精确的图像',
      category: '图像生成',
      url: 'https://openai.com/dall-e-3',
      features: ['精确生成', '高分辨率', '风格多样', 'ChatGPT集成'],
      detailedDescription: 'DALL-E 3是OpenAI开发的最新图像生成模型，能够根据详细的文字描述生成高质量、精确的图像。'
    },
    {
      _id: '10',
      name: 'Perplexity AI',
      description: 'AI搜索引擎，提供准确的答案和引用来源',
      category: '搜索工具',
      url: 'https://perplexity.ai',
      features: ['智能搜索', '引用来源', '实时信息', '对话式交互'],
      detailedDescription: 'Perplexity AI是一个AI驱动的搜索引擎，能够理解复杂问题并提供准确的答案，同时标注信息来源。'
    }
  ];

  const displayTools = tools.length > 0 ? tools : mockTools;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">探索AI工具的无限可能</h1>
        <p className="hero-subtitle">发现最新、最强大的人工智能工具</p>
      </div>

      <div className="tools-grid">
        {displayTools.map((tool) => (
          <Link key={tool._id} to={`/tool/${tool._id}`} className="tool-card-link">
            <div className="tool-card">
              <div className="tool-card-header">
                <h3 className="tool-name">{tool.name}</h3>
                <span className="tool-category">{tool.category}</span>
              </div>
              <p className="tool-description">{tool.description}</p>
              {tool.features && (
                <div className="tool-features">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
              )}
              <div className="tool-link-text">
                查看详情 →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
