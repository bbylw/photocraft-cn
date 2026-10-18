export const site = {
  name: 'PhotoCraft',
  tagline: '净室重写的开源图像编辑器',
  github: 'https://github.com/storytold/photocraft',
  releases: 'https://github.com/storytold/photocraft/releases/latest',
  download: 'https://getartcraft.com/apps/photocraft',
  docs: 'https://github.com/storytold/photocraft/tree/main/book',
  discord: 'https://discord.gg/artcraft',
  artcraft: 'https://getartcraft.com/',
  issues: 'https://github.com/storytold/photocraft/issues',
};

export type Specimen =
  | { kind: 'image'; file: string }
  | { kind: 'fragment'; id: 'psd' | 'cli' | 'platforms' };

export type Entry = {
  name: string;
  desc: string;
  href: string;
  specimen: Specimen;
  note: string;
  label: string;
};

export const entries: Entry[] = [
  {
    name: '调整图层',
    desc: '十六种，实时可调',
    href: '#adjustments',
    specimen: { kind: 'image', file: 'photocraft-adjustments.jpg' },
    note: '莫奈《日出·印象》，1872 年，公共领域。',
    label: '画布截图',
  },
  {
    name: '图层样式',
    desc: '投影、发光、描边',
    href: '#style',
    specimen: { kind: 'image', file: 'photocraft-layer-styles.jpg' },
    note: '阿波罗 8 号拍摄的《地出》，1968 年。',
    label: '画布截图',
  },
  {
    name: '选区与蒙版',
    desc: '智能选区，只在本机跑',
    href: '#mask',
    specimen: { kind: 'image', file: 'photocraft-masks.jpg' },
    note: '维米尔《戴珍珠耳环的少女》，约 1665 年，公共领域。',
    label: '画布截图',
  },
  {
    name: '文字',
    desc: '在画布上就地编辑',
    href: '#type',
    specimen: { kind: 'image', file: 'photocraft-type.jpg' },
    note: '比尔斯塔特《内华达山脉》，1868 年，公共领域。',
    label: '画布截图',
  },
  {
    name: '矢量形状',
    desc: '一百一十六个形状图层，像素一致',
    href: '#vector',
    specimen: { kind: 'image', file: 'photocraft-vector.jpg' },
    note: '莫奈《睡莲》，约 1906 年，公共领域。',
    label: '画布截图',
  },
  {
    name: '滤镜',
    desc: '上百种，提交前先预览',
    href: '#filter',
    specimen: { kind: 'image', file: 'photocraft-filters.jpg' },
    note: '梵高《星月夜》，1889 年，公共领域。',
    label: '画布截图',
  },
  {
    name: 'PSD 文件',
    desc: '三百零九份里，三百零七份一致',
    href: '#psd',
    specimen: { kind: 'fragment', id: 'psd' },
    note: '四个语料库的 PSD 往返一致率。',
    label: 'PSD 往返',
  },
  {
    name: '命令行与 MCP',
    desc: '五百多条命令，同一套引擎',
    href: '#cli',
    specimen: { kind: 'fragment', id: 'cli' },
    note: '同一个命令注册表，由命令行驱动。',
    label: '命令行',
  },
  {
    name: '平台',
    desc: '五个系统，外加浏览器',
    href: '#platforms',
    specimen: { kind: 'fragment', id: 'platforms' },
    note: '五个系统与浏览器的构建矩阵。',
    label: '构建矩阵',
  },
];

export type Part = {
  id: string;
  name: string;
  file: string;
  alt: string;
  art: string;
  lead: string;
  body: string;
  specs: [string, string][];
};

