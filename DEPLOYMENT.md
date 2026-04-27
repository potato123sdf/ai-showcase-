# 部署指南

## 方案一：使用 Vercel + MongoDB Atlas（推荐，免费）

### 1. 准备工作

#### 注册账号
- [Vercel](https://vercel.com) - 前端部署
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - 云数据库
- [Render](https://render.com) 或 [Railway](https://railway.app) - 后端部署

### 2. 部署MongoDB数据库

1. 访问 https://www.mongodb.com/cloud/atlas
2. 注册并创建免费集群
3. 创建数据库用户
4. 获取连接字符串（类似：`mongodb+srv://username:password@cluster.mongodb.net/ai-showcase`）
5. 在Network Access中添加 `0.0.0.0/0` 允许所有IP访问

### 3. 部署后端到Render

1. 访问 https://render.com 并注册
2. 点击 "New +" → "Web Service"
3. 连接你的GitHub仓库（需要先上传代码到GitHub）
4. 配置：
   - **Name**: ai-showcase-api
   - **Root Directory**: server
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. 添加环境变量：
   - `MONGODB_URI`: 你的MongoDB Atlas连接字符串
   - `JWT_SECRET`: 随机生成的密钥
   - `PORT`: 5000
6. 点击 "Create Web Service"
7. 记录你的后端URL（如：`https://ai-showcase-api.onrender.com`）

### 4. 部署前端到Vercel

1. 访问 https://vercel.com 并注册
2. 点击 "Add New..." → "Project"
3. 导入你的GitHub仓库
4. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: client
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. 添加环境变量：
   - `VITE_API_URL`: 你的后端URL（如：`https://ai-showcase-api.onrender.com`）
6. 点击 "Deploy"
7. 部署完成后获得网址（如：`https://ai-showcase.vercel.app`）

### 5. 修改代码以使用环境变量

需要修改前端代码中的API地址：

在所有axios请求中，将 `http://localhost:5000` 替换为环境变量：
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/api/tools`)
```

---

## 方案二：使用 Netlify + Heroku

### 后端部署到Heroku
1. 注册 https://heroku.com
2. 安装Heroku CLI
3. 在server目录运行：
```bash
heroku login
heroku create ai-showcase-api
heroku config:set MONGODB_URI=你的MongoDB连接字符串
heroku config:set JWT_SECRET=你的密钥
git push heroku main
```

### 前端部署到Netlify
1. 注册 https://netlify.com
2. 拖拽client/dist文件夹到Netlify
3. 或连接GitHub自动部署

---

## 方案三：使用单一平台 Railway（最简单）

1. 访问 https://railway.app 并注册
2. 点击 "New Project" → "Deploy from GitHub repo"
3. Railway会自动检测并部署前后端
4. 添加MongoDB服务（Railway提供）
5. 配置环境变量
6. 获得公开URL

---

## 快速开始（推荐步骤）

### 第一步：上传代码到GitHub

```bash
cd ~/Desktop/ai-showcase
git init
git add .
git commit -m "Initial commit"
# 在GitHub创建仓库后
git remote add origin https://github.com/你的用户名/ai-showcase.git
git push -u origin main
```

### 第二步：一键部署

使用Railway最简单：
1. 访问 https://railway.app
2. 点击 "Start a New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择你的ai-showcase仓库
5. Railway自动部署，几分钟后获得公开URL

---

## 需要修改的文件

我会帮你创建一个配置文件，让代码支持生产环境部署。
