# 快速修复注册问题

## 问题原因
MongoDB数据库没有运行，导致注册失败。

## 解决方案

### 方案一：安装本地MongoDB（适合本地开发）

```bash
# 1. 安装MongoDB
brew tap mongodb/brew
brew install mongodb-community

# 2. 启动MongoDB
brew services start mongodb-community

# 3. 验证是否启动成功
brew services list | grep mongodb
# 应该显示：mongodb-community started

# 4. 重启后端服务器
cd ~/Desktop/ai-showcase/server
npm run dev
```

### 方案二：使用MongoDB Atlas云数据库（推荐）

**优点：**
- 无需安装任何软件
- 免费512MB存储
- 可以直接用于生产环境
- 5分钟配置完成

**步骤：**

1. **注册MongoDB Atlas**
   - 访问：https://www.mongodb.com/cloud/atlas/register
   - 使用Google账号快速注册

2. **创建免费集群**
   - 选择 "Shared" (免费)
   - Provider: AWS
   - Region: Singapore 或 Tokyo（离中国近）
   - Cluster Name: ai-showcase
   - 点击 "Create"

3. **创建数据库用户**
   - 左侧菜单 → Database Access
   - Add New Database User
   - Username: `admin`
   - Password: 自己设置一个密码（记住它）
   - Database User Privileges: Read and write to any database
   - Add User

4. **允许网络访问**
   - 左侧菜单 → Network Access
   - Add IP Address
   - 选择 "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **获取连接字符串**
   - 左侧菜单 → Database
   - 点击 "Connect"
   - 选择 "Connect your application"
   - 复制连接字符串，类似：
     ```
     mongodb+srv://admin:<password>@ai-showcase.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - 将 `<password>` 替换为你设置的密码

6. **更新后端配置**
   ```bash
   # 编辑 .env 文件
   cd ~/Desktop/ai-showcase/server
   nano .env

   # 修改 MONGODB_URI 为你的连接字符串
   MONGODB_URI=mongodb+srv://admin:你的密码@ai-showcase.xxxxx.mongodb.net/ai-showcase?retryWrites=true&w=majority

   # 保存并退出（Ctrl+X, Y, Enter）
   ```

7. **重启后端**
   ```bash
   # 停止当前运行的后端（Ctrl+C）
   # 然后重新启动
   npm run dev
   ```

8. **测试注册**
   - 访问 http://localhost:3000
   - 点击注册
   - 输入用户名和密码
   - 应该注册成功！

---

## 验证MongoDB连接

启动后端后，应该看到：
```
Server running on port 5000
MongoDB connected
```

如果看到 "MongoDB connection error"，说明连接字符串有问题。

---

## 常见问题

**Q: 忘记MongoDB Atlas密码怎么办？**
A: 在Database Access中删除用户，重新创建一个。

**Q: 连接超时？**
A: 检查Network Access是否添加了0.0.0.0/0。

**Q: 本地MongoDB安装失败？**
A: 直接使用方案二（MongoDB Atlas），更简单。
