<template>
  <div class="mod-devicebase">
     <div class="head">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item>设备管理</el-breadcrumb-item>
         <el-breadcrumb-item>设备列表</el-breadcrumb-item>
         <el-breadcrumb-item>基础信息</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
    <el-main>
      <div class="main">
        <div class="info">
          <el-card :body-style="{ display: 'flex' }">
            <el-row :gutter="40">
              <el-col :span="8">
                <div class="grid-content">
                <div class="block">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src= dataList.img
                  ></el-image>
                </div>
              </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content">
                  <div class = "info">
                    <p>{{'设备名称: ' + dataList.name }}</p>
                    <p>{{'设备型号: ' + dataList.id }}</p>
                    <p>{{'设备运行状态: ' + dataList.state }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="first">
              <div v-if="isFirst">
                <span>{{'设备名称: ' + dataList.name }}</span>
                <el-divider></el-divider>
                <span>{{'设备型号: ' + dataList.number }}</span>
                <el-divider></el-divider>
                <span>{{'出场日期: ' + dataList.data }}</span>
                <el-divider></el-divider>
                <span>{{'生产厂家: ' + dataList.prod }}</span>
                <el-divider></el-divider>
                <span>{{'出场编号: ' + dataList.got }}</span>
                <el-divider></el-divider>
                <span>{{'安装位置: ' + dataList.pos }}</span>
                <el-divider></el-divider>
                <span>{{'负责人: ' + dataList.fuz }}</span>
                <el-divider></el-divider>
                <span>{{'联系方式: ' + dataList.tel }}</span>
                <el-divider></el-divider>
              </div>
            </el-tab-pane>
            <el-tab-pane label="传感器" name="second">
              <div v-if="isSecond">
                传感器
              </div>
            </el-tab-pane>
            <el-tab-pane label="触发器" name="third">
              <div v-if="isThird">
                触发器
              </div>
            </el-tab-pane>
            <el-tab-pane label="维修记录" name="four">
              <div v-if="isFour">
                维修记录
              </div>
            </el-tab-pane>
            <el-tab-pane label="保养记录" name="five">
              <div v-if="isFive">
                保养记录
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-main>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.paramKey" placeholder="设备名称 / 设备编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item class="lay-dev">
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
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
        prop="pos"
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
        prop="state"
        header-align="center"
        align="center"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="onTime"
        header-align="center"
        align="center"
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
            <el-button type="primary" size="small"  @click="$router.push({ name: 'home' })">编辑</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './device-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          paramKey: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        activeName: 'first',
        isFirst: true,
        isSecond: false,
        isThird: false,
        isFour: false,
        isFive: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取设备基础信息 模拟统一接口拿数据，后期分接口拿
      getDataList () {
        this.dataListLoading = true
        this.$nextTick(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/device/info'),
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
            this.dataListLoading = false
          })
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
          this.$refs.addOrUpdate.init(id)
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
      handleClick (tab, event) {
        if (tab.name === 'first') {
          this.isFirst = true
          this.isSecond = false
          this.isThird = false
          this.isFour = false
          this.isFive = false
          // 接口数据模拟
          // setTimeout(() => {
          //   this.getDataList()
          // }, 1)
        } else if (tab.name === 'second') {
          this.isFirst = false
          this.isSecond = true
          this.isThird = false
          this.isFour = false
          this.isFive = false
          // 接口数据模拟
          setTimeout(() => {
            this.getDataList()
          }, 1)
        } else if (tab.name === 'third') {
          this.isFirst = false
          this.isSecond = false
          this.isThird = true
          this.isFour = false
          this.isFive = false
          // 接口数据模拟
          setTimeout(() => {
            this.getDataList()
          }, 1)
        } else if (tab.name === 'four') {
          this.isFirst = false
          this.isSecond = false
          this.isThird = false
          this.isFour = true
          this.isFive = false
          // 接口数据模拟
          setTimeout(() => {
            this.getDataList()
          }, 1)
        } else if (tab.name === 'five') {
          this.isFirst = false
          this.isSecond = false
          this.isThird = false
          this.isFour = false
          this.isFive = true
          // 接口数据模拟
          setTimeout(() => {
            this.getDataList()
          }, 1)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .head{
    padding-left: 19px;
  }
  .header {
    height:14px;
  }
  .lay-dev {
    position: absolute;
    right: 30px;
  }
  .fl{
    display: flex;
  }
  .text {
    font-size: 14px;
  }

  .item {
    /*padding: 1px 0;*/
  }


  .box-card {
    display: flex;
  }
  .el-divider--horizontal {
    margin: 13px 0;
  }
</style>
