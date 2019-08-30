import Mock from 'mockjs'
import vip from '../../assets/images/vip.png'
// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'img': vip,
    'name': '@name',
    'id': '@increment',
    'type': '温度传感器',
    'paramKey': '@first',
    'paramValue': '@last',
    'remark': '@csentence',
    'state': '启用/停用',
    'onTime': '@datetime'
  }))
}

// 获取传感器列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/ortensia/list',
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

// 获取传感器信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/ortensia/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'config': dataList[0]
    }
  }
}

// 添加传感器
export function add () {
  return {
    // isOpen: false,
    url: '/sys/ortensia/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改传感器
export function update () {
  return {
    // isOpen: false,
    url: '/sys/ortensia/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除传感器
export function del () {
  return {
    // isOpen: false,
    url: '/sys/ortensia/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