export const parts: Part[] = [
  {
    id: 'style',
    name: '图层样式',
    file: 'photocraft-layer-styles.jpg',
    alt: '图层样式对话框正在为 EARTHRISE 文字图层编辑外发光，同时启用了描边，背景是阿波罗 8 号拍摄的《地出》照片',
    art: '背景为阿波罗 8 号拍摄的《地出》，1968 年',
    lead: '十种效果，在任意图层上实时生效，文字也算。',
    body: '投影、内阴影、外发光、内发光、斜面和浮雕、绸缎、描边，以及颜色、渐变与图案叠加。样式可以在图层之间复制粘贴，可以一次全部隐藏，PSD 里带来的样式打开就是 Photoshop 的渲染结果。',
    specs: [
      ['效果', '10 种'],
      ['图案', '.pat / Patt 块'],
      ['带样式的图层', '含实时文字'],
    ],
  },
  {
    id: 'mask',
    name: '选区与蒙版',
    file: 'photocraft-masks.jpg',
    alt: '维米尔的《戴珍珠耳环的少女》：面部周围一个椭圆选区，以及一个色相/饱和度图层，其椭圆蒙版让面部之外的一切都变灰',
    art: '背景为维米尔《戴珍珠耳环的少女》，约 1665 年',
    lead: '把描摹交给电脑，然后把边缘交还给你。',
    body: '快速选择、对象选择、选择主体负责粗活；选择并遮住用来打磨发丝级边缘。羽化、扩展、收缩、平滑之后，任意选区都能变成图层蒙版、矢量路径或形状。',
    specs: [
      ['智能选区', '本机运行'],
      ['蒙版', '像素 / 矢量 / 剪贴'],
      ['需要账号', '不需要'],
    ],
  },
  {
    id: 'type',
    name: '文字',
    file: 'photocraft-type.jpg',
    alt: '比尔斯塔特的《内华达山脉》中，标题 SIERRA NEVADA 正在画布上以 Georgia 字体编辑，配有一个署名行与一段正文说明',
    art: '背景为比尔斯塔特《内华达山脉》，1868 年',
    lead: '点文字与段落文字，直接在画布上改。',
    body: '完整的字符与段落控制：字体、字重、字号、行距、字距、对齐与颜色。文字颜色选择器带像素放大镜，能从画面里直接取色。文字图层保持可编辑，可以套用图层样式，并能在 PSD 中往返保留。',
    specs: [
      ['文字类型', '点 / 段落'],
      ['取色', '像素放大镜'],
      ['PSD 往返', '可编辑'],
    ],
  },
  {
    id: 'vector',
    name: '矢量形状',
    file: 'photocraft-vector.jpg',
    alt: '在莫奈的《睡莲》之上，由形状图层构建的莲花徽章，莲花的路径锚点处于选中状态',
    art: '背景为莫奈《睡莲》，约 1906 年',
    lead: '与分辨率无关的形状图层，锚点能选中。',
    body: '矩形、椭圆、三角形、多边形、直线与自定义形状；钢笔、自由钢笔与曲率钢笔。合并、减去、相交、排除，路径存进路径面板，或直接描边与填充。',
    specs: [
      ['布尔运算', '4 种'],
      ['形状图层', '116 / 116 一致'],
      ['渐变填充', '支持'],
    ],
  },
  {
    id: 'filter',
    name: '滤镜',
    file: 'photocraft-filters.jpg',
    alt: '旋转扭曲滤镜对话框处于 320 度角度，在梵高《星月夜》上的一个椭圆选区内实时预览',
    art: '背景为梵高《星月夜》，1889 年',
    lead: '每个对话框都能透过选区，在画布上先看一遍。',
    body: '模糊、锐化、减少杂色、扭曲、像素化、风格化、渲染，以及模糊画廊的倾斜偏移、光圈、字段、旋转与路径。智能对象上的滤镜保持可编辑。大半径模糊走求和盒多次遍历：3.6 MP 的图像做半径 180 的高斯模糊不到一秒。',
    specs: [
      ['滤镜族', '7 类'],
      ['智能滤镜', '可改、可隐藏'],
      ['半径 180 高斯', '不到 1 秒'],
    ],
  },
];

export const figures: [string, string][] = [
  ['307 / 309', 'psd-tools 测试集里的文件，打开再重新保存后渲染一致。'],
  ['169 / 170', '混合的 ag-psd / psd-tools 语料，同样往返一致。'],
  ['116 / 116', '测试语料里的形状图层，与 Photoshop 的像素一致。'],
  ['1,700+', '测试项看着这些数字，包括 PSD 往返、合成器预言机与多深度检查。'],
];

