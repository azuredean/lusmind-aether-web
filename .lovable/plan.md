# 修复移动端标题文字互相遮挡的问题

## 已确认的问题
在 390px 宽度下逐页截图检查（首页 + 7 个产品页），确认：

1. **产品页 hero 主标题与副标题重叠**（截图中 Royal Slim 最明显）
   `.product-hero__copy h1` 使用 `line-height: 0.83`，副标题 `span` 直接紧跟其后：实测标题顶部到副标题顶部只有 52px，而字号约 62px，所以 “Royal Slim” 的 y 降部直接压在 “THE SLIM PROPORTION…” 上。所有产品页同样存在（royal-slim / royal-classic / royal-heat / fusion-one / arc-pod-s / core-20 / ai-pulse / e-liquid）。

2. **hero 正文段落压在高亮产品图上**
   Royal Slim 页的描述文字落在包装盒亮部，局部对比度不足。

3. 其余检查结果：全部页面横向溢出为 0；首页宽表格（commercial-row 700px）位于横向滚动容器内，属预期行为，不改。

## 修改内容
1. 在 `public/product-detail.css` 中：
   - 给 `.product-hero__copy h1` 的副标题 `span` 增加上边距（约 0.5–0.6em 的等效间距），并把降部空间考虑进去；移动端断点（≤900px / ≤620px）单独再加一点间距，保证 `y`、`g`、`p` 等降部与副标题完全分离。
   - 副标题 `line-height` 从 1.4 调整到更稳的值，并允许两行时不挤压。
2. 移动端 hero 遮罩在标题/正文区域再加一层局部渐变强度，保证正文在亮部产品图上的可读性（只改 `.product-hero__shade`，不动图片）。
3. 复查 `public/styles.css` 中同类紧行距标题（首页 hero、章节大标题、mystery 区块等）在 390px / 430px 下是否有同样的降部碰撞，只对确实碰撞的选择器做最小间距修正。

## 验证
- 用 Playwright 在 390px 和 430px 重新截图首页与全部 7 个产品页，逐张确认标题与副标题无重叠、无横向溢出。
- 桌面 1280px 抽查，确认排版比例未被改动。
