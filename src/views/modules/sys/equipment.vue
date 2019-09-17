<template>
  <div class="mod-device">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.paramKey" placeholder="设备名称 / 设备编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item class="lay-dev">
        <el-button type="primary" @click="addOrUpdateHandle()">新增设备</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'12px',fontWeight:900}"
      :row-style="{fontSize:'12px',color:'#666',fontFamily:'MicrosoftYaHeiUI'}"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="img"
        header-align="center"
        align="center"
        width="80"
        label="设备图片">
        <template   slot-scope="scope">
          <img :src="scope.row.img"  min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="设备编号">
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="设备位置">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="设备型号">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="设备状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === !null" size="small">启用</el-tag>
          <el-tag v-else size="small" type="danger">暂停</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastTimestamp"
        header-align="center"
        align="center"
        :formatter="formatDate"
        label="最后上线时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="230"
        label="操作">
        <template slot-scope="scope">
          <div class="fl">
            <el-button type="primary" size="small"  @click="$router.push({ name: 'deviceb',params: {id: scope.row.id}})">编辑</el-button>
            <el-button type="primary" size="small" @click="sensorHandle(scope.row.id)">传感器</el-button>
            <el-button type="primary" size="small" @click="triggerHandle(scope.row.id)">触发器</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 绑定传感器 -->
    <add-equipment v-if="addOrUpdateVisible" ref="AddEquipment" @refreshData2="getDataList"></add-equipment>

  </div>
</template>

<script>
  import AddEquipment from './equipment-add-or-update'
  import moment from 'moment'
  import Vuex from 'vuex'
  let { mapState, mapMutations, mapActions } = Vuex
  export default {
    data () {
      return {
        dataForm: {
          paramKey: ''
        },
        pageIndex: 0,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false

      }
    },
    components: {
      AddEquipment
    },
    activated () {
      this.getDataList()
    },
    computed: {
      ...mapState({
        dataList: state => state.equipmentData.data,
        programId: state => state.projectData.item.id
      })
    },
    methods: {
      formatDate (value) {
        this.value1 = new Date(value.lastTimestamp)
        let dateValue = moment(this.value1).format('YYYY-MM-DD HH:mm:ss')
        return dateValue
      },
      // 获取设备数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/device/list/device'),
          method: 'post',
          data: this.$http.adornData({
            // 页码，每页条数
            'programId': this.programId,
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'feature': this.dataForm.paramKey
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.saveEquipmentFuc(data.data.data)
            this.totalPage = data.pageTotal
          } else {
            this.saveEquipmentFuc([])
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.AddEquipment.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/device/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
      ...mapMutations(['saveEquipmentway']),
      ...mapActions(['saveEquipmentFuc'])
    }
  }
</script>
<style lang="scss">
  .lay-dev {
    position: absolute;
    right: 30px;
  }
  .fl{
    display: flex;
  }
  .top_content {
    position: relative;
    background: #f1f4f5;
    padding: 18px 0px 0px;
    > .el-form--inline .el-form-item {
      display: inline-block;
      margin-right: 0px;
      vertical-align: top;
    }
  }

</style>
