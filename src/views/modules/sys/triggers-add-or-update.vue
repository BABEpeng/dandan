<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增触发器' : '触发器编辑'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      center>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="名称" prop="paramKey">
          <el-input v-model="dataForm.paramKey" placeholder="请输入传感器名称"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="dataForm.type">
            <!-- <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>-->
            <el-radio  label="1">数值型</el-radio>
            <el-radio  label="2">开关型</el-radio>
            <el-radio  label="3">定位型</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="寄存器" prop="paramValue">
          <el-input v-model="dataForm.paramValue" placeholder="功能码04H，起始地址000AH，则填30011"></el-input>
        </el-form-item>
        <el-form-item label="数值类型" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="2字节无符号整数"></el-input>
        </el-form-item>
        <el-form-item label="读写" prop="writeList">
          <el-radio-group v-model="dataForm.type">
            <el-radio  label="5">读写</el-radio>
            <el-radio  label="6">只读</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数据存储" prop="dataStorage">
          <el-radio-group v-model="dataForm.type">
            <el-radio  label="7">不存储</el-radio>
            <el-radio  label="8">存储</el-radio>
            <el-radio  label="9">变化时存储</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单位" prop="">
          <el-input v-model="dataForm.remark" placeholder="请输入单位"></el-input>
        </el-form-item>
        <el-form-item label="变量描述" prop="">
          <el-input v-model="dataForm.remark" placeholder="请输入变量描述"></el-input>
        </el-form-item>
        <el-form-item label="公式" prop="">
          <el-input v-model="dataForm.remark" placeholder="设备上行公式经计算后显示"></el-input>
        </el-form-item>
        <el-form-item label="反向运算" prop="">
          <el-input v-model="dataForm.remark" placeholder="主动向设备写数据经反向运算"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">取消</el-button>
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
          paramKey: '',
          paramValue: '',
          remark: '',
          type: 1,
          typeList: ['数值型', '开关型', '定位型'],
          writeList: ['读写', '只读'],
          dataStorage: ['不存储', '存储', '变化时存储']
        },
        dataRule: {
          paramKey: [
            {required: true, message: '传感器名不能为空', trigger: 'blur'}
          ],
          paramValue: [
            {required: true, message: '寄存器值不能为空', trigger: 'blur'}
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
              url: this.$http.adornUrl(`/sys/ortensia/info/${this.dataForm.id}`),
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
              url: this.$http.adornUrl(`/sys/ortensia/${!this.dataForm.id ? 'save' : 'update'}`),
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
      }
    }
  }
</script>
