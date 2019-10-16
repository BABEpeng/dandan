<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '网关添加' : '修改网关'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      >
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="网关名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="网关编号" prop="no">
          <el-input v-model="dataForm.no" placeholder="输入编号"></el-input>
        </el-form-item>
<!--        <el-form-item label="注册码" prop="protocol">-->
<!--          <el-input v-model="dataForm.protocol" placeholder="注册码"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="数据协议" prop="protocol" placeholder="输入协议类型">
          <el-radio-group v-model="dataForm.protocol">
             <el-radio 
                  v-for="item in dataForm.protocolList" 
                  :label="item.value" 
                  :key="item.value">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="轮询时间" prop="remark">-->
<!--          <el-input v-model="dataForm.remark" placeholder="60s"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="网关状态" size="mini" prop="status">-->
<!--          <el-radio-group v-model="dataForm.status">-->
<!--            <el-radio :label="0">禁用</el-radio>-->
<!--            <el-radio :label="1">正常</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <el-form-item label="网关位置" prop="remark">
          <el-input v-model="dataForm.position" placeholder="输入位置"></el-input>
        </el-form-item>
<!--        <el-form-item label="网关图片" prop="icon">-->
<!--          <el-input v-model="dataForm.icon" placeholder="路径/ddd/ddd"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="备注" prop="description">
          <el-input v-model="dataForm.description" placeholder="输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()" :disabled="isHttp">确定</el-button>
        <!--      <el-button  type="primary" @click="ortensiaHandle({programId:programId,gatewayId:gatewayId})">继续添加传感器</el-button>-->
            </span>
            </el-dialog>
            <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"  ref="addOrtensia" @refreshOrtensiaData="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './gateway-ortensia-add'
  export default {
    props: ['gatewayData'],
    data () {
      return {
        isHttp: false,
        visible: false,
        dataForm: {
          id: '',
          gatewayId: '',
          programId: '',
          name: '',
          no: '',
          protocolList: [],
          position: '',
          icon: '路径/ddd/ddd',
          protocol: 1,
          description: '',
          registerCode: '',
          status: 0
        },
        dataRule: {
          name: [
            {required: true, message: '网关名称不能为空', trigger: 'blur'}
          ],
          no: [
            {required: true, message: '网关编号不能为空', trigger: 'blur'}
          ],
          protocol: [
            {required: true, message: '网关协议不能为空', trigger: 'blur'}
          ]
          // position: [
          //   {required: true, message: '网关位置不能为空', trigger: 'blur'}
          // ],
          // description: [
          //   {required: true, message: '网关备注不能为空', trigger: 'blur'}
          // ]
        },
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.dataForm.programId = sessionStorage.getItem('projectId')
        this.isHttp = false
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/equipment/gateway/detail/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.id = data.data.id
                this.dataForm.programId = data.data.programId
                this.dataForm.no = data.data.no
                this.dataForm.name = data.data.name
                this.dataForm.icon = data.data.icon
                this.dataForm.protocol = data.data.protocol
                this.dataForm.protocolName = data.data.protocolName
                this.dataForm.position = data.data.position
                this.dataForm.description = data.data.description
                this.dataForm.registerCode = data.data.registerCode
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        console.log(`${!this.dataForm.id ? 'save' : 'update'}`)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.isHttp = true
            this.$http({
              url: this.$http.adornUrl(`/equipment/gateway/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'programId': this.dataForm.programId,
                'no': this.dataForm.no,
                'name': this.dataForm.name,
                'protocol': this.dataForm.protocol,
                'icon': this.dataForm.icon,
                'position': this.dataForm.position,
                'description': this.dataForm.description
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.programId = data.data.programId
                this.gatewayId = data.data.id
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
      },
      // 获取协议数据列表
      getProtocolList (data) {
        this.$http({
          url: this.$http.adornUrl('/equipment/protocol/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataForm.protocolList = data.data
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
