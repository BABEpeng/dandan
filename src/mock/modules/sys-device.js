import Mock from 'mockjs'
import vip from '../../assets/img/device.png'
// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'name': '@name',
    'number': '@increment',
    'data': '2019',
    'prod': '北京***',
    'got': '@last',
    'pos': 'F5',
    'fuz': '孙先生',
    'tel': '010-000000',
    'img': vip,
    'id': '@increment',
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

// 获取设备信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/device/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'config': dataList[0]
    }
  }
}

// 添加设备信息
export function add () {
  return {
    // isOpen: false,
    url: '/sys/device/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改设备信息
export function update () {
  return {
    // isOpen: false,
    url: '/sys/device/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除设备信息
export function del () {
  return {
    // isOpen: false,
    url: '/sys/devices/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}