# vue-router-power-demo

核心内容有两点： 一是保持用户登录状态，二是根据登录用户的角色动态挂在路由

## 使用vuex保持用户登录

1. 点击登录按钮，使用vuex的actions分发登录操作，发送用户名和密码到后台获取登录token， 并存入vuex的state和cookie中
2. 使用导航守卫，每次跳转页面的时候检查是否有token，以此来判断用户是否登录

## 动态挂在路由

1. 登录成功后拉去用户信息，包括用户角色，用户名等
2. 根据用户角色循环判断预设路由表，将符合要求的路由筛选出来，使用`addRoutes()`动态挂载

## `src`项目结构

```c
src
│  App.vue
│  main.js
│  permission.js   // vue router 守卫导航，对token和role进行判断
├─api              // 统一管理前端与服务器之间的api接口
├─layout           // 主视图的结构管理，包括header，side-bar，main-body等
│  │  index.vue
│  └─components
│      ├─header
│      │      index.vue
│      └─sidebar
│              index.vue
│              side-item.vue  // side-bar菜单动态渲染的核心组件
├─mock            // 前端模拟服务器获取数据，modules下的文件名和api接口一一对应
│  │  index.js
│  └─modules
│          getuserinfo.js
│          login.js
│          logout.js
├─router          // 路由表，本身只需要一个index，为了结构分离了两个路由表
│      asyncRoutes.js       // 需要动态挂载的路由表
│      constantRoutes.js    // 常规路由表，通常为 login、404等一些不需要权限的路由表
│      index.js
├─store           // 加载 store 模块和 getters
│  │  getters.js  // 全局getters
│  │  index.js
│  └─modules      // 模块形式的store
│          permission.js
│          user.js
├─style
│      index.scss
├─utils
│      request.js // 封装了axios，这里只是简单封装，但实际项目中肯定有各种需求
└─views           // 各个页面内容
    ├─document
    │      index.vue
    ├─error-page
    │      404.vue
    ├─login
    │      index.vue
    ├─page1
    │      index.vue
    ├─page2
    │      index.vue
    └─permission
            page.vue
            super.vue
            user.vue
```

## 敲黑板，划重点

### `permission.js`

放置全局导航守卫，和文件名一样，对用户的跳转行为进行判断，主要是利用`vuex.store`中的token和role进行判断，并完成路由的动态加载行为

### `store/modules/user.js`

用户的全局状态，最关键的两个变量，token 和 role 。

token的默认值可以用`cookies.get('token')`获取，因为当页面刷新时，`vuex.store`中的所有状态都会重置，本身就需要判断和从cookie中获取，这样写省了一次判断，而且更为便捷。

actions的内容分发，主要有三个，`login`获取后台token并保存，`getUserInfo`获取用户信息并保存，`logout`清除本地的token和role等信息

### `store/modules/permission.js`

用于储存全局路由表，有两个作用，一是获取需要动态挂载的路由表，二是用于侧边栏的导航渲染。

actions的主要内容时用role对`asyncRoutes`路由表进行筛选

### `router/constantRoutes.js` 和 `router/asyncRoutes.js`

`constantRoutes.js` `asyncRoutes.js`这两个路由表很简单，本来就是和`index.js`一起配置的，但是为了清晰逻辑和结构把这两个表分离了出来。constantRoutes是默认加载路由，asyncRoutes是需要使用role进行筛选的路由，路由表的结构及配置是需要配合`store/modules/permission.js`一起使用。

这里使用的筛选逻辑：对每个route判断是否配置了`meta.roles`，如果没有，则表示该route全局可用，如果有，再查找`meta.roles`中是否有role的值，如果有表示该用户有使用这个route的权限。

最后很重要的一点，`asyncRoutes`路由表的最后需要配置`{ path: '*', hidden: true, redirect: '/404' }`，并且只能配置在最后，用来跳转非合法的url

## 不在重点中的重点

这个说法有点矛盾，之所以说不在重点中，是因为上面的js中已经完成了用户的登录及页面权限的分配。

但是，我要说但是了，网页是需要导航页来引导用户的，如果将所有连接都放入导航页，那么没有权限的用户点击会跳转到404页，这在用户体验上不好，那么就需要在渲染导航页的时候对role进行判断。导航页少的时候还不麻烦，导航页一多就会显得十分繁重，而且不易维护。所以使用路由表动态的渲染出导航。

在`store/modules/permission.js`的state中有个`routes`存储了该用户完整的权限路由表，导航菜单就是循环渲染这个路由表，但是该路由表中有许多路由时不需要在导航页中出现的，比如login，404等。这个时候就需要用到路由表中的`hidden`设置了，渲染的时候通过`hidden`来判断是否将该路由渲染到导航菜单中。

官方的标准路由表中是没有`hidden`这个配置的，这个选项其实应该是写在`meta`中的，只是可能为了方便写在了最外层，网上能找到的很多路由权限实列都是这样写的。所以如果有多个导航菜单并存的情况下，`hidden`不妨也可以改写成`showOnTop`、`showOnSide`，渲染的时候使用对应的选项进行判断即可。

既然导航菜单是用路由表渲染的，那么路由表的结构和顺序就显得十分重要的，这和渲染出来的导航菜单顺序及结构是一直的，复杂的导航菜单通常都有二级菜单和三级菜单，这用到了组件的递归，因为比较复杂，所以这个demo只做了简单的一级导航，目的是为了清晰的展示登录和页面权限管理

# TODO

- 页面按钮权限管理
