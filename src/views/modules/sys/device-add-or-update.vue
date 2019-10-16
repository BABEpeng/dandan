<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增设备' : '修改设备'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      center>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="no">
          <el-input v-model="dataForm.no" placeholder="设备编号"></el-input>
        </el-form-item>
        <el-form-item label="设备位置" prop="position">
          <el-input v-model="dataForm.position" placeholder="设备位置"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="model">
          <el-input v-model="dataForm.model" placeholder="设备类型"></el-input>
        </el-form-item>
        <el-form-item label="设备图标" prop="icon">
          <el-input v-model="dataForm.icon" placeholder="设备图标"></el-input>
        </el-form-item>
        <el-form-item label="出厂日期" prop="productionDate">
          <el-input v-model="dataForm.productionDate" placeholder="出厂日期"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="dataForm.manufacturer" placeholder="生产厂家"></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="description">
          <el-input v-model="dataForm.description" placeholder="设备描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
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
          id: '',
          no: '',
          name: '',
          description: '',
          position: '',
          icon: '',
          model: '',
          productionDate: '',
          manufacturer: '',
          paramKey: '',
          paramValue: ''
        },
        dataRule: {
          name: [
            {required: true, message: '设备名不能为空', trigger: 'blur'}
          ]
        },
        programId: '',
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    methods: {
      init (id) {
        this.programId = sessionStorage.getItem('projectId')
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/equipment/device/detail/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.id = data.data.id
                this.dataForm.no = data.data.no
                this.dataForm.name = data.data.name
                this.dataForm.description = data.data.description
                this.dataForm.position = data.data.position
                this.dataForm.icon = data.data.icon
                this.dataForm.model = data.data.model
                this.dataForm.productionDate = data.data.productionDate
                this.dataForm.manufacturer = data.data.manufacturer
                this.dataForm.paramKey = data.data.paramKey
                this.dataForm.paramValue = data.data.paramValue
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
              url: this.$http.adornUrl(`/equipment/device/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'programId': this.programId,
                'no': this.dataForm.no,
                'name': this.dataForm.name,
                'description': this.dataForm.description,
                'position': this.dataForm.position,
                'icon': this.dataForm.icon,
                'model': this.dataForm.model,
                'productionDate': this.dataForm.productionDate,
                'manufacturer': this.dataForm.manufacturer
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
                    this.$emit('refreshData2')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
