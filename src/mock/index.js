import Mock from 'mockjs'
import * as common from './modules/common'
import * as jobSchedule from './modules/job-schedule'
import * as oss from './modules/oss'
import * as sysConfig from './modules/sys-config'
import * as sysLog from './modules/sys-log'
import * as sysMenu from './modules/sys-menu'
import * as sysRole from './modules/sys-role'
import * as sysUser from './modules/sys-user'
import * as sysManger from './modules/sys-manger'
import * as sysDevice from './modules/sys-device'
import * as sysOrsensor from './modules/sys-orsensor'
import * as sysNet from './modules/sys-net'
// 模拟feeds数据
import * as sysFeeds from './modules/sys-feeds'
import * as sysTest from './modules/sys-test'
// tips
// 1. 开启/关闭[业务模块]拦截, 通过调用fnCreate法[isOpen参数]设置.
// 2. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
fnCreate(common, true)
fnCreate(jobSchedule, true)
fnCreate(oss, true)
fnCreate(sysConfig, true)
fnCreate(sysLog, true)
fnCreate(sysMenu, true)
fnCreate(sysRole, true)
fnCreate(sysUser, true)
// 项目管理
fnCreate(sysManger, true)
// 设备管理
fnCreate(sysDevice, true)
// 传感器
fnCreate(sysOrsensor, true)
// 网关
fnCreate(sysNet, true)

// 模拟feeds数据
fnCreate(sysFeeds, true)
fnCreate(sysTest, true)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  if (isOpen) {
    for (var key in mod) {
      // eslint-disable-next-line func-call-spacing
      // eslint-disable-next-line no-unexpected-multiline
      ((res) => {
        if (res.isOpen !== false) {
          Mock.mock(new RegExp(res.url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}