export const platforms: { name: string; formats: string }[] = [
  { name: 'Windows', formats: 'MSI · x64 / ARM64 / x86' },
  { name: 'macOS', formats: 'DMG + CLI · Universal' },
  { name: 'Linux', formats: 'AppImage · Flatpak · deb · rpm' },
  { name: 'FreeBSD', formats: 'tar.gz · x86_64' },
  { name: 'Web', formats: 'ZIP · WebAssembly' },
];

export const apps = [
  { name: 'PhotoCraft', use: '图像处理', current: true, href: '#top' },
  { name: 'VectorCraft', use: '矢量插画', href: 'https://getartcraft.com/apps/vectorcraft' },
  { name: 'FilmCraft', use: '视频与调色', href: 'https://getartcraft.com/apps/filmcraft' },
  { name: 'LightCraft', use: '图库与 Raw', href: 'https://getartcraft.com/apps/lightcraft' },
  { name: 'PdfCraft', use: 'PDF', href: 'https://getartcraft.com/apps/pdfcraft' },
  { name: 'EffectCraft', use: '动态图形', href: 'https://getartcraft.com/apps/effectcraft' },
  { name: 'DesignCraft', use: '排版出版', href: 'https://getartcraft.com/apps/designcraft' },
];

export type QA = { q: string; a: string };

export const faq: QA[] = [
  {
    q: '现在能替代 Photoshop 吗？',
    a: '不能。Photoshop 的大部分功能面以某种形式存在，但 AI 与生成式功能、十五个缺失的工具、排版与专业工作流的深度、插件兼容性都是真正的缺口。每个菜单项都已经接到一条命令，那衡量的是「接线」，不是「行为」。这是一个诚实的早期 alpha。',
  },
  {
    q: 'PSD 真的能往返吗？',
    a: '能，并且有数字：psd-tools 测试集三百零九份里三百零七份渲染一致，混合语料一百七十份里一百六十九份一致。尚未建模的部分会被保留而不是丢弃。重新保存的文件并非逐字节相同，图像资源、图层记录与合成图会被重写。',
  },
  {
    q: '支持哪些格式？',
    a: 'PSD 与 PSB、分层 TIFF、Paint.NET 的 PDN3、OpenRaster、Krita 的 .kra、SVG，以及 PNG、JPEG、TIFF、WebP、GIF、BMP、TGA、ICO、QOI、PNM、OpenEXR、Radiance HDR、FITS 与原生 .pcraft。HEIC 只读，AVIF 只写，Affinity 文档可原生打开但仅读取。',
  },
  {
    q: '为什么没有 Electron？',
    a: '因为不需要。引擎是纯数据的文档模型与命令引擎，UI 是上面一层轻薄的 egui，画布交给 wgpu（Metal、Vulkan、DX12、WebGPU）合成。没有 Web 视图，没有 Chromium。',
  },
  {
    q: '智能体能驱动它做什么？',
    a: 'UI、CLI、JSON 控制通道与 MCP 服务器调用的是同一个注册表里的五百多条命令，所以你能点到的，脚本或 Agent 也能做到。桌面应用另有仅限回环的认证控制通道，可以检视界面状态、用指针事件驱动工具、截取离屏截图。',
  },
  {
    q: '许可证是什么？',
    a: 'MIT 或 Apache-2.0，二者任选。ArtCraft 的名称、字标与徽标是商标，不在这两个许可证覆盖范围内；Fork 与修改版本必须移除它们。',
  },
  {
    q: 'Linux 上为什么拖不进文件？',
    a: 'Wayland 会话下 egui 底层的 winit 0.30 还不支持拖放。用文件 › 打开，或复制图片后 Ctrl+V 粘贴；也可以让 PhotoCraft 跑在 XWayland 下：WAYLAND_DISPLAY= photocraft。',
  },
];
