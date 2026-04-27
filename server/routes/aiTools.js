const express = require('express');
const router = express.Router();
const AITool = require('../models/AITool');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未授权' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: '无效的token' });
  }
};

router.get('/', async (req, res) => {
  try {
    const tools = await AITool.find().sort({ createdAt: -1 });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tool = await AITool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: '工具不存在' });
    }
    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const tool = new AITool({
      ...req.body,
      createdBy: req.userId
    });
    await tool.save();
    res.status(201).json(tool);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

module.exports = router;
