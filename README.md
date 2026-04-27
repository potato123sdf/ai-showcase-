# AI工具展示平台

一个现代化的AI工具展示网站，具有粒子交互效果和用户认证系统。

## ✨ 功能特点

- 🎨 粒子背景交互效果（鼠标悬停和点击）
- 🔐 用户注册/登录系统（用户名+密码）
- 🤖 10+个AI工具展示（包括Claudeyy镜像站）
- 📄 详细的工具介绍页面
- ⬆️ 用户可上传自己的AI工具
- 📱 响应式设计
- 🎭 现代化UI（渐变色+毛玻璃效果）

## 🛠 技术栈

### 前端
- React 18
- React Router
- Axios
- Particles.js
- Vite

### 后端
- Node.js
- Express
- MongoDB
- JWT认证
- bcryptjs密码加密

## 📦 安装步骤

### 前置要求
- Node.js (v14+)
- MongoDB

### 1. 修复npm权限问题（如果遇到）

```bash
sudo chown -R $(whoami) ~/.npm
```

### 2. 安装依赖

```bash
# 后端依赖（已安装）
cd ~/Desktop/ai-showcase/server
npm install

# 前端依赖
cd ~/Desktop/ai-showcase/client
npm install
```

### 3. 启动MongoDB

```bash
# 使用brew启动
brew services start mongodb-community

# 或者直接运行
mongod
```

### 4. 启动项目

**终端1 - 启动后端：**
```bash
cd ~/Desktop/ai-showcase/server
npm run dev
```

**终端2 - 启动前端：**
```bash
cd ~/Desktop/ai-showcase/client
npm run dev
```

### 5. 访问应用

打开浏览器访问：http://localhost:3000

## 📖 使用说明

1. **注册账户**：点击右上角"注册"按钮，输入用户名和密码
2. **浏览工具**：首页展示所有AI工具卡片
3. **查看详情**：点击任意工具卡片查看详细介绍和官网链接
4. **上传工具**：登录后点击"+ 上传AI工具"分享你的发现

## 🎯 已包含的AI工具

- ChatGPT - OpenAI对话AI
- Claude - Anthropic对话AI
- **Claudeyy镜像站** - Claude免费镜像
- Midjourney - AI图像生成
- Stable Diffusion - 开源图像生成
- GitHub Copilot - AI编程助手
- Notion AI - AI写作助手
- Gemini - Google多模态AI
- DALL-E 3 - OpenAI图像生成
- Perplexity AI - AI搜索引擎

## 📁 项目结构

```
ai-showcase/
├── client/                 # 前端React应用
│   ├── src/
│   │   ├── components/    # 组件（Navbar, Particles）
│   │   ├── pages/         # 页面（Home, Login, Register, ToolDetail, AddTool）
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                # 后端Express应用
│   ├── models/           # 数据模型（User, AITool）
│   ├── routes/           # API路由（auth, aiTools）
│   ├── index.js
│   ├── .env
│   └── package.json
├── START.sh              # 启动指南脚本
└── README.md
```

## 🔌 API接口

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### AI工具
- `GET /api/tools` - 获取所有工具
- `GET /api/tools/:id` - 获取单个工具详情
- `POST /api/tools` - 添加新工具（需要登录）

## ⚠️ 注意事项

- 确保MongoDB服务正在运行
- 生产环境需要修改`.env`中的`JWT_SECRET`
- 如遇npm权限问题，运行：`sudo chown -R $(whoami) ~/.npm`

## 🎨 特色功能

### 粒子交互效果
- 鼠标悬停：粒子连线高亮
- 鼠标点击：生成新粒子
- 自动动画：粒子自由移动

### 工具详情页
- 完整的工具介绍
- 主要特性列表
- 使用场景展示
- 官网跳转按钮

### 用户上传
- 登录用户可上传AI工具
- 支持自定义分类
- 多个特性和场景标签

## 🚀 快速启动

运行启动脚本查看详细指南：
```bash
./START.sh
```

---

**项目位置**：`~/Desktop/ai-showcase`

**开发端口**：
- 前端：http://localhost:3000
- 后端：http://localhost:5000
