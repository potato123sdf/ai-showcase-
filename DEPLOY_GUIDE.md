# 一键部署脚本

## 最简单的方法：使用 Vercel（推荐）

### 步骤1：上传到GitHub

```bash
cd ~/Desktop/ai-showcase

# 初始化git
git init
git add .
git commit -m "Initial commit: AI工具展示平台"

# 在GitHub上创建新仓库 ai-showcase
# 然后运行：
git remote add origin https://github.com/你的用户名/ai-showcase.git
git branch -M main
git push -u origin main
```

### 步骤2：部署数据库（MongoDB Atlas - 免费）

1. 访问 https://www.mongodb.com/cloud/atlas/register
2. 注册并创建免费集群（选择AWS，区域选Singapore或Tokyo）
3. 创建数据库用户（记住用户名和密码）
4. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. 点击 Connect → Connect your application
6. 复制连接字符串，类似：
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-showcase?retryWrites=true&w=majority
   ```

### 步骤3：部署后端（Render - 免费）

1. 访问 https://render.com 注册
2. 点击 "New +" → "Web Service"
3. 连接GitHub仓库
4. 配置：
   - **Name**: `ai-showcase-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. 添加环境变量（Environment Variables）：
   ```
   MONGODB_URI = 你的MongoDB连接字符串
   JWT_SECRET = 随机字符串（如：ai_showcase_2024_secret_key）
   PORT = 10000
   ```
6. 点击 "Create Web Service"
7. 等待部署完成，复制URL（如：https://ai-showcase-api.onrender.com）

### 步骤4：部署前端（Vercel - 免费）

1. 访问 https://vercel.com 注册（可用GitHub登录）
2. 点击 "Add New..." → "Project"
3. Import你的GitHub仓库
4. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 添加环境变量（Environment Variables）：
   ```
   VITE_API_URL = 你的后端URL（如：https://ai-showcase-api.onrender.com）
   ```
6. 点击 "Deploy"
7. 等待部署完成（约2分钟）

### 步骤5：完成！

部署完成后，Vercel会给你一个网址，如：
```
https://ai-showcase-你的用户名.vercel.app
```

任何人访问这个网址都能使用你的网站！

---

## 更简单的方法：Railway（一键部署）

1. 访问 https://railway.app 注册
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择你的仓库
4. Railway会自动检测前后端
5. 添加MongoDB插件（点击 + New → Database → MongoDB）
6. 设置环境变量
7. 获得公开URL

---

## 本地测试部署版本

在部署前，先本地测试：

```bash
# 1. 安装依赖
cd ~/Desktop/ai-showcase/client
npm install

# 2. 构建生产版本
npm run build

# 3. 预览
npm run preview
```

---

## 需要帮助？

查看详细部署文档：`DEPLOYMENT.md`
