1.创建electron项目，[完全基于官方文档](https://www.electronjs.org/zh/docs/latest/)。发现打包有新的工具**Electron Forge**，比electron-builder使用更方便。但是无法自定义安装目录，且Squirrel频繁报错，不建议。

2.切换回electron-builder打包方式。

3.将渲染进程改为React项目，开发打包。

4.主进程、preload代码用esbuild编译压缩，增加asar解包后阅读成本。

5.增加前端工程相关工具，eslint，prettier，editorconfig等。

6.
