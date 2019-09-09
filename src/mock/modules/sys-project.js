import Mock from 'mockjs'

// 生成项目数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'name': '@name',
    'description': 'this is a test program',
    'positionName': '北京C区',
    'positionCoordinate': '12N, 23S',
    'owner': 'cb84bc5a-5d38-4711-8e28-8a4298da1050',
    'createTimestamp': 'datetime'
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
