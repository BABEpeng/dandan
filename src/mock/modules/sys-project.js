import Mock from 'mockjs'

// 生成项目数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'userId': '@increment',
    'username': '@name',
    'email': '@email',
    'mobile': /^1[0-9]{10}$/,
    'status': 1,
    'roleIdList': null,
    'createUserId': 1,
    'createTime': 'datetime'
  }))
}

// 获取项目列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/project/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取项目信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/project/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'user': dataList[0]
    }
  }
}


// 添加项目
export function add () {
  return {
    // isOpen: false,
    url: '/sys/project/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改项目
export function update () {
  return {
    // isOpen: false,
    url: '/sys/project/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除项目
export function del () {
  return {
    // isOpen: false,
    url: '/sys/project/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
