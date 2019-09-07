<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '网关添加' : '修改网关'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="网关名称" prop="paramKey">
          <el-input v-model="dataForm.paramKey" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="网关编号" prop="paramKey2">
          <el-input v-model="dataForm.paramKey2" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="注册码" prop="paramKey3">
          <el-input v-model="dataForm.paramKey3" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="数据协议" prop="paramKey4" placeholder="modbus协议">
          <el-radio-group v-model="dataForm.paramKey4">
            <!-- <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>-->
            <el-radio  label="0">modbus协议</el-radio>
            <el-radio  label="1">协议一</el-radio>
            <el-radio  label="2">协议二</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="轮询时间" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="60s"></el-input>
        </el-form-item>
        <el-form-item label="网关状态" size="mini" prop="status">
          <el-radio-group v-model="dataForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="网关位置" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="6F-1102"></el-input>
        </el-form-item>
        <el-form-item label="网关图片" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="路径/ddd/ddd"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">完成网关添加</el-button>
      <el-button type="primary" @click="ortensiaHandle()">继续添加传感器</el-button>
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
          paramKey2: '',
          paramKey3: '',
          paramKey4: '0',
          paramValue: '',
          remark: '',
          status: 0
        },
        dataRule: {
          paramKey: [
            {required: true, message: '网关名称不能为空', trigger: 'blur'}
          ],
          paramKey2: [
            {required: true, message: '网关编号不能为空', trigger: 'blur'}
          ],
          paramKey3: [
            {required: true, message: '注册码不能为空', trigger: 'blur'}
          ],
          paramKey4: [
            {required: true, message: '数据协议不能为空', trigger: 'blur'}
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
              url: this.$http.adornUrl(`/sys/net/${!this.dataForm.id ? 'save' : 'update'}`),
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
