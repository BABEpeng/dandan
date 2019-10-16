<template>
  <div>
    <el-dialog
      title="修改点位"
      :close-on-click-modal="false"
      :visible.sync="visible"
      >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="点位名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="输入点位名称"></el-input>
        </el-form-item>
        <el-form-item label="数据类型" prop="dataType">
          <el-select 
          v-model="dataForm.dataType"
          placeholder="数据类型">
            <el-option
              v-for="item in dataTypeList"
              :key="item.key"
              :label="item.name"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数值类型" prop="valueType">
          <el-select v-model="dataForm.valueType" placeholder="数值类型">
            <el-option
              v-for="item in valueTypeList"
              :key="item.value"
              :label="item.description"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="读写" prop="operation">
          <el-select v-model="dataForm.operation" placeholder="数值类型">
            <el-option
              v-for="item in operationList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="寄存器" prop="registerAddress">
          <el-input v-model="dataForm.registerAddress" placeholder="输入寄存器地址"></el-input>
        </el-form-item>
        <el-form-item label="小数位数" prop="digitNumber">
          <el-input v-model="dataForm.digitNumber" placeholder="请输入小数位数"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="dataForm.unit" placeholder="单位"></el-input>
        </el-form-item>
        <el-form-item label="公式" prop="expression">
          <el-input v-model="dataForm.expression" placeholder="单位"></el-input>
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
    props: ['gatewayData'],
    data () {
      return {
        isHttp: false,
        visible: false,
        dataForm: {
          id: '',
          name: '',
          registerAddress: '',
          digitNumber: '',
          dataType: '',
          valueType: '',
          operation: '',
          unit: '',
          expression: ''
        },
        dataRule: {
          name: [
            {required: true, message: '点位名称不能为空', trigger: 'blur'}
          ],
          registerAddress: [
            {required: true, message: '寄存器地址不能为空', trigger: 'blur'}
          ],
          digitNumber: [
            {required: true, message: '小数位数不能为空', trigger: 'blur'}
          ],
          dataType: [
            {required: true, message: '数据类型不能为空', trigger: 'blur'}
          ],
          valueType: [
            {required: true, message: '数值类型不能为空', trigger: 'blur'}
          ],
          operation: [
            {required: true, message: '读写模式不能为空', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '单位不能为空', trigger: 'blur'}
          ]
        },
        dataListLoading: false,
        addOrUpdateVisible: false,
        dataTypeList: [],
        valueTypeList: [],
        operationList: [],
        projectId: '',
        templateId: ''
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id
        this.projectId = sessionStorage.getItem('projectId')
        this.isHttp = false
        this.visible = true
        this.$nextTick(() => {
          this.getOperationList()
          this.getDataTypeList()
          this.getDotInfo()
        })
      },
      getDotInfo () {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/equipment/templatedata/detail/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.dataForm.id = data.data.id
              this.dataForm.name = data.data.name
              this.dataForm.dataType = data.data.dataType
              this.dataForm.registerAddress = data.data.registerAddress
              this.dataForm.digitNumber = data.data.digitNumber
              this.dataForm.valueType = data.data.valueType
              this.dataForm.operation = data.data.operation
              this.dataForm.unit = data.data.unit
              this.dataForm.expression = data.data.expression
              this.projectId = data.data.programId
              this.templateId = data.data.templateId
            }
          })
        }
      },
      getDataTypeList () {
        this.$http({
          url: this.$http.adornUrl('/equipment/datavalue/list'),
          method: 'get',
          data: this.$http.adornData()
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataTypeList = data.data
          }
        })
      },
      getOperationList () {
        this.$http({
          url: this.$http.adornUrl('/equipment/function/list'),
          method: 'get',
          data: this.$http.adornData()
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.operationList = data.data
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.isHttp = true
            this.$http({
              url: this.$http.adornUrl(`/equipment/templatedata/update`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'name': this.dataForm.name,
                'programId': this.projectId,
                'templateId': this.templateId,
                'registerAddress': this.dataForm.registerAddress,
                'digitNumber': this.dataForm.digitNumber,
                'dataType': this.dataForm.dataType,
                'valueType': this.dataForm.valueType,
                'operation': this.dataForm.operation,
                'unit': this.dataForm.unit,
                'expression': this.dataForm.expression
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.projectId = data.data.projectId
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
    },
    watch: {
      'dataForm.dataType' (value) {
        this.valueTypeList = []
        for (let i in this.dataTypeList) {
          if (this.dataTypeList[i].key === value) {
            this.valueTypeList = this.dataTypeList[i].option
          }
        }
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
