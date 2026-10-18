<p align="center">
  <a href="https://getartcraft.com/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/storytold/photocraft/main/docs/brand/artcraft-logo-white.svg">
      <img alt="ArtCraft" src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/brand/artcraft-logo.svg" width="200">
    </picture>
  </a>
</p>

<h1 align="center">PhotoCraft</h1>

<p align="center">
  <b>图像处理：以纯 Rust 从零重写、对 Adobe Photoshop 进行开源、净室（clean-room）逆向实现的软件。</b><br>
  图层、蒙版、调整图层、图层样式、文字、矢量、画笔与真正的 PSD 文件，<br>
  全部运行在一个纯 Rust 编写的原生应用之中。开源、离线可用，属于你自己。
</p>

<p align="center">
  <img alt="100% Rust" src="https://img.shields.io/badge/100%25-Rust-b7410e?style=flat-square&logo=rust">
  <img alt="macOS · Windows · Linux · FreeBSD · Web" src="https://img.shields.io/badge/macOS%20%C2%B7%20Windows%20%C2%B7%20Linux%20%C2%B7%20FreeBSD%20%C2%B7%20Web-native-2f7bf5?style=flat-square">
  <img alt="License: MIT OR Apache-2.0" src="https://img.shields.io/badge/license-MIT%20%2F%20Apache--2.0-3a3a3a?style=flat-square">
  <img alt="Status: early alpha" src="https://img.shields.io/badge/status-early%20alpha-d69e2e?style=flat-square">
</p>

<p align="center">
  <a href="https://discord.gg/artcraft"><img alt="Join the ArtCraft community on Discord" src="https://img.shields.io/badge/Join%20us%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="40"></a>
</p>

<p align="center">
  <a href="https://getartcraft.com/apps/photocraft"><b>getartcraft.com 上的 PhotoCraft</b></a> ·
  <a href="https://getartcraft.com/">ArtCraft</a> ·
  <a href="https://getartcraft.com/apps">全部 Crafting 应用</a>
</p>

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-demo.jpg" alt="PhotoCraft 正在编辑葛饰北斋的《神奈川冲浪里》：一张带投影的说明卡片，标题与署名文字图层，自然饱和度与曲线调整图层，以及绘制在图像直方图之上的曲线编辑器" width="100%">
  <br>
  <sub>一张带投影的说明卡片，配实时文字，以及自然饱和度与曲线调整图层，曲线编辑器处于打开状态。<br>
  <i>神奈川冲浪里</i>，葛饰北斋，约 1831 年</sub>
</p>

