<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新建点位模版' : '修改点位模版'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="no">
          <el-input v-model="dataForm.no" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="dataForm.description" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">保存</el-button>
    </span>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrtensia" @refreshOrtensiaData="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './ortensia-add-or-update'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          no: '',
          name: '',
          programId: '',
          description: ''
        },
        dataRule: {
          no: [
            {required: true, message: '编号不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        },
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
    },
    mounted () {
      this.programId = sessionStorage.getItem('projectId')
    },
    methods: {
      init (id) {
        console.log(id)
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/equipment/template/detail/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.id = data.data.id
                this.dataForm.no = data.data.no
                this.dataForm.name = data.data.name
                this.dataForm.description = data.data.description
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/equipment/template/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'programId': this.programId,
                'no': this.dataForm.no,
                'name': this.dataForm.name,
                'description': this.dataForm.description
              })
            }).then(({data}) => {
              console.log(data)
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshSensorData')
                  }
                })
              } else {
                this.isHttp = false
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  .el-icon-close:before {
    content: "关闭";
  }

  .el-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
