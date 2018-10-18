# FFXIV 狩猎怪提示

生成狩猎怪的提示文本列表。

## 使用

### 获取所有狩猎怪相关文件

在 exd/custom/ 文件夹下，找到所有含有“关于B级怪物”的 csv 文件。例如：

```bash
ag '关于B级怪物' -l > files.txt
```

并拷贝到 files 文件夹下。

### 生成 csv 文件

```bash
yarn
node app.js > mobhunt.csv
```

