/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
// import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'
Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  // { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
  // eslint-disable-next-line standard/object-curly-even-spacing
  { path: '/login', component: () => import('@/views/login/index'), name: 'login', meta: { title: '登录' }},
  // eslint-disable-next-line standard/object-curly-even-spacing
  { path: '/header', name: 'header', component: () => import('../components/header/header')},
  // eslint-disable-next-line standard/object-curly-even-spacing
  { path: '/feeds', name: 'feeds', component: () => import('../components/feeds/feeds')},
  // eslint-disable-next-line standard/object-curly-even-spacing
  { path: '/banner', name: 'banner', component: () => import('../components/banner/banner')}
]

// 前端页面路由
const websiteRoutes = [
  { path: '/page',
    component: require('@/views/website/mainlayout').default,
    redirect: { name: 'fonthome' },
    name: 'page',
    meta: { title: '主页入口布局' },
    children: [
      // eslint-disable-next-line standard/object-curly-even-spacing
      { path: '/page/home', component: require('@/views/website/common/contenthome').default, name: 'fonthome', meta: { title: '主页'} },
      { path: '/page/demo-echart', component: _import('demo/echarts'), name: 'demo-echart', meta: { title: 'demo-echart', isTab: true } }
    ]
  }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'project' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/project', component: _import('modules/sys/project'), name: 'project', meta: { title: '项目' } },
    { path: '/sys-device', component: _import('modules/sys/device-detail'), name: 'deviceb', meta: { title: '设备基础' } },
    { path: '/sys-gatewayDetail/:id/:option', component: _import('modules/sys/gateway-detail'), name: 'gatewayDetail', meta: { title: '网关详情' } },
    { path: '/sys-deviceDetail/:id/:option', component: _import('modules/sys/device-detail'), name: 'deviceDetail', meta: { title: '设备详情' } },
    { path: '/sys-templateDetail/:id/:option', component: _import('modules/sys/sensortemplate-detail'), name: 'templateDetail', meta: { title: '点位模板详情' } },
    { path: '/sys-survey', component: _import('modules/sys/survey'), name: 'survey', meta: { title: '项目概况' } },
    { path: '/sys-dataView', component: _import('modules/sys/dataView'), name: 'dataView', meta: { title: '数据查看' } }
  ],
  beforeEnter (to, from, next) {
    // let token = Vue.cookie.get('token')
    let token = JSON.parse(sessionStorage.getItem('token'))
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

// 页面刷新时，重新赋值token
// if (localStorage.getItem('token')) {
//   store.commit('setToken', localStorage.getItem('token'))
// }

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes).concat(websiteRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    // http({
    //   url: http.adornUrl('/sys/menu/nav'),
    //   method: 'get',
    //   params: http.adornParams()
    // }).then(({data}) => {
    //   if (data && data.code === 0) {
    //     fnAddDynamicMenuRoutes(data.menuList)
    //     router.options.isAddDynamicMenuRoutes = true
    //     sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
    //     sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
    //     next({ ...to, replace: true })
    //   } else {
    //     sessionStorage.setItem('menuList', '[]')
    //     sessionStorage.setItem('permissions', '[]')
    //     next()
    //   }
    // }).catch((e) => {
    //   console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
    //   router.push({ name: 'login' })
    // })
    let data = {
      'menuList': [
        // {
        //   'menuId': 1,
        //   'parentId': 0,
        //   'parentName': null,
        //   'name': '系统管理',
        //   'url': null,
        //   'perms': null,
        //   'type': 0,
        //   'icon': 'system',
        //   'orderNum': 0,
        //   'open': null,
        //   'list': [
        //     {
        //       'menuId': 2,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '管理员列表',
        //       'url': 'sys/user',
        //       'perms': null,
        //       'type': 1,
        //       'icon': 'admin',
        //       'orderNum': 1,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 3,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '角色管理',
        //       'url': 'sys/role',
        //       'perms': null,
        //       'type': 1,
        //       'icon': 'role',
        //       'orderNum': 2,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 4,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '菜单管理',
        //       'url': 'sys/menu',
        //       'perms': null,
        //       'type': 1,
        //       'icon': 'menu',
        //       'orderNum': 3,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 5,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': 'SQL监控',
        //       'url': 'http://localhost:8080/renren-fast/druid/sql.html',
        //       'perms': null,
        //       'type': 1,
        //       'icon': 'sql',
        //       'orderNum': 4,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 6,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '定时任务',
        //       'url': 'job/schedule',
        //       'perms': null,
        //       'type': 1,
        //       'icon': 'job',
        //       'orderNum': 5,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 27,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '参数管理',
        //       'url': 'sys/config',
        //       'perms': 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
        //       'type': 1,
        //       'icon': 'config',
        //       'orderNum': 6,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 30,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '文件上传',
        //       'url': 'oss/oss',
        //       'perms': 'sys:oss:all',
        //       'type': 1,
        //       'icon': 'oss',
        //       'orderNum': 6,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 29,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '系统日志',
        //       'url': 'sys/log',
        //       'perms': 'sys:log:list',
        //       'type': 1,
        //       'icon': 'log',
        //       'orderNum': 7,
        //       'open': null,
        //       'list': null
        //     },
        //     {
        //       'menuId': 30,
        //       'parentId': 1,
        //       'parentName': null,
        //       'name': '系统风险',
        //       'url': 'sys/log',
        //       'perms': 'sys:log:list',
        //       'type': 1,
        //       'icon': 'log',
        //       'orderNum': 7,
        //       'open': null,
        //       'list': null
        //     }
        //   ]
        // },
        {
          'menuId': 60,
          'parentId': 0,
          'parentName': null,
          'name': '项目管理',
          'url': 'sys/project',
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': null
        },
        {
          'menuId': 61,
          'parentId': 0,
          'parentName': null,
          'name': '项目概况',
          'url': 'sys/survey',
          'perms': null,
          'type': 1,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': null
        },
        {
          'menuId': 62,
          'parentId': 0,
          'parentName': null,
          'name': '综合视图',
          'url': null,
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': [
            {
              'menuId': 63,
              'parentId': 62,
              'parentName': null,
              'name': '能源报表',
              'url': 'sys/energyView',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 1,
              'open': null,
              'list': null
            },
            {
              'menuId': 64,
              'parentId': 62,
              'parentName': null,
              'name': '设备视图',
              'url': 'sys/deviceView',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 2,
              'open': null,
              'list': null
            },
            {
              'menuId': 65,
              'parentId': 62,
              'parentName': null,
              'name': '工单视图',
              'url': 'sys/workerView',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 3,
              'open': null,
              'list': null
            }
          ]
        },
        {
          'menuId': 66,
          'parentId': 0,
          'parentName': null,
          'name': '控制策略',
          'url': null,
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': [
            {
              'menuId': 67,
              'parentId': 66,
              'parentName': null,
              'name': '策略管理',
              'url': 'sys/strategic',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 1,
              'open': null,
              'list': null
            },
            {
              'menuId': 68,
              'parentId': 66,
              'parentName': null,
              'name': '模式管理',
              'url': 'sys/model',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 2,
              'open': null,
              'list': null
            },
            {
              'menuId': 69,
              'parentId': 66,
              'parentName': null,
              'name': '任务管理',
              'url': 'sys/task',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 3,
              'open': null,
              'list': null
            }
          ]
        },
        {
          'menuId': 70,
          'parentId': 0,
          'parentName': null,
          'name': '设备管理',
          'url': null,
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': [
            {
              'menuId': 71,
              'parentId': 70,
              'parentName': null,
              'name': '设备列表',
              'url': 'sys/device',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 1,
              'open': null,
              'list': null
            }
          ]
        },
        {
          'menuId': 72,
          'parentId': 0,
          'parentName': null,
          'name': '网关管理',
          'url': null,
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': [
            {
              'menuId': 73,
              'parentId': 72,
              'parentName': null,
              'name': '网关列表',
              'url': 'sys/gateway',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 1,
              'open': null,
              'list': null
            },
            {
              'menuId': 74,
              'parentId': 72,
              'parentName': null,
              'name': '点位模板管理',
              'url': 'sys/sensortemplate',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 2,
              'open': null,
              'list': null
            }
          ]
        },
        {
          'menuId': 75,
          'parentId': 0,
          'parentName': null,
          'name': '组态',
          'url': null,
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': [
            {
              'menuId': 76,
              'parentId': 75,
              'parentName': null,
              'name': '组态管理',
              'url': 'sys/configuration',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 1,
              'open': null,
              'list': null
            },
            {
              'menuId': 77,
              'parentId': 75,
              'parentName': null,
              'name': '组态创建',
              'url': 'sys/creation',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 2,
              'open': null,
              'list': null
            }
          ]
        },
        {
          'menuId': 78,
          'parentId': 0,
          'parentName': null,
          'name': '权限管理',
          'url': null,
          'perms': null,
          'type': 0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': [
            {
              'menuId': 79,
              'parentId': 78,
              'parentName': null,
              'name': '角色管理',
              'url': 'sys/PersonManage',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 1,
              'open': null,
              'list': null
            },
            {
              'menuId': 80,
              'parentId': 78,
              'parentName': null,
              'name': '人员管理',
              'url': 'sys/RoleManage',
              'perms': null,
              'type': 1,
              'icon': '',
              'orderNum': 2,
              'open': null,
              'list': null
            }
          ]
        },
        {
          'menuId': 81,
          'parentId':0,
          'parentName': null,
          'name': '数据查看',
          'url':'sys/dataView',
          'perms': null,
          'type':0,
          'icon': 'system',
          'orderNum': 0,
          'open': null,
          'list': null
        }
      ],
      'permissions': [
        'sys:schedule:info',
        'sys:menu:update',
        'sys:menu:delete',
        'sys:config:info',
        'sys:menu:list',
        'sys:config:save',
        'sys:config:update',
        'sys:schedule:resume',
        'sys:user:delete',
        'sys:config:list',
        'sys:user:update',
        'sys:role:list',
        'sys:menu:info',
        'sys:menu:select',
        'sys:schedule:update',
        'sys:schedule:save',
        'sys:role:select',
        'sys:user:list',
        'sys:menu:save',
        'sys:role:save',
        'sys:schedule:log',
        'sys:role:info',
        'sys:schedule:delete',
        'sys:role:update',
        'sys:schedule:list',
        'sys:user:info',
        'sys:schedule:run',
        'sys:config:delete',
        'sys:role:delete',
        'sys:user:save',
        'sys:schedule:pause',
        'sys:log:list',
        'sys:oss:all',
        'sys:manger:update',
        'sys:manger:delete',
        'sys:manger:list',
        'sys:manger:info',
        'sys:manger:select',
        'sys:manger:save'
      ]
    }
    if (data) {
      fnAddDynamicMenuRoutes(data.menuList)
      router.options.isAddDynamicMenuRoutes = true
      sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
      sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
      next({ ...to, replace: true })
    } else {
      sessionStorage.setItem('menuList', '[]')
      sessionStorage.setItem('permissions', '[]')
      next()
    }
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */

function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
