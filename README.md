> 本项目是基于尚硅谷-《硅谷甄选项目》进行模板搭建，模板基于vue3、pinia、vite等构建。
>
> https://www.bilibili.com/video/BV1Xh411V7b5?p=1&spm_id_from=pageDriver&vd_source=71ee50a188aef8badf0cf803edb637dc

## 1. 项目初始化

### 1.1 环境准备

- node v16.19.1

- pnpm 8.12.1

  ```js
  npm i -g pnpm
  ```

### 1.2 初始化项目

1. pnpm create vite

2. 选择vue、TypeScript

   ![](https://tuchuang1.pages.dev/img/vue_template/image-20231222142403701.png)

3. 进入项目

   ```js
   // 安装依赖
   pnpm i
   
   // 安装完依赖运行程序
   pnpm run dev
   ```

## 2. 项目配置

### 2.1 eslint配置

1. 作用

   eslint中文官网:http://eslint.cn/

   ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/) 于2013年6月创建的开源项目。它的目标是提供一个插件化的**javascript代码检测工具**

2. 步骤

   - 首先安装eslint

     ```js
     pnpm i eslint -D
     ```

   - 生成配置文件:.eslint.cjs

     ```js
     npx eslint --init
     ```

     ![](https://tuchuang1.pages.dev/img/vue_template/image-20231222144222874.png)

   - .eslint.cjs配置文件解析

     ```js
     module.exports = {
       //运行环境
       env: {
         browser: true, //浏览器端
         es2021: true, //es2021
       },
       //规则继承
       extends: [
         //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
         //比如:函数不能重名、对象不能出现重复key
         'eslint:recommended',
         //vue3语法规则
         'plugin:vue/vue3-essential',
         //ts语法规则
         'plugin:@typescript-eslint/recommended',
       ],
       //要为特定类型的文件指定处理器
       overrides: [],
       //指定解析器:解析器
       //Esprima 默认解析器
       //Babel-ESLint babel解析器
       //@typescript-eslint/parser ts解析器
       parser: '@typescript-eslint/parser',
       //指定解析器选项
       parserOptions: {
         ecmaVersion: 'latest', //校验ECMA最新版本
         sourceType: 'module', //设置为"script"（默认），或者"module"代码在ECMAScript模块中
       },
       //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
       //该eslint-plugin-前缀可以从插件名称被省略
       plugins: ['vue', '@typescript-eslint'],
       //eslint规则
       rules: {},
     }
     ```

3. 安装vue3环境代码校验插件

   - 插件作用

     ```js
     # 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
     "eslint-config-prettier",
     "eslint-plugin-import",
     "eslint-plugin-node",
     # 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
     "eslint-plugin-prettier",
     # vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南
     "eslint-plugin-vue",
     # 该解析器允许使用Eslint校验所有babel code
     "@babel/eslint-parser",
     ```

   - 安装指令

     ```js
     pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
     ```

4. 修改.eslintrc.cjs配置文件

   ```js
   // @see https://eslint.bootcss.com/docs/rules/

   module.exports = {
     env: {
       browser: true,
       es2021: true,
       node: true,
       jest: true,
     },
     /* 指定如何解析语法 */
     parser: 'vue-eslint-parser',
     /** 优先级低于 parse 的语法解析配置 */
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       parser: '@typescript-eslint/parser',
       jsxPragma: 'React',
       ecmaFeatures: {
         jsx: true,
       },
     },
     /* 继承已有的规则 */
     extends: [
       'eslint:recommended',
       'plugin:vue/vue3-essential',
       'plugin:@typescript-eslint/recommended',
       'plugin:prettier/recommended',
     ],
     plugins: ['vue', '@typescript-eslint'],
     /*
      * "off" 或 0    ==>  关闭规则
      * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
      * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
      */
     rules: {
       // eslint（https://eslint.bootcss.com/docs/rules/）
       'no-var': 'error', // 要求使用 let 或 const 而不是 var
       'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
       'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
       'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
       'no-unexpected-multiline': 'error', // 禁止空余的多行
       'no-useless-escape': 'off', // 禁止不必要的转义字符

       // typeScript (https://typescript-eslint.io/rules)
       '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
       '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
       '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
       '@typescript-eslint/no-non-null-assertion': 'off',
       '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
       '@typescript-eslint/semi': 'off',

       // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
       'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
       'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
       'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
       'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
     },
   }
   ```

5. 配置忽略文件

   新建`.eslintignore`忽略文件添加忽略

   ![](https://tuchuang1.pages.dev/img/vue_template/image-20231222145320872.png)

   ```JS
   dist
   node_modules
   ```

6. 修改运行脚本

   ```js
   "scripts": {
       // 执行`pnpm run dev`直接打开浏览器
       "dev": "vite --open",
       ...
       // eslint检查src目录下源码
       "lint": "eslint src",
       // eslint修复src目录下源码
       "fix": "eslint src --fix"
   }
   ```

### 2.2 prettier配置

1. 作用

   - 有了eslint，为什么还要有prettier？eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；

   - 而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持包含js在内的多种语言。

   - 总结起来，**eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。**

2. 安装依赖

   ```js
   pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
   ```

3. 添加规则

   新建`.prettierrc.json`文件添加规则

   ```json
   {
     "singleQuote": true,
     "semi": false,
     "bracketSpacing": true,
     "htmlWhitespaceSensitivity": "ignore",
     "endOfLine": "auto",
     "trailingComma": "all",
     "tabWidth": 2
   }
   ```

4. 添加忽略

   新建`.prettierignore`文件添加忽略文件

   ```js
   /dist/*
   /html/*
   .local
   /node_modules/**
   **/*.svg
   **/*.sh
   /public/*
   ```

5. 修复代码

   通过`pnpm run lint`去检测语法，如果出现不规范格式,通过`pnpm run fix`修改

### 2.3 stylelint配置

1. 作用

   [stylelint](https://stylelint.io/)为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。

2. 安装依赖

   本项目中使用scss作为预处理器，安装以下依赖

   ```js
   pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
   ```

3. 配置文件

   新建`.stylelintrc.cjs`配置文件

   官网:https://stylelint.bootcss.com/

   ```js
   // @see https://stylelint.bootcss.com/

   module.exports = {
     extends: [
       'stylelint-config-standard', // 配置stylelint拓展插件
       'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
       'stylelint-config-standard-scss', // 配置stylelint scss插件
       'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
       'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
       'stylelint-config-prettier', // 配置stylelint和prettier兼容
     ],
     overrides: [
       {
         files: ['**/*.(scss|css|vue|html)'],
         customSyntax: 'postcss-scss',
       },
       {
         files: ['**/*.(html|vue)'],
         customSyntax: 'postcss-html',
       },
     ],
     ignoreFiles: [
       '**/*.js',
       '**/*.jsx',
       '**/*.tsx',
       '**/*.ts',
       '**/*.json',
       '**/*.md',
       '**/*.yaml',
     ],
     /**
      * null  => 关闭该规则
      * always => 必须
      */
     rules: {
       'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
       'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
       'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
       'no-empty-source': null, // 关闭禁止空源码
       'selector-class-pattern': null, // 关闭强制选择器类名的格式
       'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
       'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
       'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
       'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
       'selector-pseudo-class-no-unknown': [
         // 不允许未知的选择器
         true,
         {
           ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
         },
       ],
     },
   }
   ```

4. 配置忽略

   新建`.stylelintignore`忽略文件

   ```js
   /node_modules/*
   /dist/*
   /html/*
   /public/*
   ```

5. 新增运行脚本

   ```js
   "scripts": {
   	"lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
   }
   ```

6. 同一配置

   最后配置统一的prettier来格式化我们的js和css，html代码

   ```js
    "scripts": {
       "dev": "vite --open",
       "build": "vue-tsc && vite build",
       "preview": "vite preview",
       "lint": "eslint src",
       "fix": "eslint src --fix",
       "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
       "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
       "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
   },
   ```

   当我们运行`pnpm run format`的时候，会把代码直接格式化

### 2.4 husky配置

1. 作用

   - 在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。
   - 要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

2. 安装 husky

   ```js
   pnpm install -D husky
   ```

3. 初始化

   ```js
   npx husky-init
   ```

   - 会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行

   - 在`.husky/pre-commit`文件添加如下命令

     ```js
     #!/usr/bin/env sh
     . "$(dirname -- "$0")/_/husky.sh"
     pnpm run format
     ```

     当我们对代码进行commit操作的时候，就会执行命令，对代码进行格式化，然后再提交。

### 2.5 commitlint配置

1. 作用

   对于我们的commit信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用**commitlint**来实现。

2. 安装依赖

   ```js
   pnpm add @commitlint/config-conventional @commitlint/cli -D
   ```

3. 添加配置

   新建`commitlint.config.cjs`(注意是cjs)

   ```js
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     // 校验规则
     rules: {
       'type-enum': [
         2,
         'always',
         [
           'feat',
           'fix',
           'docs',
           'style',
           'refactor',
           'perf',
           'test',
           'chore',
           'revert',
           'build',
         ],
       ],
       'type-case': [0],
       'type-empty': [0],
       'scope-empty': [0],
       'scope-case': [0],
       'subject-full-stop': [0, 'never'],
       'subject-case': [0, 'never'],
       'header-max-length': [0, 'always', 72],
     },
   }
   ```

4. 在`package.json`中配置scripts命令

   ```js
   # 在scrips中添加下面的代码
   {
   "scripts": {
       "commitlint": "commitlint --config commitlint.config.cjs -e -V"
     },
   }
   ```

   配置结束，现在当我们填写`commit`信息的时候，前面就需要带着下面的`subject`

   ```js
   'feat',//新特性、新功能
   'fix',//修改bug
   'docs',//文档修改
   'style',//代码格式修改, 注意不是 css 修改
   'refactor',//代码重构
   'perf',//优化相关，比如提升性能、体验
   'test',//测试用例修改
   'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
   'revert',//回滚到上一个版本
   'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
   ```

5. 配置husky

   ```js
   npx husky add .husky/commit-msg
   ```

   在生成的commit-msg文件中添加下面的命令

   ```js
   #!/usr/bin/env sh
   . "$(dirname -- "$0")/_/husky.sh"
   pnpm commitlint
   ```

   - 当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m 'fix: xxx' 符合类型的才可以
   - **需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的**

### 2.6 强制使用pnpm包管理器工具

1. 作用

   团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,导致项目出现bug问题,因此包管理器工具需要统一管理！！！

2. 创建配置

   在根目录创建`scritps/preinstall.js`文件，添加下面的内容

   ```js
   if (!/pnpm/.test(process.env.npm_execpath || '')) {
     console.warn(
       `\u001b[33mThis repository must using pnpm as the package manager ` +
         ` for scripts to work properly.\u001b[39m\n`,
     )
     process.exit(1)
   }
   ```

3. 配置命令

   ```js
   "scripts": {
   	"preinstall": "node ./scripts/preinstall.js"
   }
   ```

   当我们使用npm或者yarn来安装包的时候，就会报错了。原理就是在install的时候会触发preinstall（npm提供的生命周期钩子）这个文件里面的代码。

## 3. 项目集成

### 3.1 集成element-plus

1. 官网

   官网地址:https://element-plus.gitee.io/zh-CN/

2. 安装依赖

   ```js
   pnpm install element-plus @element-plus/icons-vue
   ```

3. 配置

   入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文

   ```js
   import { createApp } from 'vue'
   import App from './App.vue'

   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'
   //@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
   import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

   const app = createApp(App)

   app
     .use(ElementPlus, {
       locale: zhCn,
     })
     .mount('#app')
   ```

4. 指定全局组件类型

   在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       // ...
       "types": ["element-plus/global"]
     }
   }
   ```

### 3.2 src别名的配置

1. 配置vite.config.ts

   在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！

   ```js
   // vite.config.ts
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import path from 'path'
   export default defineConfig({
     plugins: [vue()],
     resolve: {
       alias: {
         '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
       },
     },
   })
   ```

2. tsconfig.json配置

   ```js
   // tsconfig.json
   {
     "compilerOptions": {
       "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
       "paths": { //路径映射，相对于baseUrl
         "@/*": ["src/*"]
       }
     }
   }
   ```

### 3.3 环境变量配置

1. 作用

   项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。

2. 环境

   1. 开发环境（development）

      顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。

   2. 测试环境（testing）

      测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试

   3. 生产环境（production）

      生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境)

3. 配置

   - 项目根目录分别添加 开发、生产和测试环境的文件!

     > .env.development
     > .env.production
     > .env.test

   - 添加配置

     .env.development

     ```js
     # 变量必须以 VITE_ 为前缀才能暴露给外部读取
     NODE_ENV = 'development'
     VITE_APP_TITLE = '后台开发模板'
     VITE_APP_BASE_API = '/dev-api'
     ```

     .env.production

     ```js
     NODE_ENV = 'production'
     VITE_APP_TITLE = '后台开发模板'
     VITE_APP_BASE_API = '/prod-api'
     ```

     .env.test

     ```js
     # 变量必须以 VITE_ 为前缀才能暴露给外部读取
     NODE_ENV = 'test'
     VITE_APP_TITLE = '后台开发模板'
     VITE_APP_BASE_API = '/test-api'
     ```

   - 配置运行命令：package.json

     ```js
      "scripts": {
         "build:test": "vue-tsc && vite build --mode test",
         "build:pro": "vue-tsc && vite build --mode production"
       },
     ```

     通过`import.meta.env`获取环境变量

     ```html
     <template>
       <div>Hello</div>
     </template>
     
     <script lang="ts">
       console.log(import.meta.env)
       export default {}
     </script>
     
     <style></style>
     ```

### 3.4 SVG图标配置

#### 3.4.1 图标配置

1. 作用

   - 在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源。

   - 这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。

2. 安装依赖

   ```js
   pnpm install vite-plugin-svg-icons -D
   ```

3. 配置

   在`vite.config.ts`中配置插件

   ```js
   import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
   import path from 'path'
   export default () => {
     return {
       plugins: [
         createSvgIconsPlugin({
           // Specify the icon folder to be cached
           iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
           // Specify symbolId format
           symbolId: 'icon-[dir]-[name]',
         }),
       ],
     }
   }
   ```

4. 入口文件导入

   ```js
   // main.ts
   import 'virtual:svg-icons-register'
   ```

#### 3.4.2 封装为全局组件

1. 作用

   因为项目很多模块需要使用图标,因此把它封装为全局组件！！！

2. 示例

   在src/components目录下创建一个SvgIcon组件

   ```html
   <template>
     <div>
       <svg :style="{ width: width, height: height }">
         <use :xlink:href="prefix + name" :fill="color"></use>
       </svg>
     </div>
   </template>

   <script setup lang="ts">
     defineProps({
       //xlink:href属性值的前缀
       prefix: {
         type: String,
         default: '#icon-',
       },
       //svg矢量图的名字
       name: String,
       //svg图标的颜色
       color: {
         type: String,
         default: '',
       },
       //svg宽度
       width: {
         type: String,
         default: '16px',
       },
       //svg高度
       height: {
         type: String,
         default: '16px',
       },
     })
   </script>
   <style scoped></style>
   ```

3. 注册全局组件

   在src/components文件夹目录下创建一个index.ts文件：用于注册components文件夹内部全部全局组件！！！

   ```js
   // index.ts
   import SvgIcon from './SvgIcon/index.vue';
   import type { App, Component } from 'vue';
   const components: { [name: string]: Component } = { SvgIcon };
   export default {
       install(app: App) {
           Object.keys(components).forEach((key: string) => {
               app.component(key, components[key]);
           })
       }
   }
   ```

4. 入口文件使用自定义插件

   ```js
   import gloablComponent from './components/index'
   app.use(gloablComponent)
   ```

### 3.5 集成sass

1. 作用

   我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"

   ```css
   <style scoped lang="scss"></style>
   ```

2. 全局样式

   在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss

   `reset.scss`

   ```css
   *,
   *:after,
   *:before {
     box-sizing: border-box;

     outline: none;
   }

   html,
   body,
   div,
   span,
   applet,
   object,
   iframe,
   h1,
   h2,
   h3,
   h4,
   h5,
   h6,
   p,
   blockquote,
   pre,
   a,
   abbr,
   acronym,
   address,
   big,
   cite,
   code,
   del,
   dfn,
   em,
   img,
   ins,
   kbd,
   q,
   s,
   samp,
   small,
   strike,
   strong,
   sub,
   sup,
   tt,
   var,
   b,
   u,
   i,
   center,
   dl,
   dt,
   dd,
   ol,
   ul,
   li,
   fieldset,
   form,
   label,
   legend,
   table,
   caption,
   tbody,
   tfoot,
   thead,
   tr,
   th,
   td,
   article,
   aside,
   canvas,
   details,
   embed,
   figure,
   figcaption,
   footer,
   header,
   hgroup,
   menu,
   nav,
   output,
   ruby,
   section,
   summary,
   time,
   mark,
   audio,
   video {
     font: inherit;
     font-size: 100%;

     margin: 0;
     padding: 0;

     vertical-align: baseline;

     border: 0;
   }

   article,
   aside,
   details,
   figcaption,
   figure,
   footer,
   header,
   hgroup,
   menu,
   nav,
   section {
     display: block;
   }

   body {
     line-height: 1;
   }

   ol,
   ul {
     list-style: none;
   }

   blockquote,
   q {
     quotes: none;

     &:before,
     &:after {
       content: '';
       content: none;
     }
   }

   sub,
   sup {
     font-size: 75%;
     line-height: 0;

     position: relative;

     vertical-align: baseline;
   }

   sup {
     top: -0.5em;
   }

   sub {
     bottom: -0.25em;
   }

   table {
     border-spacing: 0;
     border-collapse: collapse;
   }

   input,
   textarea,
   button {
     font-family: inhert;
     font-size: inherit;

     color: inherit;
   }

   select {
     text-indent: 0.01px;
     text-overflow: '';

     border: 0;
     border-radius: 0;

     -webkit-appearance: none;
     -moz-appearance: none;
   }

   select::-ms-expand {
     display: none;
   }

   code,
   pre {
     font-family: monospace, monospace;
     font-size: 1em;
   }
   ```

   `index.scss`

   ```css
   //引入清除默认样式
   @import './reset.scss';

   //滚动条外观设置
   ::-webkit-scrollbar {
       width: 10px;
   }

   ::-webkit-scrollbar-track {
       background: $base-menu-background;
   }

   ::-webkit-scrollbar-thumb {
       width: 10px;
       background-color: yellowgreen;
       border-radius: 10px;
   }
   ```

3. 入口文件引入

   ```js
   // main.ts
   import '@/styles'
   ```

   - 但是你会发现在src/styles/index.scss全局样式文件中没有办法使用$变量.因此需要给项目中引入全局变量$.

   - 在style/variable.scss创建一个variable.scss文件！

   - 在vite.config.ts文件配置如下:

     ```js
     export default defineConfig((config) => {
     	css: {
           preprocessorOptions: {
             scss: {
               javascriptEnabled: true,
               additionalData: '@import "./src/styles/variable.scss";',
             },
           },
         },
     }
     ```

     **`@import "./src/styles/variable.less";`后面的`;`不要忘记，不然会报错**!

     配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！

### 3.6 mock数据

1. 安装依赖

   https://www.npmjs.com/package/vite-plugin-mock

   ```js
   pnpm install vite-plugin-mock@2.9.6 -D
   ```

2. 配置启用插件

   ```js
   // vite.config.js
   //mock插件提供方法
   import { viteMockServe } from 'vite-plugin-mock'
   export default defineConfig(({ command }) => {
     return {
       plugins: [
         viteMockServe({
           localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
         }),
       ],
     }
   })
   ```

3. 测试

   在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！

   在mock文件夹内部创建一个user.ts文件

   ```js
   //createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
   function createUserList() {
     return [
       {
         userId: 1,
         avatar:
           'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
         username: 'admin',
         password: '111111',
         desc: '平台管理员',
         roles: ['平台管理员'],
         buttons: ['cuser.detail'],
         routes: ['home'],
         token: 'Admin Token',
       },
       {
         userId: 2,
         avatar:
           'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
         username: 'system',
         password: '111111',
         desc: '系统管理员',
         roles: ['系统管理员'],
         buttons: ['cuser.detail', 'cuser.user'],
         routes: ['home'],
         token: 'System Token',
       },
     ]
   }
   //对外暴露一个数组:数组里面包含两个接口
   //登录假的接口
   //获取用户信息的假的接口
   export default [
     // 用户登录接口
     {
       url: '/api/user/login', //请求地址
       method: 'post', //请求方式
       response: ({ body }) => {
         //获取请求体携带过来的用户名与密码
         const { username, password } = body
         //调用获取用户信息函数,用于判断是否有此用户
         const checkUser = createUserList().find(
           (item) => item.username === username && item.password === password,
         )
         //没有用户返回失败信息
         if (!checkUser) {
           return { code: 201, data: { message: '账号或者密码不正确' } }
         }
         //如果有返回成功信息
         const { token } = checkUser
         return { code: 200, data: { token } }
       },
     },
     // 获取用户信息
     {
       url: '/api/user/info',
       method: 'get',
       response: (request) => {
         //获取请求头携带token
         const token = request.headers.token
         //查看用户信息是否包含有次token用户
         const checkUser = createUserList().find((item) => item.token === token)
         //没有返回失败的信息
         if (!checkUser) {
           return { code: 201, data: { message: '获取用户信息失败' } }
         }
         //如果有返回成功信息
         return { code: 200, data: { checkUser } }
       },
     },
   ]
   ```

4. 安装axios

   ```js
   pnpm install axios
   ```

5. 测试

   ```js
   // main.ts
   import axios from 'axios'
   axios({
     url: '/api/user/login',
     method: 'post',
     data: {
       username: 'admin',
       password: '111111',
     },
   })
   ```

   ![image-20231222221423697](C:\Users\14361\AppData\Roaming\Typora\typora-user-images\image-20231222221423697.png)

### 3.7 axios二次封装

1. 作用

   - 使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)

   - 使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)

2. 示例

   在根目录下创建utils/request.ts

   ```js
   import axios from 'axios'
   import { ElMessage } from 'element-plus'
   //创建axios实例
   const request = axios.create({
     baseURL: import.meta.env.VITE_APP_BASE_API,
     timeout: 5000,
   })
   //请求拦截器
   request.interceptors.request.use((config) => {
     return config
   })
   //响应拦截器
   request.interceptors.response.use(
     (response) => {
       return response.data
     },
     (error) => {
       //处理网络错误
       let msg = ''
       const status = error.response.status
       switch (status) {
         case 401:
           msg = 'token过期'
           break
         case 403:
           msg = '无权访问'
           break
         case 404:
           msg = '请求地址错误'
           break
         case 500:
           msg = '服务器出现问题'
           break
         default:
           msg = '无网络'
       }
       ElMessage({
         type: 'error',
         message: msg,
       })
       return Promise.reject(error)
     },
   )
   export default request
   ```

## 4. 路由配置

1. 安装依赖

   ```js
   pnpm i vue-router
   ```

2. 路由雏形

   - 以`src\views\login\index.vue`为例，创建路由界面

     ```html
     <template>
       <div>一级路由login</div>
     </template>

     <script setup lang="ts"></script>

     <style lang="scss"></style>
     ```

   - 创建路由`src\router\router.ts`文件，定义路由

     ```js
     // 对外暴露配置路由(常量路由)
     export const constantRoute = [
       {
         //登录路由
         path: '/login',
         component: () => import('@/views/login/index.vue'),
         name: 'login', //命名路由
       },
       {
         // 登录成功以后展示数据的路由
         path: '/',
         component: () => import('@/views/home/index.vue'),
         name: 'layout',
       },
       {
         path: '/404',
         component: () => import('@/views/404/index.vue'),
         name: '404',
       },
       {
         // 重定向
         path: '/:pathMatch(.*)*',
         redirect: '/404',
         name: 'Any',
       },
     ]
     ```

   - 创建`src\router\index.ts`路由

     ```js
     // 通过vue-router插件实现模板路由配置
     import { createRouter, createWebHashHistory } from 'vue-router'
     import { constantRoute } from './router'
     // 创建路由器
     const router = createRouter({
       // 路由模式hash
       history: createWebHashHistory(),
       routes: constantRoute,
       // 滚动行为
       scrollBehavior() {
         return {
           left: 0,
           top: 0,
         }
       },
     })
     export default router
     ```

   - 在`main.ts`中挂载路由

     ```js
     // 导入路由组件
     import router from './router'
     // 获取应用实例对象
     const app = createApp(App)
     // 使用路由组件
     app.use(router)
     ```

   - 指定路由出口

     ```html
     <!-- App.vue -->
     
     <template>
       <div><router-view></router-view></div>
     </template>
     
     <script setup lang="ts"></script>
     <style></style>
     ```

## 5. 登录模块

### 5.1 登录界面

1. 编写登录界面

   ```html
   <!-- src/views/login/index.vue -->
   
   <template>
     <div class="login_container">
       <el-row>
         <el-col :span="12" :xs="0"></el-col>
         <el-col :span="12" :xs="24">
           <el-form class="login_form">
             <h1>Hello</h1>
             <h2>欢迎来到XXX</h2>
             <el-form-item>
               <el-input
                 :prefix-icon="User"
                 v-model="loginForm.username"
               ></el-input>
             </el-form-item>
             <el-form-item>
               <el-input
                 type="password"
                 :prefix-icon="Lock"
                 v-model="loginForm.password"
                 show-password
               ></el-input>
             </el-form-item>
             <el-form-item>
               <el-button
                 :loading="loadType"
                 class="login_btn"
                 type="primary"
                 size="default"
                 @click="login"
               >
                 登录
               </el-button>
             </el-form-item>
           </el-form>
         </el-col>
       </el-row>
     </div>
   </template>
   
   <script setup lang="ts">
     import { User, Lock } from '@element-plus/icons-vue'
     import { reactive } from 'vue'
   
     // 登录效果
     let loadType = ref(false)
     //收集账号与密码数据
     let loginForm = reactive({ username: 'admin', password: '111111' })
   </script>
   
   <style lang="scss" scoped>
     .login_container {
       width: 100%;
       height: 100vh;
       background: url('@/assets/images/background.jpg') no-repeat;
       background-size: cover;
       .login_form {
         position: relative;
         width: 80%;
         top: 30vh;
         background: url('@/assets/images/login_form.png') no-repeat;
         background-size: cover;
         padding: 40px;
         h1 {
           color: white;
           font-size: 40px;
         }
         h2 {
           color: white;
           font-size: 20px;
           margin: 20px 0px;
         }
         .login_btn {
           width: 100%;
         }
       }
     }
   </style>
   ```

### 5.2 编写请求登录API

1. 接口请求参数及返回类型

   ```js
   // 用户登录接口
   {
       url: '/dev-api/user/login', //请求地址
       method: 'post', //请求方式
       response: ({ body }) => {
         //获取请求体携带过来的用户名与密码
         const { username, password } = body
         //调用获取用户信息函数,用于判断是否有此用户
         const checkUser = createUserList().find(
           (item) => item.username === username && item.password === password,
         )
         //没有用户返回失败信息
         if (!checkUser) {
           return { code: 201, data: { message: '账号或者密码不正确' } }
         }
         //如果有返回成功信息
         const { token } = checkUser
         return { code: 200, data: { token } }
       },
   },

   // 登录接口返回数据类型
   {
         userId: 1,
         avatar:
           'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
         username: 'admin',
         password: '111111',
         desc: '平台管理员',
         roles: ['平台管理员'],
         buttons: ['cuser.detail'],
         routes: ['home'],
         token: 'Admin Token',
   },
   ```

2. 根据登录接口编写数据类型type

   ```js
   // src/api/user/type.ts

   // 登录接口需要携带参数ts类型
   export interface loginForm {
     username: string
     password: string
   }
   // ? 可选参数
   export interface dataType {
     token?: string
     message?: string
   }
   // 登录接口返回数据类型
   export interface loginResponseData {
     code: number
     data: dataType
   }
   ```

3. 编写登录接口

   ```js
   // src/api/user/index.ts
   
   // 同一管理用户相关的接口
   import request from '@/utils/request'
   import { loginForm, loginResponseData } from './type'
   
   // 统一管理API
   enum API {
     LOGIN_URL = '/user/login',
   }
   
   // 暴露请求函数
   // 登录接口
   export const reqLogin = (data: loginForm) =>
     request.post<any, loginResponseData>(API.LOGIN_URL, data)
   ```

### 5.3 用户数据存储pinia

1. 安装依赖

   ```js
   pnpm i pinia@2.0.34
   ```

2. 创建pinia仓库

   ```js
   // src/store/index.ts

   //仓库大仓库
   import { createPinia } from 'pinia'
   //创建大仓库
   const pinia = createPinia()
   //对外暴露：入口文件需要安装仓库
   export default pinia
   ```

3. 挂载pinia

   ```js
   // main.ts

   // 导入pinia
   import pinia from './store'

   app.use(pinia)
   ```

4. 创建UserState数据类型

   ```js
   // src/store/modules/type/type.ts

   export interface UserState {
     token: string | null
   }
   ```

5. token相关工具方法

   ```js
   // src/utils/token.ts

   // 封装本地存储和读取数据的方法
   export const SET_TOKEN = (token: string) => {
     localStorage.setItem('TOKEN', token)
   }

   export const GET_TOKEN = (): string | null => {
     return localStorage.getItem('TOKEN')
   }
   ```

6. 创建用户相关仓库

   ```js
   // src/store/modules/user.ts
   
   // 创建用户相关的小仓库
   import { defineStore } from 'pinia'
   import { loginForm, loginResponseData } from '@/api/user/type'
   import { reqLogin } from '@/api/user'
   import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
   import { UserState } from './type/type'
   
   // 创建用户小仓库
   const useUserStore = defineStore('User', {
     // 用户仓库存储数据地方
     state(): UserState {
       return {
         token: GET_TOKEN(),
       }
     },
     // 处理异步|逻辑地方
     actions: {
       async userLogin(data: loginForm) {
         const result: loginResponseData = await reqLogin(data)
         console.log(result)
         if (result.code === 200) {
           this.token = result.data.token as string
           //localStorage.setItem('TOKEN', this.token)
           SET_TOKEN(this.token)
           return 'OK'
         } else {
           return Promise.reject(new Error(result.data.message))
         }
       },
     },
     getters: {},
   })
   // 对外暴露小仓库
   export default useUserStore
   ```

### 5.4 登录按钮点击事件

1. 登录

   ```js
   <!-- src/views/login/index.vue -->
   
   <script setup lang="ts">
   import { User, Lock } from '@element-plus/icons-vue'
   import { reactive, ref } from 'vue'
   import useUserStore from '@/store/modules/user'
   import { useRouter } from 'vue-router'
   import { ElNotification } from 'element-plus'
   
   // 登录效果
   let loadType = ref(false)
   //收集账号与密码数据
   let loginForm = reactive({ username: 'admin', password: '111111' })
   
   const router = useRouter()
   let userStore = useUserStore()
   // 登录
   const login = async () => {
     loadType.value = true
     try {
       await userStore.userLogin(loginForm)
       router.push('/')
       ElNotification({
         type: 'success',
         message: '登录成功',
       })
       loadType.value = false
     } catch (error) {
       loadType.value = false
       ElNotification({
         type: 'error',
         message: (error as Error).message,
       })
     }
   }
   </script>
   ```

### 5.5 登录提示

1. 需求

   修改登录提示

   ![](https://tuchuang1.pages.dev/img/vue_template/image-20231226111644354.png)

2. 提供时间函数

   ```js
   // src/utils/time.ts
   export const getTime = () => {
     let message = ''
     const hours = new Date().getHours()
     if (hours <= 9) {
       message = '早上'
     } else if (hours <= 12) {
       message = '上午'
     } else if (hours <= 18) {
       message = '下午'
     } else {
       message = '晚上'
     }

     return message
   }
   ```

3. 修改提示

   ```js
   // 登录
   const login = async () => {
     loadType.value = true
     try {
       await userStore.userLogin(loginForm)
       router.push('/')
       ElNotification({
         type: 'success',
         message: '欢迎回来',
         // 修改提示
         title: `HI,${getTime()}好`,
       })
       loadType.value = false
     } catch (error) {
       loadType.value = false
       ElNotification({
         type: 'error',
         message: (error as Error).message,
       })
     }
   }
   ```

### 5.6 登录表单校验

1. 绑定表单

   https://element-plus.org/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C

   ```html
   <el-form
             class="login_form"
             <!-- 表单规则 -->
             :rules="rules"
             <!-- 表单数据 -->
             :model="loginForm"
             <!-- 通过ref获取表单组件 -->
             ref="loginFormRef"
   >
   ```

2. 定义规则

   ```js
   //定义表单校验需要的配置对象
   const rules = {
     username: [
       //规则对象属性:
       {
         required: true, // required,代表这个字段务必要校验的
         min: 5, //min:文本长度至少多少位
         max: 10, // max:文本长度最多多少位
         message: '长度应为6-10位', // message:错误的提示信息
         trigger: 'change', //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
       },
     ],
     password: [
       {
         required: true,
         min: 6,
         max: 10,
         message: '长度应为6-15位',
         trigger: 'change',
       },
     ],
   }
   // 获取表单组件
   const loginFormRef = ref()
   ```

3. 执行校验

   ```js
   // 登录
   const login = async () => {
     //保证全部表单项校验通过
     await loginFormRef.value.validate()
   
     ...
   }
   ```

### 5.7 自定义校验

1. 自定义规则

   有时候默认的校验规则不满足校验要求，这个时候可以自定义校验规则函数

   ```js
   //自定义校验规则函数
   const validatorUserName = (_rule: any, value: any, callback: any) => {
     //rule：校验规则对象
     //value:表单元素文本内容
     //callback:符合条件，callback放行通过，不符合：注入错误提示信息
     if (value.length >= 5) {
       callback()
     } else {
       callback(new Error('账号长度至少5位'))
     }
   }
   const validatorPassword = (_rule: any, value: any, callback: any) => {
     if (value.length >= 6) {
       callback()
     } else {
       callback(new Error('密码长度至少6位'))
     }
   }
   ```

2. 添加规则

   ```js
   //定义表单校验需要的配置对象
   const rules = {
     username: [{ validator: validatorUserName, trigger: 'change' }],
     password: [{ validator: validatorPassword, trigger: 'change' }],
   }
   ```

## 6. Layout模块

### 6.1 主界面

1. 主界面

   ```html
   <!-- src/layout/index.vue -->

   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider"></div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <p style="height: 1000000px"></p>
       </div>
     </div>
   </template>

   <script setup lang="ts"></script>

   <style lang="scss" scoped>
     .layout_container {
       width: 100%;
       height: 100vh;
       .layout_slider {
         width: $base-menu-width;
         height: 100vh;
         background: $base-menu-background;
       }
       .layout_tabbar {
         position: fixed;
         width: calc(100% - $base-menu-width);
         height: $base-tabbar-height;
         background: cyan;
         top: 0;
         left: $base-menu-width;
       }
       .layout_main {
         position: absolute;
         width: calc(100% - $base-menu-width);
         height: calc(100vh - $base-tabbar-height);
         background-color: yellowgreen;
         left: $base-menu-width;
         top: $base-tabbar-height;
         padding: 20px;
         overflow: auto;
       }
     }
   </style>
   ```

2. 定义全局变量

   ```css
   // scr/styles/variable.scss

   // 项目提供scss全局变量
   //左侧的菜单的宽度
   $base-menu-width:260px;
   //左侧菜单的背景颜色
   $base-menu-background:#001529;
   $base-menu-min-width:50px;
   // 顶部导航的高度
   $base-tabbar-height:50px;
   ```

3. 定义滚动条样式

   ```css
   // scr/styles/index.scss
   
   //引入清除默认样式
   @import './reset.scss';
   
   //滚动条外观设置
   ::-webkit-scrollbar {
       width: 10px;
   }
   
   ::-webkit-scrollbar-thumb {
       width: 10px;
       background-color: yellowgreen;
       border-radius: 10px;
   }
   ```

### 6.2 封装LOGO

1. 创建logo组件

   ```html
   <!-- src/layout/logo/index.vue -->

   <template>
     <div class="logo">
       <img src="../../../../public/logo.png" alt="" />
       <p>xxx后台管理</p>
     </div>
   </template>

   <script setup lang="ts"></script>

   <style lang="scss" scoped>
     .logo {
       width: 100%;
       height: $base-menu-logo-height;
       color: white;
       display: flex;
       align-items: center;
       padding: 20px;
       img {
         width: 40px;
         height: 40px;
       }
       p {
         font-size: $base-logo-title-fontSize;
         margin-left: 10px;
       }
     }
   </style>
   ```

2. 添加logo全局变量

   ```css
   // scr/styles/variable.scss

   //左侧菜单logo高度设置
   $base-menu-logo-height:50px;
   //左侧菜单logo右侧文字大小
   $base-logo-title-fontSize:20px;
   ```

3. 引入logo组件

   ```html
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- 引入logo -->
         <Logo></Logo>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <p style="height: 1000000px"></p>
       </div>
     </div>
   </template>

   <script setup lang="ts">
     import Logo from '@/views/layout/logo/index.vue'
   </script>
   ```

4. 抽取配置

   为了方便以后对logo以及标题的修改，可以将logo内容抽取到配置文件中

   ```js
   // src/setting.ts

   //用于项目logo|标题配置
   export default {
     title: '硅谷甄选运营平台', //项目的标题
     logo: '/public/logo.png', //项目logo设置
     logoHidden: true, //logo组件是否隐藏
   }
   ```

5. 修改logo组件

   ```html
   <template>
     <div class="logo" v-if="!setting.logoHidden">
       <img :src="setting.logo" alt="" />
       <p>{{ setting.title }}</p>
     </div>
   </template>
   
   <script setup lang="ts">
     import setting from '@/setting'
   </script>
   ```

### 6.3 左侧静态菜单组件

1. 左侧滚动条

   https://element-plus.org/zh-CN/component/scrollbar.html

   ```html
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- logo -->
         <Logo></Logo>
         <!-- 滚动组件 -->
         <el-scrollbar class="scrollbar">
           <p v-for="item in 2000" :key="item" class="scrollbar-demo-item">
             {{ item }}
           </p>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <p style="height: 1000000px"></p>
       </div>
     </div>
   </template>

   <style lang="scss" scoped>
     .layout_container {
       width: 100%;
       height: 100vh;
       // 设置字体颜色
       color: white;
       .layout_slider {
         width: $base-menu-width;
         height: 100vh;
         background: $base-menu-background;
         // 设置滚动条样式
         .scrollbar {
           width: 100%;
           height: calc(100vh - $base-menu-logo-height);
           // 消除滚动border
           .el-menu {
             border-right: 0;
           }
         }
       }
       .layout_tabbar {
         position: fixed;
         width: calc(100% - $base-menu-width);
         height: $base-tabbar-height;
         background: cyan;
         top: 0;
         left: $base-menu-width;
       }
       .layout_main {
         position: absolute;
         width: calc(100% - $base-menu-width);
         height: calc(100vh - $base-tabbar-height);
         background-color: yellowgreen;
         left: $base-menu-width;
         top: $base-tabbar-height;
         padding: 20px;
         overflow: auto;
       }
     }
   </style>
   ```

2. 菜单组件

   https://element-plus.org/zh-CN/component/menu.html

   ```html
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- logo -->
         <Logo></Logo>
         <!-- 滚动组件 -->
         <el-scrollbar>
           <!-- 菜单组件 -->
           <el-menu background-color="#001529" text-color="white">
             <el-menu-item index="1">首页</el-menu-item>
             <el-menu-item index="2">数据大屏</el-menu-item>
             <!-- 折叠菜单 -->
             <el-sub-menu index="3">
               <template #title>
                 <span>权限管理</span>
               </template>
               <el-menu-item index="3-1">用户管理</el-menu-item>
               <el-menu-item index="3-2">角色管理</el-menu-item>
               <el-menu-item index="3-3">菜单管理</el-menu-item>
             </el-sub-menu>
           </el-menu>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <p style="height: 1000000px"></p>
       </div>
     </div>
   </template>
   ```

### 6.4 动态菜单组件

1. 封装组件

   `src\layout\menu\index.vue`

   ```html
   <template>
     <!-- 菜单组件 -->
     <el-menu background-color="#001529" text-color="white">
       <el-menu-item index="1">首页</el-menu-item>
       <el-menu-item index="2">数据大屏</el-menu-item>
       <!-- 折叠菜单 -->
       <el-sub-menu index="3">
         <template #title>
           <span>权限管理</span>
         </template>
         <el-menu-item index="3-1">用户管理</el-menu-item>
         <el-menu-item index="3-2">角色管理</el-menu-item>
         <el-menu-item index="3-3">菜单管理</el-menu-item>
       </el-sub-menu>
     </el-menu>
   </template>

   <script setup lang="ts"></script>
   <style lang="scss" scoped></style>
   ```

   `src\layout\index.vue`

   ```html
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- logo -->
         <Logo></Logo>
         <!-- 滚动组件 -->
         <el-scrollbar class="scrollbar">
           <menu></menu>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <p style="height: 1000000px"></p>
       </div>
     </div>
   </template>

   <script setup lang="ts">
     import Logo from './logo/index.vue'
     import Menu from './menu/index.vue'
   </script>
   ```

2. 路由信息存入pinia

   - 定义路由类型

     `src\store\modules\type\type.ts`

     ```js
     import { RouteRecordRaw } from 'vue-router'

     export interface UserState {
       token: string | null
       menuRoutes: RouteRecordRaw[] // 路由类型
     }
     ```

   - 路由信息存入state

     ```js
     import { constantRoute } from '@/router/router'
  
     // 创建用户仓库
     const useUserStore = defineStore('User', {
       // 用户仓库存储数据地方
       state(): UserState {
         return {
           token: GET_TOKEN(),
           menuRoutes: constantRoute,
         }
       },
       ...
     })
     ```

3. 路由添加meta信息

   `src\router\router.ts`

   ```js
   // 对外暴露配置路由(常量路由)
   export const constantRoute = [
     {
       //登录
       path: '/login',
       component: () => import('@/views/login/index.vue'),
       name: 'login',
       meta: {
         title: '登录', //菜单标题
       },
     },
     {
       //登录成功以后展示数据的路由
       path: '/',
       component: () => import('@/layout/index.vue'),
       name: 'layout',
       meta: {
         title: 'layout',
       },
       redirect: '/home',
       children: [
         {
           path: '/home',
           component: () => import('@/views/home/index.vue'),
           meta: {
             title: '首页',
           },
         },
         {
           path: '/home2',
           component: () => import('@/views/home/index.vue'),
           meta: {
             title: '首页2',
           },
         },
       ],
     },
     {
       //404
       path: '/404',
       component: () => import('@/views/404/index.vue'),
       name: '404',
       meta: {
         title: '404',
       },
     },
   ]
   ```

4. 父组件获取路由信息并传递给子组件

   `src\layout\index.vue`

   ```js
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- logo -->
         <Logo></Logo>
         <!-- 滚动组件 -->
         <el-scrollbar class="scrollbar">
           <el-menu background-color="#001529" text-color="white">
             // 传递路由数据
             <Menu :menuList="userStore.menuRoutes"></Menu>
           </el-menu>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <p style="height: 1000000px"></p>
       </div>
     </div>
   </template>

   <script setup lang="ts">
   import Logo from './logo/index.vue'
   import Menu from './menu/index.vue'
   import useUserStore from '@/store/modules/user'
   // 获取用户仓库
   const userStore = useUserStore()
   </script>
   ```

5. 子组件根据路由数据动态创建菜单

   `src\layout\menu\index.vue`

   ```html
   <template>
     <template v-for="item in menuList" :key="item.path">
       <!-- 没有子路由 -->
       <el-menu-item v-if="!item.children" :index="item.path">
         <template #title>
           <span>标</span>
           <span>{{ item.meta.title }}</span>
         </template>
       </el-menu-item>

       <!-- 有子路由但只有一个子路由 -->
       <el-menu-item
         v-if="item.children && item.children.length === 1"
         :index="item.children[0].path"
       >
         <template #title>
           <span>标</span>
           <span>{{ item.children[0].meta.title }}</span>
         </template>
       </el-menu-item>

       <!-- 有子路由且个数大于一个 -->
       <el-sub-menu
         :index="item.path"
         v-if="item.children && item.children.length >= 2"
       >
         <template #title>
           <span>{{ item.meta.title }}</span>
         </template>
         <!-- 递归创建菜单 -->
         <menu :menuList="item.children"></menu>
       </el-sub-menu>
     </template>
   </template>

   <script setup lang="ts">
     //获取父组件传递过来的全部路由数组
     defineProps(['menuList'])
   </script>
   <script lang="ts">
     export default {
       // eslint-disable-next-line vue/no-reserved-component-names
       name: 'Menu',
     }
   </script>
   <style lang="scss" scoped></style>
   ```

   ![](https://tuchuang1.pages.dev/img/vue_template/image-20231227151850419.png)

   `注意：当子路由个数大于等于一个时，并且或许子路由还有后代路由时。这里我们使用了递归组件。递归组件需要命名（另外使用一个script标签，vue2格式）。`

6. 菜单隐藏

   - 添加meta信息

     `src\router\router.ts`

     ```js
     // 对外暴露配置路由(常量路由)
     export const constantRoute = [
       {
         //登录
         path: '/login',
         component: () => import('@/views/login/index.vue'),
         name: 'login',
         meta: {
           title: '登录', //菜单标题
           hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
         },
       },
       {
         //登录成功以后展示数据的路由
         path: '/',
         component: () => import('@/layout/index.vue'),
         name: 'layout',
         meta: {
           title: 'layout',
           hidden: false,
         },
         redirect: '/home',
         children: [
           {
             path: '/home',
             component: () => import('@/views/home/index.vue'),
             meta: {
               title: '首页',
               hidden: false,
             },
           },
           {
             path: '/home2',
             component: () => import('@/views/home/index.vue'),
             meta: {
               title: '首页2',
               hidden: false,
               icon: 'HomeFilled',
             },
           },
         ],
       },
       {
         //404
         path: '/404',
         component: () => import('@/views/404/index.vue'),
         name: '404',
         meta: {
           title: '404',
           hidden: true,
         },
       },
     ]
     ```

   - 为方便判断修改menu组件

     `src\layout\menu\index.vue`

     ```js
     <template>
       <template v-for="item in menuList" :key="item.path">
         <!-- 没有子路由 -->
         <template v-if="!item.children">
           <el-menu-item v-if="!item.meta.hidden" :index="item.path">
             <template #title>
               <span>标</span>
               <span>{{ item.meta.title }}</span>
             </template>
           </el-menu-item>
         </template>
  
         <!-- 有子路由但只有一个子路由 -->
         <template v-if="item.children && item.children.length === 1">
           <el-menu-item
             v-if="!item.children[0].meta.hidden"
             :index="item.children[0].path"
           >
             <template #title>
               <span>标</span>
               <span>{{ item.children[0].meta.title }}</span>
             </template>
           </el-menu-item>
         </template>
  
         <!-- 有子路由且个数大于一个 -->
         <el-sub-menu
           v-if="item.children && item.children.length >= 2"
           :index="item.path"
         >
           <template #title>
             <span>{{ item.meta.title }}</span>
           </template>
           <!-- 递归创建菜单 -->
           <Menu :menuList="item.children"></Menu>
         </el-sub-menu>
       </template>
     </template>
  
     <script setup lang="ts">
     //获取父组件传递过来的全部路由数组
     defineProps(['menuList'])
     </script>
     <script lang="ts">
     export default {
       // eslint-disable-next-line vue/no-reserved-component-names
       name: 'Menu',
     }
     </script>
     <style lang="scss" scoped></style>
     ```

7. 添加菜单图标

   - 注册图标组件

     `src\components\index.ts`

     ```js
     import SvgIcon from './SvgIcon/index.vue'
     import type { App, Component } from 'vue'
     //引入element-plus提供全部图标组件
     import * as ElementPlusIconsVue from '@element-plus/icons-vue'

     const components: { [name: string]: Component } = { SvgIcon }
     //对外暴露插件对象
     export default {
       //务必叫做install方法
       install(app: App) {
         //注册项目全部的全局组件
         Object.keys(components).forEach((key) => {
           //注册为全局组件
           app.component(key, components[key])
         })
         //将element-plus提供全部图标注册为全局组件
         for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
           app.component(key, component)
         }
       },
     }
     ```

   - 添加meta信息

     https://element-plus.org/zh-CN/component/icon.html

     `src\router\router.ts`

     ```js
     // 对外暴露配置路由(常量路由)
     export const constantRoute = [
       {
         //登录
         path: '/login',
         component: () => import('@/views/login/index.vue'),
         name: 'login',
         meta: {
           title: '登录', //菜单标题
           hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
           icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
         },
       },
       {
         //登录成功以后展示数据的路由
         path: '/',
         component: () => import('@/layout/index.vue'),
         name: 'layout',
         meta: {
           title: '',
           hidden: false,
           icon: '',
         },
         redirect: '/home',
         children: [
           {
             path: '/home',
             component: () => import('@/views/home/index.vue'),
             meta: {
               title: '首页',
               hidden: false,
               icon: 'HomeFilled',
             },
           },
         ],
       },
       {
         //404
         path: '/404',
         component: () => import('@/views/404/index.vue'),
         name: '404',
         meta: {
           title: '404',
           hidden: false,
           icon: 'DocumentDelete',
         },
       },
     ]
     ```

   - 修改menu组件

     `src\layout\menu\index.vue`

     ```html
     <template>
       <template v-for="item in menuList" :key="item.path">
         <!--没有子路由-->
         <template v-if="!item.children">
           <el-menu-item :index="item.path" v-if="!item.meta.hidden">
             <!-- 图标 -->
             <el-icon>
               <component :is="item.meta.icon"></component>
             </el-icon>
             <template #title>
               <span>{{ item.meta.title }}</span>
             </template>
           </el-menu-item>
         </template>
         <!-- 有子路由但是只有一个子路由 -->
         <template v-if="item.children && item.children.length == 1">
           <el-menu-item
             :index="item.children[0].path"
             v-if="!item.children[0].meta.hidden"
           >
             <!-- 图标 -->
             <el-icon>
               <component :is="item.children[0].meta.icon"></component>
             </el-icon>
             <template #title>
               <span>{{ item.children[0].meta.title }}</span>
             </template>
           </el-menu-item>
         </template>
         <!-- 有子路由且个数大于一个1 -->
         <el-sub-menu
           :index="item.path"
           v-if="item.children && item.children.length > 1"
         >
           <template #title>
             <!-- 图标 -->
             <el-icon>
               <component :is="item.meta.icon"></component>
             </el-icon>
             <span>{{ item.meta.title }}</span>
           </template>
           <menu :menuList="item.children"></menu>
         </el-sub-menu>
       </template>
     </template>
  
     <script setup lang="ts">
       //获取父组件传递过来的全部路由数组
       defineProps(['menuList'])
     </script>
     <script lang="ts">
       export default {
         // eslint-disable-next-line vue/no-reserved-component-names
         name: 'Menu',
       }
     </script>
     <style lang="scss" scoped></style>
     ```

8. 路由跳转

   点击菜单时需要跳转至对应路由界面，`@click="goRoute(item.path)`

   ```js
   <template>
     <template v-for="item in menuList" :key="item.path">
       <!--没有子路由-->
       <template v-if="!item.children">
         <el-menu-item
           :index="item.path"
           v-if="!item.meta.hidden"
           @click="goRoute(item.path)"
         >
           <el-icon>
             <!-- 图标 -->
             <component :is="item.meta.icon"></component>
           </el-icon>
           <template #title>
             <span>{{ item.meta.title }}</span>
           </template>
         </el-menu-item>
       </template>
       <!-- 有子路由但是只有一个子路由 -->
       <template v-if="item.children && item.children.length == 1">
         <el-menu-item
           :index="item.children[0].path"
           v-if="!item.children[0].meta.hidden"
           @click="goRoute(item.children[0].path)"
         >
           <el-icon>
             <component :is="item.children[0].meta.icon"></component>
           </el-icon>
           <template #title>
             <span>{{ item.children[0].meta.title }}</span>
           </template>
         </el-menu-item>
       </template>
       <!-- 有子路由且个数大于一个1 -->
       <el-sub-menu
         :index="item.path"
         v-if="item.children && item.children.length > 1"
       >
         <template #title>
           <el-icon>
             <component :is="item.meta.icon"></component>
           </el-icon>
           <span>{{ item.meta.title }}</span>
         </template>
         <Menu :menuList="item.children"></Menu>
       </el-sub-menu>
     </template>
   </template>
   
   <script setup lang="ts">
   import { useRouter } from 'vue-router'
   
   // 获取父组件传递过来的全部路由数组
   defineProps(['menuList'])
   const route = useRouter()
   // 根据路由路径跳转
   const goRoute = (path: string) => {
     route.push(path)
   }
   </script>
   <script lang="ts">
   export default {
     // eslint-disable-next-line vue/no-reserved-component-names
     name: 'Menu',
   }
   </script>
   <style lang="scss" scoped></style>
   ```

### 6.5 封装Main组件

1. 封装内容展示区域组件，添加路由跳转动画

   https://router.vuejs.org/zh/guide/advanced/transitions.html

   `src\layout\main\index.vue`

   ```html
   <template>
     <!-- 路由组件出口的位置 -->
     <router-view v-slot="{ Component }">
       <transition name="fade">
         <!-- 渲染layout一级路由的子路由 -->
         <component :is="Component" />
       </transition>
     </router-view>
   </template>

   <script setup lang="ts"></script>

   <style lang="scss" scoped>
     .fade-enter-from {
       opacity: 0;
     }
     .fade-enter-active {
       transition: all 0.3s;
     }
     .fade-enter-to {
       opacity: 1;
     }
   </style>
   ```

2. 修改layout

   `src\layout\index.vue`

   ```html
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- logo -->
         <Logo></Logo>
         <!-- 滚动组件 -->
         <el-scrollbar class="scrollbar">
           <el-menu background-color="#001529" text-color="white">
             <menu :menuList="userStore.menuRoutes"></menu>
           </el-menu>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <main></main>
       </div>
     </div>
   </template>
   ```

### 6.6 配置全路由

1. 配置路由

   `src\router\router.ts`

   ```js
   // 对外暴露配置路由(常量路由)
   export const constantRoute = [
     {
       //登录
       path: '/login',
       component: () => import('@/views/login/index.vue'),
       name: 'login',
       meta: {
         title: '登录', //菜单标题
         hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
         icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
       },
     },
     {
       //登录成功以后展示数据的路由
       path: '/',
       component: () => import('@/layout/index.vue'),
       name: 'layout',
       meta: {
         title: '',
         hidden: false,
         icon: '',
       },
       redirect: '/home',
       children: [
         {
           path: '/home',
           component: () => import('@/views/home/index.vue'),
           meta: {
             title: '首页',
             hidden: false,
             icon: 'HomeFilled',
           },
         },
       ],
     },
     {
       //404
       path: '/404',
       component: () => import('@/views/404/index.vue'),
       name: '404',
       meta: {
         title: '404',
         hidden: true,
         icon: 'DocumentDelete',
       },
     },
     {
       path: '/acl',
       component: () => import('@/layout/index.vue'),
       name: 'Acl',
       meta: {
         hidden: false,
         title: '权限管理',
         icon: 'Lock',
       },
       children: [
         {
           path: '/acl/user',
           component: () => import('@/views/acl/user/index.vue'),
           name: 'User',
           meta: {
             hidden: false,
             title: '用户管理',
             icon: 'User',
           },
         },
         {
           path: '/acl/role',
           component: () => import('@/views/acl/role/index.vue'),
           name: 'Role',
           meta: {
             hidden: false,
             title: '角色管理',
             icon: 'UserFilled',
           },
         },
         {
           path: '/acl/permission',
           component: () => import('@/views/acl/permission/index.vue'),
           name: 'Permission',
           meta: {
             hidden: false,
             title: '菜单管理',
             icon: 'Monitor',
           },
         },
       ],
     },
   ]
   ```

2. 创建相应组件

### 6.7 菜单刷新展示

1. 问题

   当页面刷新时，菜单会自动收起。使用element-plus的**default-active** 处理

2. 处理

   https://element-plus.org/zh-CN/component/menu.html#menu-attributes

   ```html
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <div class="layout_slider">
         <!-- logo -->
         <Logo></Logo>
         <!-- 滚动组件 -->
         <el-scrollbar class="scrollbar">
           <el-menu
             background-color="#001529"
             text-color="white"
             :default-active="route.path"
           >
             <menu :menuList="userStore.menuRoutes"></menu>
           </el-menu>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div class="layout_tabbar"></div>
       <!-- 内容展示区域 -->
       <div class="layout_main">
         <main></main>
       </div>
     </div>
   </template>
   
   <script setup lang="ts">
     import Logo from './logo/index.vue'
     import Menu from './menu/index.vue'
     import useUserStore from '@/store/modules/user'
     import Main from './main/index.vue'
     import { useRoute } from 'vue-router'
   
     const userStore = useUserStore()
     // 获取路由
     const route = useRoute()
   </script>
   ```

### 6.8 顶部tabbar组件

1. 添加静态界面

   https://element-plus.org/zh-CN/component/breadcrumb.html

   https://element-plus.org/zh-CN/component/dropdown.html

   `src\layout\tabbar\index.vue`

   ```html
   <template>
     <div class="tabbar">
       <div class="tabbar_left">
         <!-- 顶部左侧的图标 -->
         <el-icon style="margin-right: 10px">
           <Expand></Expand>
         </el-icon>
         <!-- 左侧的面包屑 -->
         <el-breadcrumb separator-icon="ArrowRight">
           <el-breadcrumb-item>权限管理</el-breadcrumb-item>
           <el-breadcrumb-item>用户管理</el-breadcrumb-item>
         </el-breadcrumb>
       </div>
       <div class="tabbar_right">
         <el-button size="small" icon="Refresh" circle></el-button>
         <el-button size="small" icon="FullScreen" circle></el-button>
         <el-button size="small" icon="Setting" circle></el-button>
         <img
           src="../../../public/logo.png"
           style="width: 24px; height: 24px; margin: 0px 10px"
         />
         <!-- 下拉菜单 -->
         <el-dropdown>
           <span class="el-dropdown-link">
             admin
             <el-icon class="el-icon--right">
               <arrow-down />
             </el-icon>
           </span>
           <template #dropdown>
             <el-dropdown-menu>
               <el-dropdown-item>退出登陆</el-dropdown-item>
             </el-dropdown-menu>
           </template>
         </el-dropdown>
       </div>
     </div>
   </template>

   <script setup lang="ts"></script>

   <style lang="scss" scoped>
     .tabbar {
       width: 100%;
       height: 100%;
       display: flex;
       justify-content: space-between;
       background-image: linear-gradient(
         to right,
         rgb(236, 229, 229),
         rgb(151, 136, 136),
         rgb(240, 234, 234)
       );
       .tabbar_left {
         display: flex;
         align-items: center;
         margin-left: 20px;
       }
       .tabbar_right {
         display: flex;
         align-items: center;
       }
     }
   </style>
   ```

2. 拆分组件

   `src\layout\tabbar\breadcrumb\index.vue`

   ```html
   <template>
     <!-- 顶部左侧的图标 -->
     <el-icon style="margin-right: 10px">
       <Expand></Expand>
     </el-icon>
     <!-- 左侧的面包屑 -->
     <el-breadcrumb separator-icon="ArrowRight">
       <el-breadcrumb-item>权限挂历</el-breadcrumb-item>
       <el-breadcrumb-item>用户管理</el-breadcrumb-item>
     </el-breadcrumb>
   </template>
   
   <script setup lang="ts"></script>
   
   <style lang="scss" scoped></style>
   ```

   `src\layout\tabbar\setting\index.vue`

   ```html
   <template>
     <el-button size="small" icon="Refresh" circle></el-button>
     <el-button size="small" icon="FullScreen" circle></el-button>
     <el-button size="small" icon="Setting" circle></el-button>
     <img
       src="../../../../public/logo.png"
       style="width: 24px; height: 24px; margin: 0px 10px"
     />
     <!-- 下拉菜单 -->
     <el-dropdown>
       <span class="el-dropdown-link">
         admin
         <el-icon class="el-icon--right">
           <arrow-down />
         </el-icon>
       </span>
       <template #dropdown>
         <el-dropdown-menu>
           <el-dropdown-item>退出登陆</el-dropdown-item>
         </el-dropdown-menu>
       </template>
     </el-dropdown>
   </template>
   
   <script setup lang="ts"></script>
   
   <style lang="scss" scoped></style>
   ```

   `src\layout\tabbar\index.vue`

   ```html
   <template>
     <div class="tabbar">
       <div class="tabbar_left">
         <Breadcrumb></Breadcrumb>
       </div>
       <div class="tabbar_right">
         <Setting></Setting>
       </div>
     </div>
   </template>
   
   <script setup lang="ts">
     import Breadcrumb from './breadcrumb/index.vue'
     import Setting from './setting/index.vue'
   </script>
   ```

### 6.9 菜单折叠

1. 修改折叠图标

   添加点击事件根据折叠状态判断，展示不同图标

   https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components

   `src\layout\tabbar\breadcrumb\index.vue`

   ```html
   <template>
     <!-- 顶部左侧的图标 -->
     <el-icon style="margin-right: 10px" @click="changeIcon">
       <!-- 动态切换图标 -->
       <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
     </el-icon>
     <!-- 左侧的面包屑 -->
     <el-breadcrumb separator-icon="ArrowRight">
       <el-breadcrumb-item>权限管理</el-breadcrumb-item>
       <el-breadcrumb-item>用户管理</el-breadcrumb-item>
     </el-breadcrumb>
   </template>

   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'

     //获取layout配置相关的仓库
     let settingStore = useSettingStore()

     const changeIcon = () => {
       console.log(settingStore.fold)
       settingStore.fold = !settingStore.fold
     }
   </script>

   <style lang="scss" scoped></style>
   ```

   - 因为整个左侧栏、顶部tabbar栏和main界面都受到折叠效果影响，所以将折叠状态存入pinia

2. 新建setting仓库

   `src\store\modules\setting.ts`

   ```js
   //小仓库：layout组件相关配置仓库
   import { defineStore } from 'pinia'

   const useSettingStore = defineStore('SettingStore', {
     state: () => {
       return {
         fold: false, //用户控制菜单折叠还是收起的控制
       }
     },
   })

   export default useSettingStore
   ```

3. 联动更新左侧菜单栏

   - 点击折叠时，动态修改左侧菜单栏宽度。

     添加全局属性

     `src\styles\variable.scss`

     ```css
     //左侧菜单最小宽度
     $base-menu-min-width:50px;
     ```

     绑定动态属性

     `src\layout\index.vue`

     ```html
     <template>
       <div class="layout_container">
         <!-- 左侧菜单 -->
         <div
           class="layout_slider"
           :class="{ fold: settingStore.fold ? true : false }"
         ></div>
       </div>
     </template>

     <script setup lang="ts">
       import useSettingStore from '@/store/modules/setting'

       const settingStore = useSettingStore()
     </script>

     <style lang="scss" scoped>
       .layout_container {
         width: 100%;
         height: 100vh;
         color: white;
         .layout_slider {
           width: $base-menu-width;
           height: 100vh;
           background: $base-menu-background;
           transition: all 0.1s;
           // 添加左侧菜单最小宽度
           &.fold {
             width: $base-menu-min-width;
           }

           .scrollbar {
             width: 100%;
             height: calc(100vh - $base-menu-logo-height);

             .el-menu {
               border-right: 0;
             }
           }
         }
       }
     </style>
     ```

   - 左侧菜单栏修改折叠状态：collapse

     https://element-plus.org/zh-CN/component/menu.html#menu-attributes

     `src\layout\index.vue`

     ```html
     <template>
       <div class="layout_container">
         <!-- 左侧菜单 -->
         <div
           class="layout_slider"
           :class="{ fold: settingStore.fold ? true : false }"
         >
           <!-- logo -->
           <Logo></Logo>
           <!-- 滚动组件 -->
           <el-scrollbar class="scrollbar">
             <el-menu
               background-color="#001529"
               text-color="white"
               :default-active="route.path"
               :collapse="settingStore.fold"
             >
               <menu :menuList="userStore.menuRoutes"></menu>
             </el-menu>
           </el-scrollbar>
         </div>
       </div>
     </template>
     ```

4. 联动更新tabbar

   ```html
   <template>
     <div class="layout_container">
       <!-- 顶部导航 -->
       <div
         class="layout_tabbar"
         :class="{ fold: settingStore.fold ? true : false }"
       >
         <Tabbar></Tabbar>
       </div>
     </div>
   </template>

   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'

     const settingStore = useSettingStore()
   </script>

   <style lang="scss" scoped>
       .layout_tabbar {
         position: fixed;
         width: calc(100% - $base-menu-width);
         height: $base-tabbar-height;
         background: cyan;
         top: 0;
         left: $base-menu-width;
         transition: all 0.1s;

         &.fold {
           // 宽度 = 界面宽度 - 折叠后菜单栏所占宽度
           width: calc(100vw - $base-menu-min-width);
           // 距离折叠后菜单栏宽度
           left: $base-menu-min-width;
         }
       }
     }
   </style>
   ```

5. 联动更新main

   ```html
   <template>
     <div class="layout_container">
       <!-- 内容展示区域 -->
       <div
         class="layout_main"
         :class="{ fold: settingStore.fold ? true : false }"
       >
         <main></main>
       </div>
     </div>
   </template>
   
   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'
   
     const settingStore = useSettingStore()
   </script>
   
   <style lang="scss" scoped>
       .layout_main {
         position: absolute;
         width: calc(100% - $base-menu-width);
         height: calc(100vh - $base-tabbar-height);
         background-color: yellowgreen;
         left: $base-menu-width;
         top: $base-tabbar-height;
         padding: 20px;
         overflow: auto;
         transition: all 0.1s;
   
         &.fold {
           width: calc(100vw - $base-menu-min-width);
           left: $base-menu-min-width;
         }
       }
     }
   </style>
   ```

### 6.10 动态更新面包屑

1. 获取路由

   使用route.matched函数，此函数能得到当前路由的信息

   ![](https://tuchuang1.pages.dev/img/vue_template/image-20240102111106668.png)

2. 修改界面

   `src\layout\tabbar\breadcrumb\index.vue`

   ```html
   <template>
     <!-- 左侧的面包屑 -->
     <el-breadcrumb separator-icon="ArrowRight">
       <el-breadcrumb-item
         v-for="(item, index) in route.matched"
         :key="index"
         v-show="item.meta.title"
         :to="item.path"
       >
         {{ item.meta.title }}
       </el-breadcrumb-item>
     </el-breadcrumb>
   </template>

   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'
     import { useRoute } from 'vue-router'

     // 获取layout配置相关的仓库
     let settingStore = useSettingStore()
     // 路由
     const route = useRoute()

     const changeIcon = () => {
       console.log(settingStore.fold)
       settingStore.fold = !settingStore.fold
     }
   </script>

   <style lang="scss" scoped></style>
   ```

   - v-show控制无标题时不显示`>`

3. 设置点击权限管理时自动跳转到用户管理

   `src\router\router.ts`

   ```js
   {
       path: '/acl',
       component: () => import('@/layout/index.vue'),
       name: 'Acl',
       meta: {
         hidden: false,
         title: '权限管理',
         icon: 'Lock',
       },
       redirect: '/acl/user',
   }
   ```

### 6.11 刷新功能实现

1. 在setting仓库添加refresh属性

   `src\store\modules\setting.ts`

   ```js
   //小仓库：layout组件相关配置仓库
   import { defineStore } from 'pinia'

   const useSettingStore = defineStore('SettingStore', {
     state: () => {
       return {
         fold: false, //用户控制菜单折叠还是收起的控制
         refresh: false, //用于控制刷新效果
       }
     },
   })

   export default useSettingStore
   ```

2. 在setting.vue组件中配置刷新按钮点击事件

   `src\layout\tabbar\setting\index.vue`

   ```html
   <template>
     <el-button
       size="small"
       icon="Refresh"
       circle
       @click="updateRefresh"
     ></el-button>
   </template>

   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'

     const settingStore = useSettingStore()
     const updateRefresh = () => {
       settingStore.refresh = !settingStore.refresh
     }
   </script>

   <style lang="scss" scoped></style>
   ```

3. 在main组件中监听按钮状态值，状态值变化就重建路由组件

   `src\layout\main\index.vue`

   ```html
   <template>
     <!-- 路由组件出口的位置 -->
     <router-view v-slot="{ Component }">
       <transition name="fade">
         <div v-if="flag">
           <!-- 渲染layout一级路由的子路由 -->
           <component :is="Component" />
         </div>
       </transition>
     </router-view>
   </template>
   <script setup lang="ts">
     import { ref, watch, nextTick } from 'vue'
     import useSettingStore from '@/store/modules/setting'
   
     const settingStore = useSettingStore()
     //控制当前组件是否销毁重建
     let flag = ref(true)
     //监听仓库内部的数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
     watch(
       () => settingStore.refresh,
       () => {
         //点击刷新按钮：路由组件销毁
         flag.value = false
         // 异步刷新，vue重建DOM后会调用该方法
         // https://lianyutian.github.io/posts/dd58b23f.html 9.5章节
         nextTick(() => {
           flag.value = true
         })
       },
     )
   </script>
   ```

### 6.12 全屏功能实现

1. 绑定全屏按钮点击事件

   `src\layout\tabbar\setting\index.vue`

   ```html
   <template>
     <el-button
       size="small"
       icon="FullScreen"
       circle
       @click="fullScreen"
     ></el-button>
     <script setup lang="ts">
       // 全屏功能
       const fullScreen = () => {
         // DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
         let full = document.fullscreenElement
         // 切换成全屏
         if (!full) {
           // 文档根节点的方法requestFullscreen实现全屏
           document.documentElement.requestFullscreen()
         } else {
           // 退出全屏
           document.exitFullscreen()
         }
       }
     </script>
   
     <style lang="scss" scoped></style>
   </template>
   ```

## 7. 登录功能完善

### 7.1 获取用户信息

1. 添加用户state存储类型和属性

   `src\store\modules\type\type.ts`

   ```js
   import { RouteRecordRaw } from 'vue-router'

   export interface UserState {
     token: string | null
     menuRoutes: RouteRecordRaw[]
     username: string
     avatar: string
   }
   ```

   `src\store\modules\user.ts`

   ```js
   // 创建用户小仓库
   const useUserStore = defineStore('UserStore', {
     // 用户仓库存储数据地方
     state(): UserState {
       return {
         token: GET_TOKEN(),
         menuRoutes: constantRoute,
         username: '',
         avatar: '', // 用户头像
       }
     },
   }
   ```

2. 添加获取信息方法 userInfoAction

   `src\store\modules\user.ts`

   ```js
   // src/store/modules/user.ts

   // 创建用户相关的仓库
   import { defineStore } from 'pinia'
   import { loginForm, loginResponseData } from '@/api/user/type'
   import { reqLogin, reqUserInfo } from '@/api/user'
   import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
   import { UserState } from './type/type'
   import { constantRoute } from '@/router/router'

   // 创建用户小仓库
   const useUserStore = defineStore('UserStore', {
     // 用户仓库存储数据地方
     state(): UserState {
       return {
         token: GET_TOKEN(),
         menuRoutes: constantRoute,
         username: '',
         avatar: '',
       }
     },
     // 处理异步|逻辑地方
     actions: {
       // 获取用户信息
       async userInfoAction() {
         const result = await reqUserInfo()
         if (result.code === 200) {
           this.username = result.data.checkUser.username
           this.avatar = result.data.checkUser.avatar
         }
         console.log(result)
       },
     },
     getters: {},
   })
   // 对外暴露小仓库
   export default useUserStore
   ```

3. 修改请求携带token信息

   此前获取用户信息，未携带token会获取不到用户信息

   `src\utils\request.ts`

   ```js
   import axios from 'axios'
   import { ElMessage } from 'element-plus'
   import useUserStore from '@/store/modules/user'

   //创建axios实例
   const request = axios.create({
     baseURL: import.meta.env.VITE_APP_BASE_API,
     timeout: 5000,
   })
   //请求拦截器
   request.interceptors.request.use((config) => {
     //获取用户相关的小仓库，获取token，登录成功以后携带个i服务器
     const userStore = useUserStore()
     if (userStore.token) {
       config.headers.token = userStore.token
     }
     //config配置对象，headers请求头，经常给服务器端携带公共参数
     //返回配置对象
     return config
   })
   ```

4. home组件挂载获取用户信息

   > 登录之后页面（home）上来就要获取用户信息。并且将它使用到页面中

   `src\views\home\index.vue`

   ```html
   <template>
     <div>一级路由home</div>
   </template>

   <script setup lang="ts">
     import { onMounted } from 'vue'
     import useUserStore from '@/store/modules/user'

     const userStore = useUserStore()
     onMounted(() => {
       userStore.userInfoAction()
     })
   </script>
   ```

5. 修改设置组件中的用户信息

   `src\layout\tabbar\setting\index.vue`

   ```html
   <template>
     <img
       :src="userStore.avatar"
       style="width: 24px; height: 24px; margin: 0px 10px"
     />
     <!-- 下拉菜单 -->
     <el-dropdown>
       <span class="el-dropdown-link">
         {{ userStore.username }}
         <el-icon class="el-icon--right">
           <arrow-down />
         </el-icon>
       </span>
       <template #dropdown>
         <el-dropdown-menu>
           <el-dropdown-item>退出登陆</el-dropdown-item>
         </el-dropdown-menu>
       </template>
     </el-dropdown>
   </template>
   
   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'
     import useUserStore from '@/store/modules/user'
     import useStore from 'element-plus/es/components/table/src/store/index.mjs'
   
     const userStore = useUserStore()
   </script>
   ```

### 7.2 退出登录

1. 绑定退出登录按钮点击事件

   `src\layout\tabbar\setting\index.vue`

   ```html
   <template>
     <!-- 下拉菜单 -->
     <el-dropdown>
       <template #dropdown>
         <el-dropdown-menu>
           <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
         </el-dropdown-menu>
       </template>
     </el-dropdown>
   </template>

   <script setup lang="ts">
     import useSettingStore from '@/store/modules/setting'
     import useUserStore from '@/store/modules/user'
     import { useRouter, useRoute } from 'vue-router'

     const userStore = useUserStore()

     // 退出登录
     const router = useRouter()
     const route = useRoute()
     const logout = () => {
       //第一件事：需要项服务器发请求【退出登录接口】（我们这里没有）
       //第二件事：仓库当中和关于用户的相关的数据清空
       userStore.userLogoutAction()
       //第三件事：跳转到登陆页面
       router.push({ path: '/login', query: { redirect: route.path } })
     }
   </script>
   ```

   - 携带的query参数方便下次登陆时直接跳转到当时推出的界面

2. 清空用户信息

   `src\store\modules\user.ts`

   ```js
   // src/store/modules/user.ts

   // 创建用户相关的仓库
   import { defineStore } from 'pinia'
   import { loginForm, loginResponseData } from '@/api/user/type'
   import { reqLogin, reqUserInfo } from '@/api/user'
   import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
   import { UserState } from './type/type'
   import { constantRoute } from '@/router/router'

   // 创建用户小仓库
   const useUserStore = defineStore('UserStore', {
     // 用户仓库存储数据地方
     state(): UserState {
       return {
         token: GET_TOKEN(),
         menuRoutes: constantRoute,
         username: '',
         avatar: '', // 用户头像
       }
     },
     // 处理异步|逻辑地方
     actions: {
       // 退出登录
       userLogoutAction() {
         //当前没有mock接口（不做）：服务器数据token失效
         //本地数据清空
         this.token = ''
         this.username = ''
         this.avatar = ''
         REMOVE_TOKEN()
       },
     },
     getters: {},
   })
   // 对外暴露小仓库
   export default useUserStore
   ```

3. 添加清除token方法

   `src\utils\token.ts`

   ```js
   export const REMOVE_TOKEN = () => {
     localStorage.removeItem('TOKEN')
   }
   ```

4. 登录时判断是否有query参数

   `src\views\login\index.vue`

   ```html
   <script setup lang="ts">
     const router = useRouter()
     const route = useRoute()
     let userStore = useUserStore()
     // 登录
     const login = async () => {
       //保证全部表单项校验通过
       await loginFormRef.value.validate()
       loadType.value = true
       try {
         await userStore.userLoginAction(loginForm)
         //编程式导航跳转到展示数据首页
         //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
         let redirect: any = route.query.redirect
         router.push({ path: redirect || '/' })
         ElNotification({
           type: 'success',
           message: '欢迎回来',
           title: `HI,${getTime()}好`,
         })
         loadType.value = false
       } catch (error) {
         loadType.value = false
         ElNotification({
           type: 'error',
           message: (error as Error).message,
         })
       }
     }
   </script>
   ```

   - 此时不在首页界面退出登录会有登录后再登录获取不到用户信息的bug，后面修复

### 7.4 路由鉴权

1. 安装进度条组件

   `pnpm i nprogress`

2. 新建`permisstion.ts`

   `src\permisstion.ts`

   ```js
   //路由鉴权：鉴权：项目当中路由能不能被访问的权限
   import router from '@/router'
   import setting from './setting'
   import nprogress from 'nprogress'
   //引入进度条样式
   import 'nprogress/nprogress.css'
   //进度条的加载圆圈不要
   nprogress.configure({ showSpinner: false })
   //获取用户相关的小仓库内部token数据，去判断用户是否登陆成功
   import useUserStore from '@/store/modules/user'
   //为什么要引pinia
   import pinia from './store'
   const userStore = useUserStore(pinia)
   
   //全局前置守卫
   router.beforeEach(async (to: any, from: any, next: any) => {
     //网页的名字
     document.title = `${setting.title}-${to.meta.title}`
     //访问某一个路由之前的守卫
     nprogress.start()
     //获取token，去判断用户登录、还是未登录
     const token = userStore.token
     //获取用户名字
     const username = userStore.username
     //用户登录判断
     if (token) {
       //登陆成功，访问login。指向首页
       if (to.path == '/login') {
         next('/home')
       } else {
         //登陆成功访问其余的，放行
         //有用户信息
         if (username) {
           //放行
           next()
         } else {
           //如果没有用户信息，在收尾这里发请求获取到了用户信息再放行
           try {
             //获取用户信息
             await userStore.userInfoAction()
             next()
           } catch (error) {
             //token过期|用户手动处理token
             //退出登陆->用户相关的数据清空
             userStore.userLogoutAction()
             next({ path: '/login', query: { redirect: to.path } })
           }
         }
       }
     } else {
       //用户未登录
       if (to.path == '/login') {
         next()
       } else {
         next({ path: '/login', query: { redirect: to.path } })
       }
     }
     next()
   })
   
   //全局后置守卫
   router.afterEach((to: any, from: any) => {
     // to and from are both route objects.
     nprogress.done()
   })
   
   //第一个问题：任意路由切换实现进度条业务 ----nprogress
   //第二个问题：路由鉴权
   //全部路由组件 ：登录|404|任意路由|首页|权限管理（三个子路由）|
   
   //用户未登录 ：可以访问login 其余都不行
   //登陆成功：不可以访问login 其余都可以
   ```

   - 问题？

     不引入pinia时

     ![](https://tuchuang1.pages.dev/img/vue_template/image-20240102162108423.png)

   - 全局路由守卫将获取用户信息的请求放在了跳转之前。实现了刷新后用户信息丢失的功能
