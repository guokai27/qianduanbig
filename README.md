# QuickV

> A Powerful and Accessible Data Visualization Tool

## 环境需求
安装nodejs
web服务器，对于linux系统需要安装apache2

``` bash
    - apt install apache2
```

## 编译production模式注意先安装phantomjs
sudo apt-get install phantomjs

phantomjs --version

## 不要使用taobao的cnpm进行安装和打包

## 以备某些环境下由于网速和墙的问题导致npm安装出问题

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 配置web服务器bi并启动web服务

    - quickV的编译结果存于quickV工作目录下的dist目录。该目录需要被整体发布作为一个quickV的web服务站点。
    - 对于apache需要为quickV配置一个独立的VirtualHost，需要指定独立的服务端口（如 8081），设定DocumentRoot 指向保存quickV编译结果的dist目录或另外设置的发布目录，并设定该站点目录的访问权限。编辑 ports.conf 文件增加增加对8081端口的服务。

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
