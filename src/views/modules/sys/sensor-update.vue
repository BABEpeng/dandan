<template>
  <div>
    <el-dialog
      title="修改传感器"
      :close-on-click-modal="false"
      :visible.sync="visible"
      >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="输入点位名称"></el-input>
        </el-form-item>
        <el-form-item label="从机ID" prop="name">
          <el-input v-model="dataForm.slaveId" placeholder="输入从机ID"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="no">
          <el-input v-model="dataForm.no" placeholder="输入编号"></el-input>
        </el-form-item>
        <el-form-item label="点位模板" prop="template">
          <el-select 
          v-model="dataForm.templateId"
          placeholder="点位模板">
            <el-option
              v-for="item in templateList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置" prop="position">
          <el-input v-model="dataForm.position" placeholder="输入位置"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="dataForm.description" placeholder="输入备注"></el-input>
        </el-form-item>
        <el-form-item label="轮询时间" prop="wheelLoop">
          <el-input v-model="dataForm.wheelLoop" placeholder="输入轮询时间"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dataFormSubmit()" :disabled="isHttp">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isHttp: false,
        visible: false,
        dataForm: {
          id: '',
          name: '',
          no: '',
          slaveId: '',
          templateId: '',
          position: '',
          description: '',
          wheelLoop: ''
        },
        dataRule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          no: [
            {required: true, message: '编号不能为空', trigger: 'blur'}
          ],
          slaveId: [
            {required: true, message: '从机ID不能为空', trigger: 'blur'}
          ],
          templateId: [
            {required: true, message: '点位模板不能为空', trigger: 'blur'}
          ],
          wheelLoop: [
            {required: true, message: '轮询时间不能为空', trigger: 'blur'}
          ]
        },
        dataListLoading: false,
        templateList: [],
        projectId: ''
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id
        this.projectId = sessionStorage.getItem('projectId')
        this.isHttp = false
        this.visible = true
        this.$nextTick(() => {
          this.getTemplateList()
          this.getSensorInfo()
        })
      },
      getSensorInfo () {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/equipment/sensor/detail/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.dataForm.id = data.data.id
              this.dataForm.no = data.data.no
              this.dataForm.name = data.data.name
              this.dataForm.slaveId = data.data.slaveId
              this.dataForm.templateId = data.data.dotTemplateId
              this.dataForm.position = data.data.position
              this.dataForm.description = data.data.description
              this.dataForm.wheelLoop = data.data.wheelLoop
            }
          })
        }
      },
      getTemplateList () {
        this.$http({
          url: this.$http.adornUrl('/equipment/template/list'),
          method: 'post',
          data: this.$http.adornData({
            'programId': this.projectId,
            'page': 1,
            'pageSize': 100,
            'feature': ''
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.templateList = data.data.data
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.isHttp = true
            this.$http({
              url: this.$http.adornUrl(`/equipment/sensor/update`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'no': this.dataForm.no,
                'name': this.dataForm.name,
                'slaveId': this.dataForm.slaveId,
                'dotTemplateId': this.dataForm.templateId,
                'position': this.dataForm.position,
                'description': this.dataForm.description,
                'wheelLoop': this.dataForm.wheelLoop
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.isHttp = false
                    this.$emit('refreshData', data.data)
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
