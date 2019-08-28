<template>
  <div class="mod-demo-manger">
      <el-row>
        <div class="addButton">
            <el-form :inline="true" :model="dataForm">
              <el-form-item class="add">
                  <el-button v-if="isAuth('sys:manger:save')" type="primary" @click="addOrUpdateHandle()">新增项目</el-button>
              </el-form-item>
            </el-form>
        </div>
        <el-col :span="6" v-for="(o, index) in dataList" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <h3>{{o.name}}</h3>
            <img src="~@/assets/img/bg_login.png" class="image">
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <span>地址：省市县省市县省市县省市</span>
<!--                <el-button type="text" class="button">进入</el-button>-->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-updats v-if="addOrUpdateVisible" ref="addOrUpdats" @refreshDataList="getDataList"></add-or-updats>
  </div>
</template>

<script>
  import AddOrUpdats from './manger-add-or-update'
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdats
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/manger/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.dataList = treeDataTranslate(data, 'menuId')
          this.dataListLoading = false
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdats.init(id)
        })
      }
    }
  }
</script>

<style lang="scss">
  .mod-demo-manger {
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
    h3 {
      padding-left: 10px;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .addButton {
    height: 33px;
  }
  .add {
    display: block;
    position: absolute;
    right: 0px;
  }
</style>
