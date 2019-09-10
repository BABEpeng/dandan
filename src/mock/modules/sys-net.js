import Mock from 'mockjs'
import vip from '../../assets/img/device.png'
// 生成网关数据列表
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
    'onTime': '@datetime',
    'numType': '数值型',
    'numTypes': '2字节无符号整数',
    'write': '读/写',
    'numb': '1'
  }))
}

// 获取网关列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/net/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': [
          {
            'id': 'ecb49ab3-b239-4cde-ab26-3a2b821a3498',
            'gatewayProgramId': '07662bd5-25cd-47be-90f0-7c06d018238f',
            'gatewayNo': '网关编号001',
            'gatewayName': '网关图片地址',
            'gatewayIcon': null,
            'gatewayProtocol': 'modbus',
            'gatewayPos': '这是一个网关位置',
            'gatewayStatus': null,
            'gatewayIsOnline': null,
            'gatewayDescription': '这是网关描述',
            'gatewayOperator': '110f24f8-0e6a-4254-978e-c39edfe5776c',
            'gatewayAddTimestamp': 1567667716176,
            'gatewayRegisterModel': null,
            'gatewayRegisterCode': 'C9B07bac462bdf347e1cfb0465838e5163420000'
          },
          {
            'id': '796bbf15-d2d4-4da7-beb2-6af59ded1794',
            'gatewayProgramId': '07662bd5-25cd-47be-90f0-7c06d018238f',
            'gatewayNo': '网关编号001',
            'gatewayName': '网关图片地址',
            'gatewayIcon': null,
            'gatewayProtocol': 'modbus',
            'gatewayPos': '这是一个网关位置',
            'gatewayStatus': null,
            'gatewayIsOnline': null,
            'gatewayDescription': '这是网关描述',
            'gatewayOperator': '110f24f8-0e6a-4254-978e-c39edfe5776c',
            'gatewayAddTimestamp': 1567667857487,
            'gatewayRegisterModel': null,
            'gatewayRegisterCode': 'C9B00516e5f3ba08e6c85c06b869cee28d310000'
          }
        ]
      }
    }
  }
}

// 获取网关信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/net/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'config': dataList[0],
      'info': dataList
    }
  }
}

// 添加网关信息
export function add () {
  return {
    // isOpen: false,
    url: '/sys/net/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改网关信息
export function update () {
  return {
    // isOpen: false,
    url: '/sys/net/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除网关信息
export function del () {
  return {
    // isOpen: false,
    url: '/sys/net/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
