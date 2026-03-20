# Personal Website Specification

## Concept & Vision

一个极简但富有诗意的个人作品展示网站。以"留白"为核心设计语言，让内容呼吸。大面积留白配合精致的排版细节，在静谧中展现品味。整体氛围如同翻阅一本设计杂志——安静、有深度、让人想停留。

## Design Language

### Aesthetic Direction
 editorial minimalism — 受日本平面设计和瑞士排版风格影响，强调网格系统、精确的间距和优雅的字体搭配。

### Color Palette
- Background: `#FAFAFA` (温暖的中性白)
- Primary Text: `#1A1A1A` (接近纯黑的深灰)
- Secondary Text: `#6B6B6B` (柔和的中灰)
- Accent: `#E63946` (一抹红色作为点睛)
- Border: `#E5E5E5` (极淡的分割线)

### Typography
- 标题: `Cormorant Garamond` (衬线字体，优雅古典) — fallback: `Georgia, serif`
- 正文/UI: `DM Sans` (现代几何无衬线) — fallback: `system-ui, sans-serif`
- 中文: `Noto Serif SC` (思源宋体，与英文衬线呼应)

### Spatial System
- 基础单位: 8px
- 主要间距: 48px, 80px, 120px
- 最大内容宽度: 1200px
- 卡片圆角: 0 (直角，符合极简美学)

### Motion Philosophy
- 入场动画: 渐入 + 微上移，opacity 0→1, translateY 20px→0, 600ms ease-out
- 交错延迟: 每元素延迟 100ms
- Hover: 颜色过渡 200ms，subtle scale 1.02
- 页面滚动: smooth scroll behavior

### Visual Assets
- 无装饰性图片，以文字和排版为核心
- 项目展示使用纯色背景卡片
- 社交图标使用 Lucide Icons (线条风格)

## Layout & Structure

### 页面结构
```
┌─────────────────────────────────────┐
│  Header: Logo + Nav (固定顶部)       │
├─────────────────────────────────────┤
│  Hero Section                        │
│  - 大标题 (名字)                      │
│  - 副标题 (身份/角色)                 │
│  - 简短个人简介                       │
├─────────────────────────────────────┤
│  Projects Section                    │
│  - Section Title                     │
│  - 2列网格项目卡片                    │
├─────────────────────────────────────┤
│  About Section                       │
│  - 左侧: 照片占位/装饰                │
│  - 右侧: 个人详细介绍                 │
├─────────────────────────────────────┤
│  Contact Section                     │
│  - 邮箱                              │
│  - 社交链接                          │
├─────────────────────────────────────┤
│  Footer                              │
└─────────────────────────────────────┘
```

### Responsive Strategy
- Desktop (>1024px): 2列项目网格
- Tablet (768-1024px): 2列网格，间距缩小
- Mobile (<768px): 单列，增大触控区域

## Features & Interactions

### Navigation
- 固定顶部，半透明背景 + backdrop-blur
- 滚动时添加底部细线
- 平滑滚动到各 section
- 当前 section 对应 nav item 高亮

### Hero Section
- 名字使用超大字号的 Cormorant Garamond
- 副标题淡入动画延迟 200ms
- 简介淡入动画延迟 400ms

### Projects Section
- 项目卡片 hover 时:
  - 背景微微变深 (#F5F5F5)
  - 标题颜色变为 accent
  - 卡片轻微上浮 (translateY -4px)

### Contact Section
- 邮箱链接 hover 时下划线动画
- 社交图标 hover 时旋转 10度 + 颜色变 accent

## Component Inventory

### Header
- States: default (透明背景) / scrolled (白色背景 + 底部线条)
- Height: 72px
- Logo: 文字形式，字体 DM Sans Medium

### Nav Link
- Default: #6B6B6B
- Hover: #1A1A1A
- Active: #1A1A1A + 下划线

### Project Card
- Background: #FFFFFF
- Border: 1px solid #E5E5E5
- Padding: 32px
- Title: DM Sans 20px, #1A1A1A
- Description: DM Sans 14px, #6B6B6B
- Tags: 小字，accent 颜色
- Hover: 背景 #F8F8F8, 上浮

### Section Title
- Font: Cormorant Garamond, 48px, #1A1A1A
- 下方有短横线装饰 (40px宽, 2px高, accent色)

### Button/Link
- Primary: 背景 accent, 文字白, hover 时亮度提升
- Text Link: 下划线从左向右展开动画

### Social Icon
- Size: 24px
- Default: #6B6B6B
- Hover: #E63946, rotate 10deg

## Technical Approach

- **Framework**: 纯 HTML + CSS + JavaScript (无框架依赖，部署最简)
- **CSS**: 内联 CSS Variables, Flexbox/Grid 布局
- **JS**: Vanilla JS，用于: 滚动监听、Intersection Observer 动画、移动端菜单
- **Fonts**: Google Fonts CDN
- **Icons**: Lucide Icons CDN
- **Deployment**: Vercel (自动检测 static site)

### 文件结构
```
/
├── index.html
├── SPEC.md
└── README.md
```
