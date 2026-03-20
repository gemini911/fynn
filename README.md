# Personal Website

一个极简风格个人作品展示网站，部署于 Vercel。

## 快速开始

本地预览：

```bash
# 使用任意静态服务器
npx serve .

# 或使用 Python
python -m http.server 8000
```

然后访问 `http://localhost:8000`

## 部署到 Vercel

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 方式二：通过 GitHub

1. 将此项目推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. Vercel 会自动检测为 static site，点击 Deploy

### 方式三：通过拖拽

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 直接拖拽项目文件夹到页面

## 自定义

### 修改个人信息

编辑 `index.html` 中的以下内容：

- **姓名/标题**: 第 140 行 Hero 区域
- **个人简介**: Hero 区域的 bio 段落
- **项目列表**: Projects 区域的 project-card 元素
- **关于我**: About 区域的个人介绍
- **联系方式**: Contact 区域的邮箱和社交链接

### 修改配色

编辑 `<style>` 标签中的 CSS Variables：

```css
:root {
  --bg: #FAFAFA;           /* 背景色 */
  --text-primary: #1A1A1A;   /* 主文字色 */
  --text-secondary: #6B6B6B; /* 次要文字色 */
  --accent: #E63946;         /* 强调色 */
}
```

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- Google Fonts (Cormorant Garamond, DM Sans, Noto Serif SC)
- Lucide Icons
- 无框架依赖，纯静态站点
