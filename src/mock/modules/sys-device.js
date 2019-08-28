import Mock from 'mockjs'
import vip from '../../assets/img/device.png'
// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'img': vip,
    'name': '@name',
    'id': '@increment',
    'pos': 'F5',
    'paramKey': '@first',
    'paramValue': '@last',
    'remark': '@csentence',
    'state': '启用/停用',
    'onTime': '@datetime'
  }))
}

// 获取设备列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/device/list',
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

// 获取参数信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/config/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'config': dataList[0]
    }
  }
}

// 添加参数
export function add () {
  return {
    // isOpen: false,
    url: '/sys/config/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改参数
export function update () {
  return {
    // isOpen: false,
    url: '/sys/config/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除参数
export function del () {
  return {
    // isOpen: false,
    url: '/sys/config/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
