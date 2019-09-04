<template>
  <el-dialog
    :title="!dataForm.id ? '新建触发器' : ''"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="建触发器" prop="paramKey">
        <el-input v-model="dataForm.paramKey" size="medium" placeholder="请输入触发器名称"></el-input>
      </el-form-item>
      <el-form-item label="选择设备" prop="paramKey">
<!--          <el-input v-model="dataForm.paramKey"  placeholder="默认当下设备"class="input-with-select"></el-input>-->
            <el-select v-model="select" :disabled="true" slot="prepend" placeholder="默认当下设备">
            </el-select>
            <el-select v-model="dataForm.select" slot="prepend" placeholder="传感器选择">
              <el-option label="传感器1" value="1"></el-option>
              <el-option label="传感器2" value="2"></el-option>
              <el-option label="传感器3" value="3"></el-option>
            </el-select>
            <el-select v-model="dataForm.selects" slot="prepend" placeholder="点位器选择">
              <el-option label="点位器1" value="1"></el-option>
              <el-option label="点位器2" value="2"></el-option>
              <el-option label="点位器3" value="3"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="触发器状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio label="启用"></el-radio>
          <el-radio label="禁用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="触发条件" prop="paramKey">
        <el-select v-model="dataForm.select" slot="prepend" placeholder="请输入触发器名称">
          <el-option label="开关OFF" value="1"></el-option>
          <el-option label="开关ON" value="2"></el-option>
          <el-option label="数值小于A" value="3"></el-option>
          <el-option label="数值大于B" value="4"></el-option>
          <el-option label="数值大于A且小于B" value="5"></el-option>
          <el-option label="数值小于A或大于B" value="6"></el-option>
          <el-option label="数值等于A" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警方式" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">完成设备添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          paramKey: '',
          paramValue: '',
          remark: '',
          select: '',
          selects: '',
          status: '启用',
          roleIdList: [
            {'roleId': '短信'},
            {'roleId': '微信'},
            {'roleId': '邮件'}
          ]
        },
        dataRule: {
          paramKey: [
            { required: true, message: '网管名称不能为空', trigger: 'blur' }
          ],
          paramValue: [
            { required: true, message: '', trigger: 'blur' }
          ]
        },
        dataListLoading: false,
        dataListSelections: [],
        dataList: []
      }
    },
    activated () {
      this.getDataList()
    },
    // 获取传感器列表
    getDataList () {
      console.log('2222222222')
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
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/trigger/info/${this.dataForm.id}`),
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/ortensia/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            // this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
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
                    this.$emit('refreshOrtensiaData')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      }
    }
  }
</script>
<style lang="scss">

  .el-select .el-input {
    width: 130px;
  }
</style>
