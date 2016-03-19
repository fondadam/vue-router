####关于vue-router

**vue-router**是**Vue.js**官方的一个路由，它深度整合了**Vue.js**以更好的创建一个单页面应用。

Include：
- Nested route/view mapping
- Modular, component-based router configuration
- Route params, query, wildcards
- View transition effects powered by Vue.js' transition system
- Fine-grained navigation control
- Links with automatic active CSS classes
- HTML5 history mode or hash mode, with auto-fallback in IE9
- Restore scroll position when going back in history mode

[Get started with the documentation.](http://vuejs.github.io/vue-router/)


####Development Setup

```javascript
# install deps
npm install

# build dist files
npm run build

# and unit tests at localhost:8080
npm run dev
```

###开始

在Webpack设置好入口后，在入口处实例化Router,当然，你也可以传入一些配置参数.
```javascript
new Router({
  // Default: true, 设置为false的时候，路径会被格式化为：**/#/foo/bar**,反之为**/#!/foo/bar**
	hashbang: [Boolean],
	// Default: false, 在初次加载时是否对**<router-view></router-view>**处理场景切换,默认会直接渲染
	transitionOnLoad: [Boolean]
})
```

对于路由设置这里主要有三个路径：
```javascript
router.map({
    '/list': {
        name: 'markdown',
        setting: setting,
        component:  Listview
    },
    '/list/:archive':{
        name: 'archive',
        setting: setting,
        component: Listview,
    },
    '/post/:archive/:title': {
        name: 'post',
        setting: setting,
        component:Postview
    }
});
```

默认任何其他无效路径都是指向于**/list/markdown**,即显示各种post的列表,**/list/:archive**是指向各个post归档，``name``在这里可以理解为一个路由别名alias,具体可看文档。

####关于组件
**App.vue**主要引入了三个组件**Listview.vue**、**MenuButton.vue**、**Postview.vue**,在**<router-view></router-view>**进行切换，**transition-mode**是切换的方式，``in-out``即是当新组件加载进来了，再将就组件移出去。

关于**vue-router**,他有一个具体的生命周期：``canResuse``->``canDeactivate``->``canActivate``->``deactivate``->``activate``，在什么时候需要做什么操作就在什么时候调用对应的钩子即可。

```javascript
组件component：
App.vue
  - Listview.vue
  - MenuButton.vue
  - Postview.vue

过滤器filter:
index.js
  // 因*.md包含了日期和标题，这里主要是介绍vue-router，所以便正则简单过滤了一下，否则可像hexo那样用模板参数
	- onlyTitle
	// 对日期进行过滤
	- onPublishDate

仓库store:
index.js
  // 异步请求文件内容，并返回一个Promise(利用GitHub的API)
	- getPost
	// 异步请求列表
	- getListByName

配置setting:
// 各种路径参数，GitHub API请求参数，标题等...
index.js
```

####有了上面的大概轮廓后，我们再来了解一下其中某些重要的细节。

```javascript
router.redirect({
    '*': '/home'
});

router.alias({
    '/home': '/list/markdown'
});
```
因为有了上面两段代码，我们一开始访问的页面其实是挂载在App.vue上的**Listview.vue**，而且我们还设置了**$loadingRouteData**参数，这样在异步请求还未resolve时，页面将会有一个过渡界面。紧接着导入``filter``和``store``。

```javascript
route: {
  data ({ to }) {
    const archive = to.params.archive;
    document.title = to.setting.blogTitle;

    return {
      items: store.getListByName(archive).then(items => items)
    };
  },
}
```
这里采用的是ES6进行编码，``route``里面的data参数是官网文档所说的transition,但这里利用了ES6的对象解构，可以方便获取URL上的params,获取list成功后将resolve数据到组件中的``data``项，这样在HTML上就可以直接通过``Vue.js``的template模板变量进行遍历访问。

同时，每个Listview的item都有一个**v-link**链接到**/post/{title}**页面，对应于组件**Postview.vue**,在该页面下，同样使用了``store``里封装的一个异步请求函数，resolve后将数据直接渲染到组件页面中。

```javascript
watch: {
  content() {
    let linksArray = Array.from(document.querySelectorAll('a'));
    const currentHost = window.location.host;
    linksArray.forEach(el => {
      if (el.href && el.host !== currentHost) {
        el.target = '_blank'
      }
    });
  }
}
```

这里的``watch``是当content有变化时，遍历内容中的a标签，若非当前域名下的页面，则将其target设置为新建一个窗口打开。

说到这里，其实这个Demo的已经介绍的差不多了，UI那些其实看多几遍就好，看一个项目的源码，首先找到入口，对整体的轮廓和交互逻辑有了个大概的了解后，再来对细节部分逐一攻破。

不然，老是纠结于某细小的一点那样太浪费时间了，而且能力也并不会提高多少。
