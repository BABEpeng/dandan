<template>
  <el-dialog
    :title="!dataForm.id ? '新建项目' : '修改项目'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    :before-close="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item :label="dataForm.typeList[dataForm.type] + '名称'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="'请输入' + dataForm.typeList[dataForm.type] + '名称'"></el-input>
      </el-form-item>
      <el-form-item label="项目位置">
        <el-card class="box-card">
         <div>
           <baidu-map class="bm-view" center="北京" :zoom="zoom" @ready="handler"></baidu-map>
         </div>
        </el-card>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + '地址'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="'请输入' + dataForm.typeList[dataForm.type] + '地址'"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
<!--      <el-button @click="visible = false">取消</el-button>-->
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          type: 1,
          types: 0,
          typeList: ['目录', '项目', '按钮'],
          name: '',
          parentId: 0,
          parentName: '',
          url: '',
          perms: '',
          orderNum: 0,
          icon: '',
          iconList: [],
          // eslint-disable-next-line standard/array-bracket-even-spacing
          pos: [ 0, 0]
        },
        dataRule: {
          name: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ]
        },
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        type: 'tab',
        center: {lng: 0, lat: 0},
        zoom: 3
      }
    },
    created () {
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/menu/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.menuList = treeDataTranslate(data.menuList, 'menuId')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (!this.dataForm.id) {
            // 新增
            // this.menuListTreeSetCurrentNode()
          } else {
            // 修改
            this.$http({
              url: this.$http.adornUrl(`/sys/menu/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.id = data.menu.menuId
              this.dataForm.type = data.menu.type
              this.dataForm.name = data.menu.name
              this.dataForm.parentId = data.menu.parentId
              this.dataForm.url = data.menu.url
              this.dataForm.perms = data.menu.perms
              this.dataForm.orderNum = data.menu.orderNum
              this.dataForm.icon = data.menu.icon
              // this.menuListTreeSetCurrentNode()
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        // this.$refs['dataForm'].validate((valid) => {
        //   if (valid) {
        //     this.$http({
        //       url: this.$http.adornUrl(`/sys/menu/${!this.dataForm.id ? 'save' : 'update'}`),
        //       method: 'post',
        //       data: this.$http.adornData({
        //         'menuId': this.dataForm.id || undefined,
        //         'type': this.dataForm.type,
        //         'name': this.dataForm.name,
        //         'parentId': this.dataForm.parentId,
        //         'url': this.dataForm.url,
        //         'perms': this.dataForm.perms,
        //         'orderNum': this.dataForm.orderNum,
        //         'icon': this.dataForm.icon
        //       })
        //     }).then(({data}) => {
        //       if (data && data.code === 0) {
        //         this.$message({
        //           message: '操作成功',
        //           type: 'success',
        //           duration: 1500,
        //           onClose: () => {
        //             this.visible = false
        //             this.$emit('refreshDataList')
        //           }
        //         })
        //       } else {
        //         this.$message.error(data.msg)
        //       }
        //     })
        //   }
        // })
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
        this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
      },
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 116.404
        this.center.lat = 39.915
        this.zoom = 15
      }
    }
  }
</script>

<style lang="scss">
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      width: 458px;
      overflow: hidden;
    }
    &__icon-inner {
      width: 478px;
      max-height: 258px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &__icon-list {
      width: 458px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
    .el-dialog__title {
      line-height: 24px;
      font-size: 24px;
      color: #303133;
      font-weight: 700;
    }
    .box-card {
      width: 480px;
      height:200px;
    }
  }
  .bm-view {
    width: 100%;
    height: 200px;
  }
</style>
