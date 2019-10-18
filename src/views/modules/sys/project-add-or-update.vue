<template>
  <el-dialog
    :title="!dataForm.id ? '新建项目' : '修改项目'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    @close='closeDialog'
    center
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
      <el-form-item label= "项目名称">
        <el-input v-model="dataForm.name" placeholder= '请输入项目名称'></el-input>
      </el-form-item>
      <el-form-item label="项目位置">
        <el-card class="box-card">
         <div>
           <baidu-map class="bm-view" center="北京" :zoom="zoom" @ready="handler"></baidu-map>
         </div>
          <el-input v-model="dataForm.positionCoordinate" placeholder='请输入项目位置'></el-input>
        </el-card>
      </el-form-item>
      <el-form-item label= "项目地址">
        <el-input v-model="dataForm.positionName" placeholder="请输入项目地址"></el-input>
      </el-form-item>
      <el-form-item label= "项目描述">
        <el-input v-model="dataForm.description" placeholder="请输入项目描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
<!--      <el-button @click="visible = false">取消</el-button>-->
      <el-button type="primary" @click="dataFormSubmit()" :disabled="isHttp">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        isHttp: false,
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          positionCoordinate: '',
          positionName: '',
          description: ''
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

    methods: {
      init (id) {
        // this.dataForm.id = id || 0
        this.isHttp = false
        this.visible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        //   if (!this.dataForm.id) {
        //     // 新增,根据提交按钮触发动作
        //   } else {
        //     // 项目修改或者编辑，
        //   }
        // })
      },
      closeDialog(){
        this.dataForm={}
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.isHttp = true
            this.$http({
              url: this.$http.adornUrl(`/equipment/program/save`),
              method: 'post',
              data: this.$http.adornData({
                'name': this.dataForm.name,
                'description': this.dataForm.description,
                'positionName': this.dataForm.positionName,
                'positionCoordinate': this.dataForm.positionCoordinate
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                // this.addGatewayIdFuc(data.data.id)
                sessionStorage.setItem('projectId', data.data.programId)
                this.programId = data.data.programId
                this.gatewayId = data.data.id
                this.buttonVisible = data.data.id
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.isHttp = false
                    this.$emit('refreshDataList')
                  }
                })
                this.dataForm={}
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
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
