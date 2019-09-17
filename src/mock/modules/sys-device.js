import Mock from 'mockjs'
// import vip from '../../assets/img/device.png'
// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'deviceProgramId': '@increment',
    'deviceNo': '@increment',
    'deviceName': '@name',
    'deviceIcon': '这是设备图片地址',
    'deviceModel': '@first',
    'deviceStatus': null,
    'devicePos': '这是设备位置',
    'deviceLastTimestamp': null,
    'deviceDescription': 'this is a test Device',
    'deviceOperator': '@csentence',
    'deviceAddTimestamp': 1567671134624,
    'deviceProductionDate': '这是设备生产日期',
    'deviceManufacturer': '这是设备生成厂家'
  }))
}

// 获取设备列表
export function list () {
  return {
    // isOpen: false,
    url: '/device/list/device',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 200,
      'data': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'data': dataList
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
      'config': dataList[0],
      'info': dataList
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
