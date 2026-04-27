#!/bin/bash

echo "======================================"
echo "项目完整性检查"
echo "======================================"
echo ""

# 检查关键文件
echo "✓ 检查关键文件..."
files=(
  "client/index.html"
  "client/src/main.jsx"
  "client/src/App.jsx"
  "client/src/index.css"
  "server/index.js"
  "server/.env"
)

all_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    size=$(wc -c < "$file")
    echo "  ✓ $file ($size bytes)"
  else
    echo "  ✗ $file (缺失)"
    all_exist=false
  fi
done

echo ""
echo "✓ 前端组件: $(ls client/src/components/*.jsx 2>/dev/null | wc -l) 个"
echo "✓ 前端页面: $(ls client/src/pages/*.jsx 2>/dev/null | wc -l) 个"
echo "✓ 后端模型: $(ls server/models/*.js 2>/dev/null | wc -l) 个"
echo "✓ 后端路由: $(ls server/routes/*.js 2>/dev/null | wc -l) 个"

echo ""
echo "======================================"
if [ "$all_exist" = true ]; then
  echo "✓ 所有文件完整！"
else
  echo "✗ 有文件缺失"
fi
echo "======================================"
