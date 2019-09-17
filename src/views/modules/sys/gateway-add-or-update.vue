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
             <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>
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
        <el-form-item label="网关图片" prop="icon">
          <el-input v-model="dataForm.icon" placeholder="路径/ddd/ddd"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="dataForm.description" placeholder="输入备注"></el-input>
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
  import AddOrUpdate from './ortensiaa-add-or-update'
  import Vuex from 'vuex'
  let { mapState } = Vuex
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          no: '',
          name: '',
          icon: '路径/ddd/ddd',
          protocol: '',
          position: '',
          description: '',
          remark: '',
          status: 0,
          typeList: ['modbus协议', '协议一', '协议二']
        },
        dataRule: {
          name: [
            {required: true, message: '网关名称不能为空', trigger: 'blur'}
          ]
          // no: [
          //   {required: true, message: '网关编号不能为空', trigger: 'blur'}
          // ],
          // protocol: [
          //   {required: true, message: '网关协议不能为空', trigger: 'blur'}
          // ],
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
    activated () {
      // this.getDataList()
    },
    computed: {
      ...mapState({
        programId: state => state.projectData.item.id
      })
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          // 修改逻辑
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
              url: this.$http.adornUrl(`/device/add/gateway`),
              method: 'post',
              data: this.$http.adornData({
                'programId': this.programId,
                'no': this.dataForm.no,
                'name': this.dataForm.name,
                'protocol': this.dataForm.protocol,
                'icon': this.dataForm.icon,
                'position': this.dataForm.position,
                'description': this.dataForm.description
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshData')
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
      // 传感器添加
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
