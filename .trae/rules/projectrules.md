# 前端开发规范

## 图标库统一规则

- **管理后台 (Admin)**：
  - 必须使用 **Ant Design Icons** (`@ant-design/icons`)。
  - 默认图标风格：`<SearchOutlined />`、`<UserOutlined />`、`<SettingOutlined />`。
  - 禁止使用 Emoji、SVG 字符串或其他第三方图标库。

- **小程序 (MP)**：
  - 必须使用 **Iconfont** 或 **WeUI** 图标（根据你的实际技术栈二选一）。
  - 类名格式：`class="iconfont icon-home"`。

## 通用约束
- 生成代码时，必须自动添加对应的 `import` 语句（如 `import { SearchOutlined } from '@ant-design/icons';`）。
- 如果设计稿中的图标在指定库中不存在，请使用功能最接近的图标替代，并在代码注释中说明。