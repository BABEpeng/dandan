<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增设备' : '修改设备'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      center>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="冷风机"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="no">
          <el-input v-model="dataForm.no" placeholder="0001"></el-input>
        </el-form-item>
        <el-form-item label="设备位置" prop="position">
          <el-input v-model="dataForm.position" placeholder="F10"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="model">
          <el-input v-model="dataForm.model" placeholder="AX-1999"></el-input>
        </el-form-item>
        <el-form-item label="设备图标" prop="icon">
          <el-input v-model="dataForm.icon" placeholder="X/X/X.jpg"></el-input>
        </el-form-item>
        <el-form-item label="出厂日期" prop="productionDate">
          <el-input v-model="dataForm.productionDate" placeholder="2010.1.1"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="dataForm.manufacturer" placeholder="XXX公司"></el-input>
        </el-form-item>
        <el-form-item label="设备描述" prop="description">
          <el-input v-model="dataForm.description" placeholder="..."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">完成设备添加</el-button>
      <el-button type="primary" :disabled= true @click="dataFormSubmit2()">继续绑定传感器</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrtensia" @refreshOrtensiaData="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './ortensia-add-or-update'
  import Vuex from 'vuex'
  let { mapState } = Vuex
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          no: '',
          name: '',
          description: '',
          position: '',
          icon: '',
          model: '',
          productionDate: '',
          manufacturer: '',
          paramKey: '',
          paramValue: '',
          remark: ''
        },
        dataRule: {
          name: [
            {required: true, message: '设备名不能为空', trigger: 'blur'}
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
          if (!this.dataForm.id) {
            // 新增,根据提交按钮触发动作
          } else {
            // 项目修改或者编辑，
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/device/add/device`),
              method: 'post',
              data: this.$http.adornData({
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
      dataFormSubmit2 (id) {
        this.addOrUpdateVisible = true
        this.visible = false
        this.$nextTick(() => {
          this.$refs.addOrtensia.init(id)
        })
      }
    }
  }
</script>
