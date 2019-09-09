var dataList = [
  {
    'menuId': 3,
    'parentId': 0,
    'parentName': null,
    'name': '项目管理',
    'url': 'sys/manger',
    'perms': null,
    'type': 0,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': [
      {
        'menuId': 4,
        'parentId': 3,
        'parentName': null,
        'name': '项目一',
        'url': '',
        'perms': null,
        'type': 1,
        'icon': '',
        'orderNum': 1,
        'open': null,
        'list': null
      },
      {
        'menuId': 5,
        'parentId': 3,
        'parentName': null,
        'name': '项目二',
        'url': '',
        'perms': null,
        'type': 1,
        'icon': '',
        'orderNum': 2,
        'open': null,
        'list': null
      },
      {
        'menuId': 6,
        'parentId': 3,
        'parentName': null,
        'name': '项目三',
        'url': '',
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
    'menuId': 7,
    'parentId': 3,
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
    'menuId': 8,
    'parentId': 3,
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
    'menuId': 9,
    'parentId': 3,
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
    'menuId': 10,
    'parentId': 3,
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

// 获取项目列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/manger/list',
    type: 'get',
    data: dataList[0].list
  }
}

