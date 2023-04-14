# mapcloud-ui
## roadmap
- [] bug反馈
    - feishu 反馈链接
- [] antd
- [] Absolute path support

## Pros and Crons
Pros:
- 源码封装层次很低, 方便深入源码, 扩展并集成第三方代码简单
    - [todo] 后期增加puppeteer 功能测试
- 调试干净利落:　没有过多的中间代码,　没有webpack
- 部署方便:　没有用依赖
- 体积非常小:　没有`node_modules`

Cons:
- 部分npm包有兼容问题
    - 可能需要:向esm.sh 提issue, 或者修改package 源码
    - 或者自行编译源码编译到esm模块(不过commonjs+esm融合有些问题)
    - 或者利用`deno_est` 将源码本身转换成esm
    - 或者引用cdn包(但是缺失ts类型提示)
- 目前不支持HMR(WIP: HMR esm)
