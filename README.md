## 项目简介

* 项目名称： node_elasticsearch

* 项目描述：使用Elasticsearch搭建搜索服务器

* 学习参考：
* [学习用Node.js和Elasticsearch构建搜索引擎](http://www.cnblogs.com/fhen/p/6652455.html) 

* [如何用 Node.js 和 Elasticsearch 构建搜索引擎](http://www.oschina.net/translate/search-engine-node-elasticsearch)

* [npm elasticsearch](https://www.npmjs.com/package/elasticsearch)


## 项目初始化

* npm install

* nodemon bin/www


## Elasticsearch简介

* Elasticsearch 是一个分布式的 RESTful 风格的搜索和数据分析引擎，能够解决不断涌现出的各种用例。
作为 Elastic Stack 的核心，它集中存储您的数据，帮助您发现意料之中以及意料之外的情况。

* [官方网站：https://www.elastic.co/cn/products/elasticsearch](https://www.elastic.co/cn/products/elasticsearch)

* [官方下载地址：https://www.elastic.co/cn/downloads/elasticsearch](https://www.elastic.co/cn/downloads/elasticsearch)

* [权威指南（中文）https://es.xiaoleilu.com/index.html](https://es.xiaoleilu.com/index.html)


## 数据同步（全量同步与增量同步）

* 全量同步是指全部将数据同步到es，通常是刚建立es，第一次同步时使用。增量同步是指将后续的更新、插入记录同步到es。

* 方法一：elasticsearch-jdbc 本项目中已经尝试过，但是最新版本的（elasticsearch-jdbc-2.3.4.0）仅支持 elasticsearch-2.3.4.zip ，在高版本就不支持了，本项目放弃使用了。

* 方法二：本项目采用的方式。Logstash-input-jdbc 官方推荐，logstash-input-jdbc 能较好的实现mysql的insert、update的操作的增量、全量数据同步更新到ES。 但delete操作的实时同步没有很好的解决方案。

* 参考博客：

* [elasticsearch-jdbc实现MySQL同步到ElasticSearch深入详解 http://blog.csdn.net/laoyang360/article/details/51694519](http://blog.csdn.net/laoyang360/article/details/51694519)

* [使用Logstash-input-jdbc同步数据库中的数](http://www.cnblogs.com/a-du/p/7611620.html)

* [http://blog.csdn.net/yeyuma/article/details/50240595](http://blog.csdn.net/yeyuma/article/details/50240595)

* [http://www.cnblogs.com/phpshen/p/6098333.html](http://www.cnblogs.com/phpshen/p/6098333.html)


## Logstash-input-jdbc 安装

* Logstash-input-jdbc 是 Logstash 的一个插件，Logstash 需要ruby开发环境。

* 第一步：安装 ruby [Mac OS X 上安装Ruby运行环境](http://www.jianshu.com/p/f7f901f5e768) ，[Ruby 安装 - Linux](http://www.runoob.com/ruby/ruby-installation-unix.html)

* 第二步：安装 logstash-input-jdbc

* 下载地址 
https://www.elastic.co/downloads/logstash 
目前最新版 5.2.1 
这里使用 TAR.GZ 源码安装

```
1、wget https://artifacts.elastic.co/downloads/logstash/logstash-5.2.1.tar.gz

2、tar -zxvf logstash-5.2.1.tar.gz
```
* 测试是否安装成功

```
bin/logstash -e 'input { stdin { } } output { stdout {}}'
```
* 第三步：MYSQL 插件 logstash-input-jdbc插件

* logstash-input-jdbc插件是logstash 的一个个插件。 使用ruby语言开发

* 进入到 logstash-5.2.1 目录

```
bin/logstash-plugin install logstash-input-jdbc
```
* 显示如下表示安装成功

```
Validating logstash-input-jdbc
Installing logstash-input-jdbc
Installation successful
```

* [安装参考：http://blog.csdn.net/fenglailea/article/details/56282414](http://blog.csdn.net/fenglailea/article/details/56282414)

* [logstash-input-jdbc插件配置细节1](http://blog.csdn.net/lvyuan1234/article/details/78190766)

* [logstash input jdbc连接数据库](http://www.cnblogs.com/licongyu/p/5383334.html#undefined)


## 其它

* [Elasticsearch精确查询](https://www.elastic.co/guide/cn/elasticsearch/guide/current/_finding_exact_values.html)

* [mysql 与elasticsearch实时同步常用插件及优缺点对比](http://blog.csdn.net/laoyang360/article/details/51771621)

* 后台启动logstash [nohup](http://blog.csdn.net/qinglu000/article/details/18963031)

```
nohup ./bin/logstash -f mysql-connection/jdbc.conf >/dev/null 2>&1 &

```

* 主要配置文件

```
/data/soft/logstash-5.2.1/mysql-connection

```

* 删除索引

```
curl -XDELETE 'http://127.0.0.1:9200/product'
```
* 查看索引

```
curl 'localhost:9200/_cat/indices?v'
```