<template>
  <div class="mod-demo-manger">
<!--    <el-row :gutter="1">-->
<!--      <el-col :span="8">-->
<!--        <div class="grid-content bg-purple">-->
<!--          <el-card>-->
<!--            <div id="J_chartLineBox" class="chart-box"></div>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <div class="grid-content bg-purple">-->
<!--          <div id="J_chartBarBox" class="chart-box"></div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="8">-->
<!--        <div class="grid-content bg-purple">-->
<!--          <div id="J_chartPieBox" class="chart-box"></div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
      <el-row>
        <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <h3>合生汇的项目</h3>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {

    },
    activated () {

    },
    methods: {

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
</style>