> [!NOTE]
> **ArtCraft 是一个汇聚了各行各业艺术家的社区。** 数字艺术、生成艺术、音乐、游戏——只要你动手创作，你就是我们的一员。 **[来 Discord 跟我们打个招呼吧](https://discord.gg/artcraft)。**

<p align="center">
  <a href="#features">功能特性</a> ·
  <a href="#everything-in-the-box">开箱即用的全部功能</a> ·
  <a href="#psd-without-compromise">PSD</a> ·
  <a href="#built-for-agents">智能体</a> ·
  <a href="#under-the-hood">技术内幕</a> ·
  <a href="#get-started">开始使用</a> ·
  <a href="#downloads">下载</a> ·
  <a href="#the-crafting-apps">Crafting 应用</a> ·
  <a href="https://discord.gg/artcraft">Discord</a>
</p>

<br>

<table>
  <tr>
    <td width="25%" valign="top">
      <h3>🎛️ 设计上熟悉易用</h3>
      菜单、快捷键、面板和工具都摆在你的手习惯的位置，从 ⌘J 到 ⇧⌘D。只要你会用 Photoshop，就已经会用 PhotoCraft。
    </td>
    <td width="25%" valign="top">
      <h3>⚡ 原生且快速</h3>
      基于 wgpu（Metal、Vulkan、DX12、WebGPU）的 GPU 合成器、写时复制（copy-on-write）瓦片与多线程滤镜。没有 Electron，没有 Web 视图，无需等待。
    </td>
    <td width="25%" valign="top">
      <h3>🗂️ 真正的 PSD 文件</h3>
      打开、编辑并保存带图层的 Photoshop 文档。重新保存后，能在 psd-tools 测试集 309 个文件里的 307 个上保持一致的渲染结果。
    </td>
    <td width="25%" valign="top">
      <h3>🤖 面向智能体</h3>
      每一个操作都是一条命令，因此你可以用 UI、CLI、JSON 控制通道或 MCP 服务器来驱动同一套引擎。
    </td>
  </tr>
</table>

<br>

<a id="features"></a>

## 功能特性

这里的每张截图都是真实应用在公共领域艺术品上的工作状态，通过其控制通道离屏渲染而成。

<table>
  <tr>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-adjustments.jpg" alt="莫奈的《日出·印象》带有色阶与自然饱和度调整图层；右侧打开了色阶编辑器与带有均值、标准差和中位数的直方图面板" width="100%">
      <br>
      <sub>色阶与自然饱和度调整图层，配合实时的直方图面板。<br><i>日出·印象</i>，克劳德·莫奈，1872 年</sub>
      <h3>无后顾之忧地编辑</h3>
      调整图层让每一次编辑都保持实时可调。堆叠色阶（Levels）、曲线（Curves）、自然饱和度（Vibrance）、色相/饱和度（Hue/Saturation）等十几种图层，把它们蒙版到某个区域、重新排序或关闭，你的原始像素永远不会改变。
      <br><br>
      <b>16 种调整图层</b>，也可直接作用于像素，包括支持分通道编辑的曲线、带实时直方图的色阶、黑白、通道混合器、渐变映射、照片滤镜、可选颜色与颜色查找（.cube、.3dl、.look）。此外还有阴影/高光、替换颜色、匹配颜色、HDR 色调、去色与色调均化。
    </td>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-layer-styles.jpg" alt="图层样式对话框正在为 EARTHRISE 文字图层编辑外发光，同时启用了描边，背景是阿波罗 8 号拍摄的《地出》照片" width="100%">
      <br>
      <sub>在图层样式对话框中，为实时文字图层添加外发光与描边。<br><i>地出</i>，威廉·安德斯 / NASA，1968 年</sub>
      <h3>让照片脱颖而出的样式</h3>
      投影、内阴影、外发光与内发光、斜面和浮雕、绸缎、描边，以及颜色、渐变和图案叠加，可在任意图层（包括文字）上实时生效。图案来自一个图库（内置、编辑 › 定义图案、<code>.pat</code> 的导入/导出）以及 PSD 的 <code>Patt</code> 数据块。
      <br><br>
      在图层之间复制粘贴样式、一次性隐藏所有效果，并直接打开你 PSD 中的样式，渲染效果与 Photoshop 一致。
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-masks.jpg" alt="维米尔的《戴珍珠耳环的少女》：面部周围一个椭圆选区，以及一个色相/饱和度图层，其椭圆蒙版让面部之外的一切都变灰" width="100%">
      <br>
      <sub>一个椭圆选区变成色相/饱和度图层的蒙版，于是只有面部保留色彩。<br><i>戴珍珠耳环的少女</i>，约翰内斯·维米尔，约 1665 年</sub>
      <h3>读懂你图像的选区</h3>
      矩形/椭圆选框、套索与魔棒用于精准选择；快速选择、对象选择、选择主体让你把描摹工作交给电脑；选择并遮住（Select and Mask）用于打磨发丝级边缘。
      <br><br>
      羽化、扩展、收缩、平滑、扩展、重新选择。把任意选区变成图层蒙版、矢量路径或形状。智能选区在你本机运行，无需云端、无需账号。
    </td>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-type.jpg" alt="比尔斯塔特的《内华达山脉》中，标题 SIERRA NEVADA 正在画布上以 Georgia 字体编辑，配有一个署名行与一段正文说明；字符与段落控制面板处于打开状态" width="100%">
      <br>
      <sub>在画布上就地编辑的大标题，配有署名行与一段正文。<br><i>加利福尼亚的内华达山脉</i>，阿尔伯特·比尔斯塔特，1868 年</sub>
      <h3>优雅排版的文字</h3>
      点文字与段落文字，直接在画布上编辑，拥有完整的字符与段落控制：字体、字重、字号、行距、字距、对齐与颜色。<a href="https://github.com/storytold/photocraft/blob/main/docs/color-picker.md">完整的文字颜色选择器</a>还支持用像素放大镜进行屏幕取色。
      <br><br>
      文字图层保持可编辑，可套用图层样式，并能在 PSD 中往返保留。
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-vector.jpg" alt="在莫奈的《睡莲》之上，由形状图层（莲花、水、太阳、徽章与虚线环）构建的一个莲花徽章，莲花的路径锚点处于选中状态" width="100%">
      <br>
      <sub>由形状图层组成的徽章：渐变填充的莲花、一颗星与虚线环。<br><i>睡莲</i>，克劳德·莫奈，1906 年</sub>
      <h3>像素级精准的矢量</h3>
      矩形、椭圆、三角形、多边形、直线，以及钢笔、自由钢笔与曲率钢笔工具，配合与分辨率无关的形状图层、渐变填充，以及虚线、对齐的描边。
      <br><br>
      组合形状（合并、减去、相交、排除），在路径面板中保存路径，用作矢量蒙版，或对它们进行描边与填充。在我们的 PSD 语料中，116/116 个形状图层都与 Photoshop 的像素一致。
    </td>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-filters.jpg" alt="旋转扭曲（Twirl）滤镜对话框处于 320 度角度，在梵高《星月夜》上的一个椭圆选区内实时预览" width="100%">
      <br>
      <sub>旋转扭曲在画布上、仅选区内部实时预览。<br><i>星月夜</i>，文森特·梵高，1889 年</sub>
      <h3>提交之前先预览</h3>
      每个滤镜对话框都能在画布上、透过你的选区实时预览。模糊（高斯、方框、动感、径向、表面、智能、镜头、形状，以及模糊画廊：倾斜偏移、光圈、字段、旋转、路径）、锐化、减少杂色、扭曲（旋转扭曲、波浪、涟漪、置换、切变、之字形……）、像素化、风格化（油画、风、凸出……）、渲染（云彩、纤维、镜头光晕、光照效果）等等。
      <br><br>
      在智能对象上运行滤镜，它们会保持可编辑：随时更改、隐藏、重新排序或蒙版。
      <br><br>
      大半径模糊通过跨所有核心的求和盒（running-sum box）多次遍历实现：在 3.6 MP 图像上做半径 180 的高斯模糊不到一秒。
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-transform.jpg" alt="安塞尔·亚当斯的《提顿山脉与斯内克河》旋转副本周围的自由变换手柄，历史面板列出了打开、复制图层、自由变换等步骤" width="100%">
      <br>
      <sub>在旋转后的印样上进行自由变换，历史面板列出了每一步。<br><i>提顿山脉与斯内克河</i>，安塞尔·亚当斯，1942 年</sub>
      <h3>随你心意塑形</h3>
      自由变换支持缩放、旋转、斜切、扭曲与透视；精确的 90° 与 180° 旋转和翻转；再次变换（Transform Again）。图层、文字、形状、蒙版与选区一起变换。
      <br><br>
      完整的历史记录、切换上一步状态与历史记录画笔，意味着每一步都可撤销，哪怕是单独的一笔笔触。
    </td>
    <td width="50%" valign="top">
      <img src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/images/photocraft-export-light.jpg" alt="浅色主题下的导出为对话框，覆盖在克里姆特的《吻》之上：JPG 质量 90，缩放到 50%，带预览与约 684K 的大小估算" width="100%">
      <br>
      <sub>浅色主题下的"导出为"，带预览与文件大小估算。<br><i>吻</i>，古斯塔夫·克里姆特，1907–1908 年</sub>
      <h3>随处交付</h3>
      导出为（Export As）支持格式、质量、透明度与缩放，外加预览与即时的文件大小估算。一键快速导出为 PNG。
      <br><br>
      选择深色 Pro 主题、通透的 Studio 主题，或经典外观。
    </td>
  </tr>
</table>

<br>

<a id="everything-in-the-box"></a>

## 开箱即用的全部功能

<table>
  <tr>
    <td width="33%" valign="top">
      <h4>🧰 67 个工具</h4>
      Move · Artboard · Rectangular and Elliptical Marquee · Single Row Marquee · Single Column Marquee · Lasso · Polygonal Lasso · Magnetic Lasso · Object Selection · Quick Selection · Magic Wand · Crop · Perspective Crop · Slice · Slice Select · Frame · Eyedropper · Color Sampler · Ruler · Note · Count · Remove · Spot Healing Brush · Healing Brush · Patch · Content-Aware Move · Red Eye · Brush · Pencil · Mixer Brush · Color Replacement · Clone Stamp · Pattern Stamp · History Brush · Eraser · Background Eraser · Magic Eraser · Gradient · Paint Bucket · Blur · Sharpen · Smudge · Dodge · Burn · Sponge · Pen · Freeform Pen · Curvature Pen · Add Anchor Point · Delete Anchor Point · Convert Point · Horizontal and Vertical Type · Horizontal and Vertical Type Mask · Path Selection · Direct Selection · Rectangle · Ellipse · Triangle · Polygon · Line · Custom Shape · Hand · Rotate View · Zoom
    </td>
    <td width="33%" valign="top">
      <h4>🖌️ 真正的笔刷引擎</h4>
      形状动态、散布、纹理、双重笔刷、颜色动态、传递、笔刷姿态、湿边、积累与平滑（含牵引绳 Pulled String），由压感、倾斜、旋转与方向驱动。笔刷预设、从选区定义笔刷，以及确定性的、可回放的笔触。
    </td>
    <td width="33%" valign="top">
      <h4>🗃️ 图层，做到位</h4>
      组、剪贴蒙版、像素与矢量蒙版、填充图层（纯色、渐变与图案）、调整图层、带智能滤镜与无损变换和扭曲的实时智能对象、多选图层的对齐/分布/链接、Alpha 通道与快速蒙版、27 种 Photoshop 混合模式外加 6 种 Paint.NET 变体、不透明度与填充、锁定、颜色标签、图层类型筛选器、合并、拼合、栅格化、通过拷贝/剪切建立图层、贴入。
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h4>🎨 任意颜色，任意位深</h4>
      RGB、灰度、CMYK 与 Lab 文档，每通道 8、16 或 32 位。位深与色彩模型是运行时数据，因此每个工具都能在任何位深下工作。
      <br><br>
      纯 Rust 实现的真正 ICC 色彩管理：嵌入的配置文件、指定配置与转换为配置文件（四种渲染意图外加黑点补偿）、软打样（⌘Y）与色域警告（⇧⌘Y）在 GPU 上完成。
    </td>
    <td width="33%" valign="top">
      <h4>🗂️ 格式</h4>
      PSD 与 PSB、分层 TIFF（Photoshop 的图层数据存于 TIFF 中，可任意字节序读写）、<a href="https://github.com/storytold/photocraft/blob/main/docs/pdn.md">Paint.NET 的 PDN3（读取，含可编辑图层与全部 14 种混合模式）</a>、<a href="https://github.com/storytold/photocraft/blob/main/docs/ora.md">OpenRaster（读写，含图层、组与混合模式，供 Krita、MyPaint 与 GIMP 使用）</a>、<a href="https://github.com/storytold/photocraft/blob/main/docs/kra.md">Krita 的 .kra（读取，含绘画图层、组、混合模式与透明度蒙版）</a>、SVG（作为形状图层打开，作为矢量智能对象置入），以及扁平的 PNG、JPEG、TIFF、WebP（有损与无损）、GIF、BMP、TGA、ICO、QOI、PNM、OpenEXR、Radiance HDR 与 FITS（天文图像：8/16 位与 32 位浮点，灰度或 RGB，保留文件头），还有原生的 <code>.pcraft</code> 格式。扁平格式保留它们所支持的位深：PNG 保留 8/16 位样本，TIFF 保留 8/16 位与 32 位浮点样本，OpenEXR 保留半精度/浮点样本；JPEG、WebP 及其他 8 位格式会以导出警告的方式降低更高位深的样本。各格式详情见 <a href="https://github.com/storytold/photocraft/blob/main/crates/codecs/README.md#capability-matrix-default-build">编解码能力矩阵</a>。来自 iPhone 和 Mac 的 HEIC 照片为只读（包含在官方构建中；源码构建可使用可选的 <code>--features heif</code>）。AVIF 在可选的 <code>avif</code> 构建特性下仅可写入；AVIF 解码与 JPEG XL 均不可用。Affinity 文档（<code>.af</code>、<code>.afdesign</code>、<code>.afphoto</code>、<code>.afpub</code>）可原生打开，仅读取，含画板、图层、矢量、文字、图像与蒙版；效果、调整及其他不支持的部分会列在警告中，且 Affinity 导出不可用。
    </td>
    <td width="33%" valign="top">
      <h4>🪄 日常必备</h4>
      自动色调、对比度与颜色 · 色调均化 · 图像与画布大小 · 裁剪与修整 · 显示全部 · 编辑 › 填充与描边 · 合并拷贝 · 原位粘贴 · 参考线、标尺、网格与对齐吸附 · 动作录制与回放 · 命令面板（⌘F）。
    </td>
  </tr>
</table>

<br>

<a id="psd-without-compromise"></a>

## 毫厘不失真的 PSD

PhotoCraft 的 PSD 支持是一个独立的 crate，依据 Adobe 公开规范编写，并用真实世界的文件语料进行测试。

- **忠实的往返：** 打开并重新保存文档，在 psd-tools 测试集 309 个文件中的 307 个、以及我们混合的 ag-psd/psd-tools 集 170 个中的 169 个上渲染结果一致（`crates/io/tests/corpus.rs`；用 `cargo xtask corpus --psd-tools` 获取 psd-tools 集），任何我们尚未建模的部分（原始数据块、描述符、额外信息）会被保留而非丢弃。重新保存的文件与其源文件并非逐字节相同：PhotoCraft 会重写图像资源、图层记录与合成图。只有独立的 `photocraft-psd` crate 在不经过文档模型的情况下解析和写入文件，才能逐字节复现每一个可解析的语料文件（`crates/psd/tests/corpus.rs`）。
- **像素级匹配：** 一个合成预言机将我们的渲染与 Photoshop 自身的合并图像进行对比，涵盖渐变插值（经典、感知与线性）、图层效果、形状描边、剪贴与填充不透明度。
- **大型文档：** PSB、16 与 32 位文件，以及 CMYK 与 Lab 文档都能原生打开。

<a id="built-for-agents"></a>

## 为智能体而打造

每个菜单项、工具和对话框都运行来自一个拥有 500+ 命令的注册表中的命令。UI、CLI、JSON 控制通道与 MCP 服务器调用的都是同一批命令，因此你能点击的任何操作，脚本或 AI 智能体也都能做到。

```sh
# 无界面模式：打开、编辑、保存
photocraft-cli run wave.psd \
  --cmd filter.sharpen.smartSharpen     --params '{"amount":80}' \
  --cmd layer.newAdjustmentLayer.curves --params '{"points":[[0,0],[64,48],[192,212],[255,255]]}' \
  --out wave-final.png

# 把一个动作列表应用到一整个图片文件夹
photocraft-cli batch --actions grade.json --in ./raw --out ./graded

# 每个子命令都会自我说明
photocraft-cli batch --help

# 让智能体通过 MCP 驱动它（无界面，或桥接到正在运行的应用）
photocraft-cli mcp
```

桌面应用还提供了一个经过认证、仅限回环（loopback）的控制通道（`photocraft --control`），用于检视 UI 状态、用指针事件驱动工具，以及截取离屏截图。本 README 中的每张图片都是这样渲染出来的。参见 [`docs/control-protocol.md`](https://github.com/storytold/photocraft/blob/main/docs/control-protocol.md)。

<a id="under-the-hood"></a>

## 技术内幕

- **引擎优先：** 纯数据的文档模型与命令引擎，顶层是一层轻薄的 egui UI。分层在构建期通过 24 个 crate 强制执行。
- **两个合成器：** 一个 CPU 合成器作为参考预言机，一个 wgpu 合成器把画布放到 GPU 上。二者相互测试。
- **写时复制瓦片：** 256² 的稀疏瓦片让撤销变便宜、让超大画布变轻量，效果贴图按图层状态缓存。
- **在浏览器中运行：** 整套引擎与 UI 都能编译到 WebAssembly。
- **净室：** 仅依据公开规范与可观察行为实现。没有专有代码、着色器或资源。
- **经过测试：** 超过 1,700 项测试，包括 PSD 往返、合成生成器、合成器预言机与多深度检查。

<a id="get-started"></a>

## 开始使用

```sh
git clone https://github.com/storytold/photocraft
cd photocraft
cargo run --release -p photocraft -- image.psd   # 桌面应用
cargo test --workspace                           # 测试套件
```

UI 与文字工具所需的日文字体来自 [craft-fonts](https://github.com/storytold/craft-fonts)，这是一个可选的构建输入（桌面发布构建始终包含它）。没有它时，PhotoCraft 会使用你系统的 CJK 字体：

```sh
git clone https://github.com/storytold/craft-fonts ../craft-fonts
CRAFT_FONTS_DIR="$PWD/../craft-fonts" cargo run --release -p photocraft
```

新贡献者与 AI 智能体：请从 [`AGENTS.md`](https://github.com/storytold/photocraft/blob/main/AGENTS.md) 开始，然后是 [`docs/`](https://github.com/storytold/photocraft/tree/main/docs)。

适用于 macOS、Windows、Linux、FreeBSD 与 Web 的安装包都附在每个 [GitHub 发布](https://github.com/storytold/photocraft/releases) 中。在 Linux 上你可以选择 AppImage、<code>.deb</code>、<code>.rpm</code>、tar 包或 Flatpak 打包。该打包需要来自 [Flathub](https://flathub.org/setup) 的 freedesktop 运行时，`flatpak` 会一并提示安装：

```sh
flatpak install --user photocraft-<version>-linux-x86_64.flatpak   # 或 -linux-aarch64
flatpak run ai.storyteller.photocraft
```

Flatpak 通过主机的 CUPS 套接字打印（文件 › 打印直接以 IPP 与之对话，无需 `lp`）；如果没有 CUPS 或没有打印机，文件 › 打印会通过打印门户打开系统打印对话框。参见 [printing](https://github.com/storytold/photocraft/blob/main/docs/printing.md)。

AppImage 无需安装：首次运行会在 `~/.local/share` 注册其启动器图标与菜单项，这样在 Wayland 上 dock 就会显示 PhotoCraft 的图标。设置 `PHOTOCRAFT_NO_DESKTOP_INTEGRATION=1` 可跳过这一步，并参见 [`docs/releasing.md`](https://github.com/storytold/photocraft/blob/main/docs/releasing.md) › Linux 来撤销它。

在 Wayland 会话下，拖到窗口上的文件尚无法打开：egui 底层的窗口库 winit 0.30 尚不支持 Wayland 的拖放（#386）。请使用文件 › 打开，或在文件管理器中复制图片后用 Ctrl+V 粘贴。要拖放的话，请在 XWayland 下启动 PhotoCraft：`WAYLAND_DISPLAY= photocraft`、`WAYLAND_DISPLAY= ./photocraft-<version>-linux-x86_64.AppImage`，或 `flatpak run --nosocket=wayland --socket=x11 ai.storyteller.photocraft`。在 Wayland 上，PhotoCraft 会在一个提示里显示适用于你安装的命令，直到你关闭它。偏好设置 › 性能 › Linux 显示服务器 = X11 会在每次启动时做同样的事。在 fractional 显示缩放（125%、150%、175%）下，XWayland 窗口以较低分辨率绘制再由合成器放大，因此界面在那里会模糊；原生 Wayland 始终清晰（#1072）。

在 macOS 上，命令行工具以 `photocraft-cli-<version>-macos-universal.zip` 形式提供。该二进制文件使用与应用相同的开发者 ID 签名，并由 Apple 公证。裸二进制无法像 DMG 那样携带钉固的公证票据，因此首次运行时 macOS 会在线检查公证状态。你可以自行确认：

```sh
ditto -x -k photocraft-cli-<version>-macos-universal.zip .
spctl --assess --type install -vv photocraft-cli-<version>-macos-universal/photocraft-cli
# ... accepted, source=Notarized Developer ID（已接受，来源=已公证的开发者 ID）
```

在 FreeBSD 14（x86_64）上，发布版提供了一个按 `/usr/local` 布局的 tar 包。先安装运行时库，再解包到该处：

```sh
pkg install libxkbcommon wayland libX11 libXcursor libXrandr libXi libxcb mesa-libs vulkan-loader gtk3 fontconfig freetype2 alsa-lib
tar -xzf photocraft-<version>-freebsd-x86_64.tar.gz --strip-components 1 -C /usr/local
photocraft
```

维护者：[`docs/releasing.md`](https://github.com/storytold/photocraft/blob/main/docs/releasing.md) 说明了发布版如何构建、签名与发布。

> [!IMPORTANT]
> **状态：** PhotoCraft 目前处于早期 alpha 阶段，我们想坦诚地说明它所处的位置：Photoshop 的大部分功能面以某种形式存在，但**它还不能在专业的日常工作中替代 Photoshop**。最大的缺口在于 AI/生成式功能、15 个缺失的工具、排版与专业工作流的深度，以及插件兼容性。每个 Photoshop 菜单项都已连接到一个命令（[`docs/parity-checklist.md`](https://github.com/storytold/photocraft/blob/main/docs/parity-checklist.md)），但那衡量的是"接线"，而非"行为"。诚实的、逐维度的图景以及我们下一步的方向，见 [roadmap](https://github.com/storytold/photocraft/blob/main/ROADMAP.md) 与 [parity assessment](https://github.com/storytold/photocraft/blob/main/docs/target-app-parity.md)。请预期会有粗糙的边缘，并提交 issue（请附上你的操作系统、文档尺寸、图层数与截图）。你也可以在 [Discord](https://discord.gg/artcraft) 上告诉我们哪里出了问题。

## 社区打包

这些安装包由社区成员维护，而非 PhotoCraft 团队。

在 Gentoo 上，[::snakebyte overlay](https://github.com/switch87/snakebyte-overlay) 把 Linux 发布版打包为 `media-gfx/photocraft-bin`：

```sh
eselect repository add snakebyte git https://github.com/switch87/snakebyte-overlay.git
emaint sync -r snakebyte
echo 'media-gfx/photocraft-bin ~amd64' >> /etc/portage/package.accept_keywords/photocraft
emerge --ask media-gfx/photocraft-bin
```

## 文档

开发、架构、自动化、格式与安全相关的文档维护在 [PhotoCraft 文档书](https://github.com/storytold/photocraft/tree/main/book)。

要用 Docker 自行托管浏览器版本，参见 [Docker 网页托管](https://github.com/storytold/photocraft/blob/main/packaging/web/README.md#docker)。

## 安全

安全架构、威胁建模、解析器加固、模糊测试与漏洞报告，涵盖于 [安全文档](https://github.com/storytold/photocraft/tree/main/book/src/security/) 与仓库的 [安全策略](https://github.com/storytold/photocraft/blob/main/SECURITY.md)。

## 测试语料

PhotoCraft 用真实文件进行测试：我们自己的、由 Photoshop 创作的预言机 PSD，位于
[photocraft-corpus](https://github.com/storytold/photocraft-corpus)，外加 psd-tools、ag-psd 与 PngSuite 集合，均已固定并经过 sha256 校验。用 `cargo xtask corpus --all` 获取它们，用
`cargo xtask test-corpus` 运行测试（详情见 [docs/development.md](https://github.com/storytold/photocraft/blob/main/docs/development.md#test-corpora)）。

<a id="downloads"></a>

## 下载

**刚接触 PhotoCraft？** 请从 [getartcraft.com 上的 PhotoCraft 页面](https://getartcraft.com/apps/photocraft) 下载。这是最简单的安装方式。

**想要特定的构建或格式？** 在 GitHub 上，[最新发布](https://github.com/storytold/photocraft/releases/latest) 列出了下方所有构建，[所有发布](https://github.com/storytold/photocraft/releases) 则有更早的版本及其说明。文件名中的 `<ver>` 是版本号，`SHA256SUMS.txt` 列出了每个文件的校验和。

### Windows

| 构建 | 安装包 | 便携版 |
|---|---|---|
| x64（64 位 Intel/AMD） | `photocraft-<ver>-windows-x64.msi` | `photocraft-<ver>-windows-x64-portable.zip` |
| arm64（骁龙及其他 ARM 电脑） | `photocraft-<ver>-windows-arm64.msi` | `photocraft-<ver>-windows-arm64-portable.zip` |
| x86（32 位） | `photocraft-<ver>-windows-x86.msi` | `photocraft-<ver>-windows-x86-portable.zip` |

安装包与可执行文件均经过代码签名。

### macOS

| 构建 | 文件 | 说明 |
|---|---|---|
| 应用，通用版（Apple 芯片 + Intel） | `photocraft-<ver>-macos-universal.dmg` | 已签名并公证 |
| 命令行工具，通用版 | `photocraft-cli-<ver>-macos-universal.zip` | 已签名并公证 |

### Linux

| 格式 | x86_64 | aarch64（ARM64） | 说明 |
|---|---|---|---|
| AppImage | `photocraft-<ver>-linux-x86_64.AppImage` | `photocraft-<ver>-linux-aarch64.AppImage` | 随处可运行；通过 AppImageUpdate（`.zsync` 文件）自我更新 |
| Flatpak | `photocraft-<ver>-linux-x86_64.flatpak` | `photocraft-<ver>-linux-aarch64.flatpak` | 沙箱化；`flatpak install --user <文件>` |
| Debian/Ubuntu | `photocraft-<ver>-linux-x86_64.deb` | `photocraft-<ver>-linux-aarch64.deb` | |
| Fedora/RHEL/openSUSE | `photocraft-<ver>-linux-x86_64.rpm` | `photocraft-<ver>-linux-aarch64.rpm` | |
| Tar 包 | `photocraft-<ver>-linux-x86_64.tar.gz` | `photocraft-<ver>-linux-aarch64.tar.gz` | 任意位置解包 |

RISC-V（riscv64）：仅有 `photocraft-<ver>-linux-riscv64.tar.gz`，基于 Ubuntu 24.04 构建（需要 glibc 2.39+）。

### FreeBSD

| 构建 | 文件 |
|---|---|
| x86_64 | `photocraft-<ver>-freebsd-x86_64.tar.gz` |

### Web（WebAssembly）

| 构建 | 文件 | 说明 |
|---|---|---|
| 静态站点 | `photocraft-web-<ver>.zip` | 可在现代浏览器中运行；可托管于任意静态服务器 |

<a id="the-crafting-apps"></a>

## Crafting 应用

PhotoCraft 是 **Crafting 应用** 之一：来自 [ArtCraft](https://getartcraft.com/) 团队的免费、开源创意工具，每一个都用 Rust 从零编写，且都能独立运行。

| | 应用 | 用途 | 代码 | 了解更多 |
|:-:|---|---|---|---|
| <img src="https://raw.githubusercontent.com/storytold/photocraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.photocraft.png" alt="" width="32" height="32"> | **PhotoCraft** | **图像处理：图层、蒙版、文字与真正的 PSD 文件 · 你在这里** | [GitHub](https://github.com/storytold/photocraft) | [官网](https://getartcraft.com/apps/photocraft) |
| <img src="https://raw.githubusercontent.com/storytold/vectorcraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.vectorcraft.png" alt="" width="32" height="32"> | **VectorCraft** | 矢量插画 | [GitHub](https://github.com/storytold/vectorcraft) | [官网](https://getartcraft.com/apps/vectorcraft) |
| <img src="https://raw.githubusercontent.com/storytold/filmcraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.filmcraft.png" alt="" width="32" height="32"> | **FilmCraft** | 视频编辑、调色与声音 | [GitHub](https://github.com/storytold/filmcraft) | [官网](https://getartcraft.com/apps/filmcraft) |
| <img src="https://raw.githubusercontent.com/storytold/lightcraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.lightcraft.png" alt="" width="32" height="32"> | **LightCraft** | 照片图库与 Raw 显影 | [GitHub](https://github.com/storytold/lightcraft) | [官网](https://getartcraft.com/apps/lightcraft) |
| <img src="https://raw.githubusercontent.com/storytold/pdfcraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.pdfcraft.png" alt="" width="32" height="32"> | **PdfCraft** | 阅读、整理与保护 PDF | [GitHub](https://github.com/storytold/pdfcraft) | [官网](https://getartcraft.com/apps/pdfcraft) |
| <img src="https://raw.githubusercontent.com/storytold/effectcraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.effectcraft.png" alt="" width="32" height="32"> | **EffectCraft** | 动态图形与视觉特效 | [GitHub](https://github.com/storytold/effectcraft) | [官网](https://getartcraft.com/apps/effectcraft) |
| <img src="https://raw.githubusercontent.com/storytold/designcraft/main/assets/app-icon/hicolor/64x64/apps/ai.storyteller.designcraft.png" alt="" width="32" height="32"> | **DesignCraft** | 页面排版与出版 | [GitHub](https://github.com/storytold/designcraft) | [官网](https://getartcraft.com/apps/designcraft) |

还有 [**ArtCraft**](https://getartcraft.com/) 本身，我们面向想要真正掌控权的艺术家的 AI 图像与视频工作室。

Crafting 应用共享同一套约定：净室且纯 Rust、在 macOS、Windows 与 Linux 上原生运行、通过 WebAssembly 在浏览器中使用，并且都能被智能体完整驱动。

<br>

<p align="center">
  <a href="https://discord.gg/artcraft"><img alt="Join the ArtCraft community on Discord" src="https://img.shields.io/badge/Join%20us%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="40"></a>
</p>

<h3 align="center">来和我们一起创作吧</h3>

<p align="center">
  我们的 Discord 是各类艺术家的聚集地：画画的、摄影的、画插画的、剪片的、排版的，以及还在摸索自己想做些什么的人。分享你的作品，寻求帮助，告诉我们哪里出了问题，或者告诉我们你希望这些工具能做到什么。无论你的媒介是什么、无论你做了多久，这里都欢迎你。
</p>

<p align="center">
  <a href="https://discord.gg/artcraft"><b>discord.gg/artcraft</b></a> ·
  <a href="https://getartcraft.com/">getartcraft.com</a> ·
  <a href="https://getartcraft.com/apps">Crafting 应用</a> ·
  <a href="https://getartcraft.com/apps/photocraft">PhotoCraft</a>
</p>

---

## 许可证与致谢

PhotoCraft 采用双许可证，可在 [MIT](https://github.com/storytold/photocraft/blob/main/LICENSE-MIT) 或 [Apache-2.0](https://github.com/storytold/photocraft/blob/main/LICENSE-APACHE) 之间任选。
版权所有 (c) 2026 ArtCraft 团队与 PhotoCraft 贡献者。必要的声明见 [NOTICE](https://github.com/storytold/photocraft/blob/main/NOTICE)。

打包的字体、图标、图片及其他资源保留它们各自的开放许可证；每一条都列在
[ATTRIBUTION.md](https://github.com/storytold/photocraft/blob/main/ATTRIBUTION.md) 中，含作者、来源与许可证。

展示的每件艺术品均处于公共领域（Wikimedia Commons、NASA、美国国家档案馆）；来源列在 [`docs/images/SOURCES.md`](https://github.com/storytold/photocraft/blob/main/docs/images/SOURCES.md)。

ArtCraft 的名称、字标与徽标位于 [`docs/brand/`](https://github.com/storytold/photocraft/tree/main/docs/brand)，是 ArtCraft 团队的商标，不受本许可证覆盖。它们只能在未经修改的情况下使用，且只能作为本仓库与 PhotoCraft 的一部分，依据 [`docs/brand/LICENSE-brand.txt`](https://github.com/storytold/photocraft/blob/main/docs/brand/LICENSE-brand.txt)。Fork 与修改版本必须移除它们。

<sub>Adobe、Photoshop、Illustrator、Premiere Pro、Lightroom、Acrobat、After Effects 与 InDesign 是 Adobe Inc. 在美国和/或其他国家/地区的商标或注册商标。PhotoCraft 是一个独立的开源项目，与 Adobe Inc. 无隶属、赞助或背书关系；使用这些名称仅用于描述其所兼容的工作流。</sub>

<p align="center">
  <a href="https://getartcraft.com/"><img alt="ArtCraft" src="https://raw.githubusercontent.com/storytold/photocraft/main/docs/brand/artcraft-mark.svg" width="28"></a><br>
  <sub>由 <a href="https://getartcraft.com/">ArtCraft</a> 团队与社区打造。</sub>
</p>

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=storytold/photocraft&type=Date&legend=top-left)](https://www.star-history.com/?repos=storytold%2Fphotocraft&type=date&legend=top-left)
