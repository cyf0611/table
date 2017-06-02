# 基于jq生成table的插件
###使用方法如下
1. 首先引入Jq文件
2. `body`中插入table标签，写上id
3. `script`中引入相关API，如下：

```
$('#table').setTable({
	    //行宽和列高
	    lineWidth: 200,
	    lineHeight: 40,
	    //标题行
	    title: ['ID','name','age'],
	    //隔行变色,默认为白色，不需设置
	    color:{
            title:'red',
		    odd: 'blue',
		    even: 'yellow',
		    hover: 'pink'
	    },
	    //是否分页，默认不分页
	    page: {
		    status: true,
		    max: 3
	    },
	    //数据  在线url或者数组
	    data: [
		    {
			    id : 1,
			    name : 'jim',
			    age : 18
		    },
		    {
			    id : 2,
			    name : 'jim',
			    age : 18
		    },
		    {
			    id : 3,
			    name : 'ji2m',
			    age : 18
		    }
    })
```
**注：data属性也可直接写上url或者本地的json文件，直接写上字符串地址就行，比如data: 'data.json' 或者 data： '数据api地址'**
