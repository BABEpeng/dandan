<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增设备' : '修改设备'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      center>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="设备名称" prop="paramKey">
          <el-input v-model="dataForm.paramKey" placeholder="冷凝塔"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="paramValue">
          <el-input v-model="dataForm.paramValue" placeholder="0001"></el-input>
        </el-form-item>
        <el-form-item label="设备位置" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="动力站"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="AX-1999"></el-input>
        </el-form-item>
        <el-form-item label="设备状态" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="AX-1999"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ortensiaHandle()">继续添加传感器</el-button>
      <el-button type="primary" @click="dataFormSubmit()">完成设备添加</el-button>
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
          paramKey: '',
          paramValue: '',
          remark: ''
        },
        dataRule: {
          paramKey: [
            {required: true, message: '设备名不能为空', trigger: 'blur'}
          ],
          paramValue: [
            {required: true, message: '设备编号值不能为空', trigger: 'blur'}
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
      // this.getDataList()
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/device/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.paramKey = data.config.paramKey
                this.dataForm.paramValue = data.config.paramValue
                this.dataForm.remark = data.config.remark
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
              url: this.$http.adornUrl(`/sys/device/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'paramKey': this.dataForm.paramKey,
                'paramValue': this.dataForm.paramValue,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取传感器列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/ortensia/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 传感器设置
      ortensiaHandle (id) {
        this.addOrUpdateVisible = true
        this.visible = false
        this.$nextTick(() => {
          this.$refs.addOrtensia.init(id)
        })
      }
    }
  }
</script>
