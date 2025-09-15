# SelectWithStorage 使用示例

## 基本用法

```tsx
import { SelectWithStorage, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

function MyComponent() {
  return (
    <SelectWithStorage storageKey="my-select-preference">
      <SelectTrigger>
        <SelectValue placeholder="选择一个选项" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">选项1</SelectItem>
        <SelectItem value="option2">选项2</SelectItem>
        <SelectItem value="option3">选项3</SelectItem>
      </SelectContent>
    </SelectWithStorage>
  );
}
```

## 功能特性

1. **localStorage 自动缓存**: 用户选择的值会自动保存到 localStorage
2. **页面刷新持久化**: 页面刷新后会自动从 localStorage 恢复之前的选择
3. **自动默认值**: 如果 localStorage 中没有值，会自动选择第一个选项
4. **多语言支持**: placeholder 文本会根据当前语言自动翻译
5. **SSR 兼容**: 正确处理服务端渲染和客户端水合

## API 参数

### SelectWithStorage Props

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `storageKey` | `string` | ✓ | localStorage 的键名 |
| `defaultValue` | `string` | ✗ | 手动指定的默认值（优先级高于自动检测的第一项） |
| `onValueChange` | `(value: string) => void` | ✗ | 值变化时的回调函数 |
| `placeholder` | `string` | ✗ | 自定义 placeholder 文本（不指定时使用多语言默认值） |
| `value` | `string` | ✗ | 受控模式的值 |
| `children` | `ReactNode` | ✓ | 子组件（SelectTrigger, SelectContent 等） |

## 多语言配置

组件会自动使用以下多语言键值：

- `pleaseSelect`: 默认的 placeholder 文本
- `selectOption`: "选择选项" 的通用文本
- `noOptions`: "暂无选项" 的提示文本

确保在语言文件中包含这些键值：

```json
{
  "pleaseSelect": "请选择...",
  "selectOption": "选择一个选项",
  "noOptions": "暂无可选项"
}
```

## 高级用法

### 受控模式

```tsx
function ControlledSelect() {
  const [value, setValue] = useState("");

  return (
    <SelectWithStorage
      storageKey="controlled-select"
      value={value}
      onValueChange={setValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">选项 A</SelectItem>
        <SelectItem value="b">选项 B</SelectItem>
      </SelectContent>
    </SelectWithStorage>
  );
}
```

### 指定默认值

```tsx
<SelectWithStorage
  storageKey="theme-select"
  defaultValue="light"
>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">浅色主题</SelectItem>
    <SelectItem value="dark">深色主题</SelectItem>
  </SelectContent>
</SelectWithStorage>
```