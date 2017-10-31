# 这是一个基于 vue(2.x以上) + vuex + vue-router(+ eventBus) 的前端开发SPA项目脚手架。

## 脚手架主要技术选型和技术实现如下:

1. vue + vuex + vue-vue-router `vue框架全家桶`
2. 采用express^4.x + webpack^3.x 搭建的前端开发环境
3. 语言风格要求: es6 + scss
4. 采用qwest(ajax库)进行前端api的封装，通过express中间件的代理，实现接口的模块化统一管理，支持mock.js进行前端模拟请求及模拟数据
5. 采用element-ui为ui库
6. 引用webFont字体图标作为标准图库
7. 采用echart渲染图表
8. 采用karma作为前端自动化单元测试
9. 采用eslint统一前端代码规范