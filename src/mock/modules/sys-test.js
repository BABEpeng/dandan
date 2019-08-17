import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'userId': '../..increment',
    'username': '../..name',
    'email': '../..email',
    'mobile': /^1[0-9]{10}$/,
    'status': 1,
    'roleIdList': null,
    'createUserId': 1,
    'createTime': 'datetime'
  }))
}

// 获取infos数据
export function test () {
  return {
    // isOpen: false,
    url: '/sys/test',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'content': {
        'profileId': '491527077:instagram',
        'nickname': 'manchesterunited',
        'platform': 'instagram',
        'avatar': '/static/images/roughness_map.jpg',
        'description': '足球俱乐部',
        'followers': 4,
        'postCount': 0,
        'isFollow': false,
        'isVip': true,
        'background': null
      }

    }
  }
}

// 获取recommend数据
export function recommend () {
  return {
    // isOpen: false,
    url: '/sys/recommend',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'content': [
        {
          'profileId': '290023231:instagram',
          'avatar': '/static/images/roughness_map.jpg',
          'originalAvatar': '/static/images/roughness_map.jpg',
          'nickName': 'realmadrid',
          'description': '足球俱乐部',
          'platform': 'instagram',
          'isFollow': false
        },
        {
          'profileId': '1412753185:instagram',
          'avatar': '/static/images/roughness_map.jpg',
          'originalAvatar': '/static/images/roughness_map.jpg',
          'nickName': 'raphaelvarane',
          'description': '世界最佳中后卫之一，法国国家足球队成员，皇家马德里足球俱乐部成员',
          'platform': 'instagram',
          'isFollow': false
        },
        {
          'profileId': 'neymarjr:facebook',
          'avatar': '/static/images/roughness_map.jpg',
          'originalAvatar': '/static/images/roughness_map.jpg',
          'nickName': 'Neymar Jr.',
          'description': '巴塞罗那足球俱乐部成员',
          'platform': 'facebook',
          'isFollow': false
        }
      ]
    }
  }
}
