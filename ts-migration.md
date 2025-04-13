# JavaScript 到 TypeScript 迁移计划

本文档描述了将 guitar-chord-images 项目从 JavaScript 迁移到 TypeScript 的计划和步骤。这是一个渐进式迁移，首先将项目迁移到 TypeScript 环境，然后逐步添加类型声明。

## 迁移计划概述

### 第一阶段：基础迁移准备

- 安装 TypeScript 和相关依赖
- 创建并配置 tsconfig.json
- 更新构建工具配置

### 第二阶段：文件扩展名迁移

- 重命名主要入口文件（.jsx → .tsx）
- 迁移组件文件（.jsx → .tsx）
- 迁移工具和上下文文件（.js → .ts）
- 迁移配置文件（.cjs → .ts）

### 第三阶段：引入基本类型

- 添加第三方库的类型声明
- 定义基础类型接口

### 第四阶段：渐进式强类型实现

- 逐步添加类型声明
- 改进类型安全性

## 详细迁移步骤

### 阶段一：基础迁移准备

1. **安装 TypeScript 和相关依赖**
   - 安装 typescript、@types/react、@types/react-dom、@types/node、tsx 等依赖
   - 更新 package.json 中的脚本以支持 TypeScript

2. **创建并配置 tsconfig.json**
   - 基于现有 jsconfig.json 创建
   - 设置宽松的类型检查配置，允许渐进式迁移
   - 启用 allowJs 选项允许混合使用 JS 和 TS

3. **更新构建工具配置**
   - 将 vite.config.js 更新为 vite.config.ts
   - 配置 Jest 以支持 TypeScript 测试

### 阶段二：文件扩展名迁移

1. **重命名主要入口文件**
   - src/index.jsx → src/index.tsx
   - src/App.jsx → src/App.tsx
   - 修复由扩展名变更引起的导入问题

2. **迁移组件文件**
   - 将 components 目录下的 .jsx 文件改为 .tsx
   - 保持代码逻辑不变，暂不添加类型声明
   - 处理可能出现的编译错误

3. **迁移工具和上下文文件**
   - 将 hooks、contexts、lib 等目录中的文件从 .js 改为 .ts
   - 将这些目录中的 JSX 文件从 .jsx 改为 .tsx

4. **迁移配置文件**
   - 将 babel.config.cjs 转换为 babel.config.ts
   - 将 postcss.config.cjs 转换为 postcss.config.ts
   - 将 tailwind.config.cjs 转换为 tailwind.config.ts
   - 使用 export default 替代 module.exports
   - 安装 tsx 包以支持 TypeScript 配置文件的执行

### 阶段三：引入基本类型

1. **添加第三方库的类型声明**
   - 确保所有第三方库都有对应的类型声明
   - 为没有类型声明的库添加 @types 包或创建声明文件

2. **定义基础类型接口**
   - 创建 src/types 目录存放类型定义
   - 为和弦数据结构定义类型
   - 为组件 props 创建基本接口

### 阶段四：渐进式强类型实现

1. **逐步添加类型声明**
   - 从核心数据模型开始添加明确的类型
     - 和弦数据结构(Chord)的完整类型定义，包括属性如音符、指法、调性等
     - 乐器配置(Instrument)相关的类型，如吉他弦数、音高设置等
     - 图像生成配置(ImageConfig)类型，如尺寸、颜色、样式等
   - 为函数参数和返回值定义类型
     - 为和弦计算函数添加参数和返回值类型
     - 为图像渲染函数添加明确的类型签名
     - 为工具函数(utilities)添加精确的类型约束
   - 为组件状态添加类型
     - 为每个React组件定义Props接口
     - 为组件内部状态定义类型
     - 为context提供者和消费者添加类型
   - 为事件处理函数添加类型
     - 为用户交互事件处理程序添加类型
     - 为自定义事件添加类型定义
   - 为API响应添加类型（如有）
     - 如果有API调用，为请求和响应添加类型

2. **改进类型安全性**
   - 消除代码中的 any 类型
   - 在 tsconfig.json 中逐步启用更严格的类型检查
     - 启用 noImplicitAny: 禁止隐式any类型
     - 启用 strictNullChecks: 严格的null和undefined检查
     - 启用 strictFunctionTypes: 函数参数类型检查
     - 最终启用 strict: true 全局严格模式
   - 减少类型断言(as)的使用
     - 用更精确的类型定义替代类型断言
   - 完善与第三方库交互的类型定义
     - 为没有类型的依赖创建自定义类型声明
   - 为配置文件添加强类型
     - 为各种配置对象添加明确的类型接口

## 当前完成情况

- [x] **阶段一：基础迁移准备**
  - [x] 安装 TypeScript 和相关依赖
  - [x] 创建并配置 tsconfig.json
  - [x] 更新构建工具配置

- [x] **阶段二：文件扩展名迁移**
  - [x] 重命名主要入口文件
  - [x] 迁移组件文件
  - [x] 迁移工具和上下文文件
  - [x] 迁移配置文件

- [x] **阶段三：引入基本类型**
  - [x] 添加第三方库的类型声明
  - [x] 定义基础类型接口

- [ ] **阶段四：渐进式强类型实现**
  - [ ] 逐步添加类型声明
  - [ ] 改进类型安全性