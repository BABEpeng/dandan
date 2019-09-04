<template>
  <el-dialog
    :title= "dataForm.name"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center>
    <div>
      <p>{{'传感器编号: ' + dataList.number }}</p>
      <P>{{'传感器名称: ' + dataList.name }}</P>
      <p>{{'数据类型: ' + dataList.numType }}</p>
      <p>{{'寄存器: ' + dataList.number }}</p>
      <p>{{'数值类型: ' + dataList.numTypes }}</p>
      <p>{{'小数位: ' + dataList.numb }}</p>
      <p>{{'读写: ' + dataList.write }}</p>
      <p>{{'寄存器长度: ' + dataList.numb }}</p>
      <p>{{'单位: ' + dataList.name }}</p>
      <p>{{'公式: ' + dataList.number }}</p>
      <p>{{'数据存储: ' + dataList.number }}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">关闭</el-button>
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
          name: '传感器详情'
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
    activated  () {
      // this.getDataList()
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
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$http({
            // 模拟对应编号传感器信息
            url: this.$http.adornUrl(`/sys/ortensia/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams({
              'page': this.pageIndex,
              'limit': this.pageSize,
              'paramKey': this.dataForm.paramKey,
              'id': this.$route.params
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataList = data.config
                // this.totalPage = data.totalCount
            } else {
              this.dataList = []
                // this.totalPage = 0
            }
          })
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
