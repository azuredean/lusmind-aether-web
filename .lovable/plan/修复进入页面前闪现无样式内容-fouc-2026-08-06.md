# 修复进入页面前闪现无样式内容（FOUC）

## 现象原因
页面的样式表不是随页面一起加载的，而是在 React 组件挂载后用 JS 动态插入 `<link>`（`src/lusmind/useStylesheet.ts`）。在样式表下载完成之前，HTML 内容已经渲染出来，所以会先看到一屏没有排版的纯文字/蓝色链接，随后才跳到正常页面。产品详情页（`/products/*`）尤其明显，因为它完全没有等待样式就绪就渲染内容。

## 修改方案
1. 在 `index.html` 的 `<head>` 中为 `/styles.css` 和 `/product-detail.css` 添加 `<link rel="preload" as="style">`，让浏览器提前开始下载，切换路由时基本瞬时命中缓存。
2. 让页面在样式表就绪前不显示内容：
   - `ProductPage.tsx` 接收 `useStylesheet` 返回的 `ready`，未就绪时容器保持 `visibility: hidden`（保留 DOM，脚本仍可初始化），就绪后显示。
   - `Home.tsx` 同样处理，用已有的 `stylesReady`。
3. 在 `useStylesheet` 中做去重与缓存：如果该 href 的 `<link>` 已存在且已加载，直接返回 `ready = true`，避免重复插入和二次闪烁。

## 技术细节
- 用 `visibility` 而非 `display:none`，避免破坏依赖布局测量的初始化脚本（滚动进度、IntersectionObserver）。
- 顶部年龄验证遮罩逻辑不变。
- 验证：在 preview 中冷加载 `/` 和 `/products/royal-heat`，用 Playwright 截图确认首帧不再出现无样式内容，且无横向溢出。
