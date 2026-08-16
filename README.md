# dsh-live2d-afterglow

Afterglow Live2D 桌宠插件 —— 为 DeepSeek Harness Web GUI 添加可拖拽的 Live2D 看板娘。

收录 Afterglow 五位成员的 Live2D 桌宠：美竹 蘭（Ran）、青葉 モカ（Moca）、上原 ひまり（Himari）、宇田川 巴（Tomoe）、羽沢 つぐみ（Tsugumi），合计 426 套换装
（常服 / 校服 / 演出 / 活动 / 生日 / 联动等，取自 BANDORI 独立版全量数据）；
模型本地存储、同源加载，零网络请求。

## 功能

- 右下角 Live2D 看板娘（5 角色）
- 拖拽自由移动（位置持久化到 localStorage）
- 角色切换 + 换装面板（426 套换装，中文名显示：常服2023 / 活动41 SR / 泳装2023 / 生日2022 等；角色选择面板显示角色头像）
- 视线跟随鼠标、空闲随机动作/台词气泡、点击互动
- 拍照（下载 PNG 截图）

## 安装

```bash
dsh plugin --profile web add D:\\dsh\\dsh-live2d-afterglow
```

装完后重启 dsh web 并硬刷新页面。与 dsh-live2d-mygo / dsh-live2d-poppinparty /
dsh-live2d-afterglow / dsh-live2d-pastelpalettes 为独立插件，路由前缀各自隔离
（/pet-assets /pp-assets /ag-assets /ppp-assets），可同时安装；但同源 widget 共享
localStorage 状态、同屏只会出现一只桌宠，切换团请在 web profile 的 cordis.patch.yml
中注释/取消注释对应插件的 disabled 条目后重启。

## 卸载

```bash
dsh plugin --profile web remove dsh-live2d-afterglow
```

## 构建

```bash
pnpm install
pnpm build
```

构建产物 lib/index.js + lib/client.js 已随仓库提供（无 prepare 脚本，pnpm 9+ 可直接
git 依赖安装）。模型资源在 assets/model（约 500-700MB，Cubism 2 .moc/.mtn），
更换模型/换装后需重启 dsh web。

## 说明

- 模型数据来自 BANDORI 独立版看板娘（model-data），仅本地使用，请勿用于商业用途。
- 换装显示名为规则化中文映射（src/client/waifu/characters.js 的 LABEL_RULES），
  想改某个名字直接改那一行规则即可。
