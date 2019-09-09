var dataList = [
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
  //   'list': null
  // },
  // {
  //   'menuId': 2,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '管理员列表',
  //   'url': 'sys/user',
  //   'perms': null,
  //   'type': 1,
  //   'icon': 'admin',
  //   'orderNum': 1,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 3,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '角色管理',
  //   'url': 'sys/role',
  //   'perms': null,
  //   'type': 1,
  //   'icon': 'role',
  //   'orderNum': 2,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 4,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '菜单管理',
  //   'url': 'sys/menu',
  //   'perms': null,
  //   'type': 1,
  //   'icon': 'menu',
  //   'orderNum': 3,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 5,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': 'SQL监控',
  //   'url': 'http://localhost:8080/renren-fast/druid/sql.html',
  //   'perms': null,
  //   'type': 1,
  //   'icon': 'sql',
  //   'orderNum': 4,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 6,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '定时任务',
  //   'url': 'job/schedule',
  //   'perms': null,
  //   'type': 1,
  //   'icon': 'job',
  //   'orderNum': 5,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 7,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '查看',
  //   'url': null,
  //   'perms': 'sys:schedule:list,sys:schedule:info',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 8,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '新增',
  //   'url': null,
  //   'perms': 'sys:schedule:save',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 9,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '修改',
  //   'url': null,
  //   'perms': 'sys:schedule:update',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 10,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '删除',
  //   'url': null,
  //   'perms': 'sys:schedule:delete',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 11,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '暂停',
  //   'url': null,
  //   'perms': 'sys:schedule:pause',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 12,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '恢复',
  //   'url': null,
  //   'perms': 'sys:schedule:resume',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 13,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '立即执行',
  //   'url': null,
  //   'perms': 'sys:schedule:run',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 14,
  //   'parentId': 6,
  //   'parentName': '定时任务',
  //   'name': '日志列表',
  //   'url': null,
  //   'perms': 'sys:schedule:log',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 15,
  //   'parentId': 2,
  //   'parentName': '管理员列表',
  //   'name': '查看',
  //   'url': null,
  //   'perms': 'sys:user:list,sys:user:info',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 16,
  //   'parentId': 2,
  //   'parentName': '管理员列表',
  //   'name': '新增',
  //   'url': null,
  //   'perms': 'sys:user:save,sys:role:select',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 17,
  //   'parentId': 2,
  //   'parentName': '管理员列表',
  //   'name': '修改',
  //   'url': null,
  //   'perms': 'sys:user:update,sys:role:select',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 18,
  //   'parentId': 2,
  //   'parentName': '管理员列表',
  //   'name': '删除',
  //   'url': null,
  //   'perms': 'sys:user:delete',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 19,
  //   'parentId': 3,
  //   'parentName': '角色管理',
  //   'name': '查看',
  //   'url': null,
  //   'perms': 'sys:role:list,sys:role:info',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 20,
  //   'parentId': 3,
  //   'parentName': '角色管理',
  //   'name': '新增',
  //   'url': null,
  //   'perms': 'sys:role:save,sys:menu:list',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 21,
  //   'parentId': 3,
  //   'parentName': '角色管理',
  //   'name': '修改',
  //   'url': null,
  //   'perms': 'sys:role:update,sys:menu:list',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 22,
  //   'parentId': 3,
  //   'parentName': '角色管理',
  //   'name': '删除',
  //   'url': null,
  //   'perms': 'sys:role:delete',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 23,
  //   'parentId': 4,
  //   'parentName': '菜单管理',
  //   'name': '查看',
  //   'url': null,
  //   'perms': 'sys:menu:list,sys:menu:info',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 24,
  //   'parentId': 4,
  //   'parentName': '菜单管理',
  //   'name': '新增',
  //   'url': null,
  //   'perms': 'sys:menu:save,sys:menu:select',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 25,
  //   'parentId': 4,
  //   'parentName': '菜单管理',
  //   'name': '修改',
  //   'url': null,
  //   'perms': 'sys:menu:update,sys:menu:select',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 26,
  //   'parentId': 4,
  //   'parentName': '菜单管理',
  //   'name': '删除',
  //   'url': null,
  //   'perms': 'sys:menu:delete',
  //   'type': 2,
  //   'icon': null,
  //   'orderNum': 0,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 27,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '参数管理',
  //   'url': 'sys/config',
  //   'perms': 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
  //   'type': 1,
  //   'icon': 'config',
  //   'orderNum': 6,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 29,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '系统日志',
  //   'url': 'sys/log',
  //   'perms': 'sys:log:list',
  //   'type': 1,
  //   'icon': 'log',
  //   'orderNum': 7,
  //   'open': null,
  //   'list': null
  // },
  // {
  //   'menuId': 30,
  //   'parentId': 1,
  //   'parentName': '系统管理',
  //   'name': '文件上传',
  //   'url': 'oss/oss',
  //   'perms': 'sys:oss:all',
  //   'type': 1,
  //   'icon': 'oss',
  //   'orderNum': 6,
  //   'open': null,
  //   'list': null
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
    'menuId': 90,
    'parentId': 60,
    'parentName': '项目管理',
    'name': '查看',
    'url': null,
    'perms': 'sys:manger:list,sys:manger:info',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 91,
    'parentId': 60,
    'parentName': '项目管理',
    'name': '新增',
    'url': null,
    'perms': 'sys:manger:save,sys:manger:select',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 92,
    'parentId': 60,
    'parentName': '项目管理',
    'name': '修改',
    'url': null,
    'perms': 'sys:manger:update,sys:manger:select',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 93,
    'parentId': 60,
    'parentName': '项目管理',
    'name': '删除',
    'url': null,
    'perms': 'sys:manger:delete',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  }
]
var navDataList = [
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
    'type': 0,
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
        'url': 'sys/energy',
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
        'url': 'sys/device',
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
        'url': 'sys/worker',
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
        'url': 'sys/netlist',
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
        'url': 'sys/netwizard',
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
  }
]
// 获取导航菜单列表 / 权限
export function nav () {
  return {
    // isOpen: false,
    url: '/sys/menu/nav',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'menuList': navDataList,
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
  }
}
// 获取菜单列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/menu/list',
    type: 'get',
    data: dataList
  }
}
// 获取上级菜单
export function select () {
  let dataList = JSON.parse(JSON.stringify(navDataList))
  dataList = dataList.concat(dataList[0].list)
  return {
    // isOpen: false,
    url: '/sys/menu/select',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'menuList': dataList
    }
  }
}
// 获取菜单信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/menu/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'menu': dataList[0]
    }
  }
}
// 添加菜单
export function add () {
  return {
    // isOpen: false,
    url: '/sys/menu/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
// 修改菜单
export function update () {
  return {
    // isOpen: false,
    url: '/sys/menu/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
// 删除菜单
export function del () {
  return {
    // isOpen: false,
    url: '/sys/menu/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
