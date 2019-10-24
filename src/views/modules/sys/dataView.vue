<template>
  <div class="bigBox">
    <!-- 左边栏 -->
    <div class="bigBox-left">
      <div class="dataView_title">数据查看</div>
      <!-- <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="expandedKeys"
        accordion
        ref="tree"
        @node-click = 'handleNodeClick'
      ></el-tree>-->
      <!-- 左侧列表 -->
      <div
        class="tree-data"
        v-for="(item,index) in treeData"
        :key="index"         
        :data-programId="item.id"
        @click="getProgramData($event)"
      >{{item. name}}</div>
    </div>
    <!-- 右边栏 -->
    <div class="bigBox-right">
      <!-- 右边部分表格 -->
      <div class="dataTable">
        <div class="dataTable_title">数据点位</div>
        <span>
          <el-input placeholder="设置/区域/事项" v-model="keywords"></el-input>
          <!-- <input type="text" placeholder="sad"> -->
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </span>

        <el-table
          :data="tableData"
          style="width: 100%;font-size: 10px"
          @row-click="openDetails"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'6px'}"
        >
          <el-table-column prop="templateDataName" label="点位名称"></el-table-column>
          <el-table-column prop="deviceName" label="所属设备"></el-table-column>
          <el-table-column prop="uint" label="数据单位">
            <!-- <template scope="scope">
              <div @click="details(scope.row)">{{scope.row.sensorName}}</div>
            </template> -->
          </el-table-column>
          <el-table-column prop="value" label="当前值"></el-table-column>
          <el-table-column prop="" label="备注"></el-table-column>
          <el-table-column prop="timestamp" label="数据更新时间">
            <template scope="scope">
              <div>{{formatDate(scope.row.timestamp)}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 翻页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total=total
        :current-page="currentPage"
        @current-change="currentChange"
      ></el-pagination>
      <!-- 折线图 -->
      <div class="earchsImg">
        <div class="dataTable_title">数据趋势图</div>
        <div class="block">
          <span class="demonstration">时间：</span>
          <el-date-picker v-model="value1" type="datetimerange" range-separator="至"></el-date-picker>
          <span>
            <el-dropdown size="small" split-button type="primary" @command="handleCommand">
             {{timeText}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">近7天</el-dropdown-item>
                <el-dropdown-item command="b">近30天</el-dropdown-item>
                <el-dropdown-item command="c">近90天</el-dropdown-item>
                <el-dropdown-item command="d">近半年</el-dropdown-item>
                <!-- <el-dropdown-item command="e">全部</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
        <div id="echarts" :style="{width: '100%', height: '300px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeText:"自定义",
      keywords: "",
      currentPage: 1, // 当前第几页
      pageSize: 10, // 当前页面有多少条数据
      total: 0, // 一页几条数据
      startTime: "",
      endTime: "",
      value1: [],
      startTime: "",
      endTime: "",
      deviceId: "",
      sensorId: "",
      templateDataId: "",
      expandedKeys: [],
      tableData: [],
      treeData: ["1", "2", "3"],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {},
  activated() {
    // 获取设备列表
    this.getTreeData();
  },
  mounted() {
    ///图表
    var dom = document.getElementById("echarts");
    var myChart = this.echarts.init(dom);
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {
            normal: {
              color: {
                type: "linear", //设置线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "green" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "white" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }
      ]
    }),
      // 调用获取时间方法
      this.getDates();
      // 获取设备列表
      this.getTreeData();
  },

  methods: {
    // 获取设备列表
    getTreeData() {
      this.$http({
        url: this.$http.adornUrl("/equipment/device/list"), // 请求接口地址
        method: "post", // 请求方法
        data: {
          // 接口入参
          programId: sessionStorage.getItem("projectId"),
          page: this.currentPage,
          pageSize: this.pageSize,
          feature: ""
        }
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.treeData = data.data.data;
        } else {
          console.log("err");
        }
      });
    },
    // 时间戳转日期
    formatDate: function(date) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    // 自定义时间
    forTime(n) {
      this.startTime = this.formatDate(
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * n)
      );
      this.endTime = this.formatDate(new Date().setTime(new Date().getTime()));
      this.value1 = this.startTime.split().concat(this.endTime.split()); // 近7天
    },
    // 自定义时间(包含今天)
    handleCommand(command) {
      switch (command) {
        case "a":
          this.forTime(6); // 近7天
          this.timeText="近七天";
          break;
        case "b":
          this.forTime(29); // 近30天
          this.timeText="近30天"
          break;
        case "c":
          this.forTime(89); // 近90天
          this.timeText="近90天"
          break;
        case "d":
          this.forTime(179); // 近半年
          this.timeText="近半年"
          break;
        // case 'e':
        //   this.forTime(n)           // n值代表近多长时间  方法已经封装好了，那里用直接用方法传值就好，代码优化已经做好了
        //   console.log('all');
        //   break;
        default:
          tthis.forTime(6); // 默认近7天
          break;
      }
    },
    // 获取时间 (默认进来为一周的时间)
    getDates() {
      this.forTime(6); // 近7天
    },
    // 查看行内数据
    // details(row) {
    //   console.log(row);
    // },
    openDetails(row){
      //console.log(row);
      this.sensorId=row.sensorId;
      this.templateDataId=row.templateDataId
      this.$http({
        url: this.$http.adornUrl("equipment/device/measure/history"), // 请求接口地址
        method: "post", // 请求方法
        data: {
          sensorId: this.sensorId,
          templateDataId:this.templateDataId,
          page:this.page,
	        pageSize:this.pageSize
        }
      }).then(({ data }) => {
        if (data && data.code === 200) {
          var arr=[];
          var res=[];
          //console.log(data.data.data);
          for(var i=0;i<data.data.data.length;i++) {
            arr.push(data.data.data[i])
            //console.log(arr);
            //console.log(arr[i].uint)//单位
            //console.log(arr[i].value)//当前值
            //console.log(arr[i].timestamp)//时间
            res.push(arr[i].value)
            console.log(res);
          }
        } else {
          console.log("err");
        }
      });
    },
    // 查询数据
    onSubmit() {
      console.log(this.keywords)
      this.deviceId = this.keywords
      this.queryTableData();
    },
    // 获取当前页数
    currentChange(val) {
      this.currentPage = val;
      this.queryTableData();
    },
    // 获取设备信息数据
    // handleNodeClick(node, data, value) {
    //   console.log(data.label)
    //   this.deviceId = data.label;
    //   this.queryTableData();
    // },
    // 获取查询的数据
    // querydata(){
    //   this.$http({
    //     url: this.$http.adornUrl('/equipment/device/measure/'),     // 请求接口地址
    //     method: 'post',                                             // 请求方法
    //     data: {                                                     // 接口入参
    //         keyworld:this.keywords
    //       }
    //   }).then(({data}) => {
    //       if (data && data.code === 200) {
    //         console.log(data.data)
    //        // this.tableData = data.data
    //       }else{
    //         console.log(err)
    //       }
    //   })
    // },
    // 查询设备信息接口
    queryTableData() {
      this.$http({
        url: this.$http.adornUrl("/equipment/device/measure/"), // 请求接口地址
        method: "post", // 请求方法
        data: {
          // 接口入参
          // sensorId:'efc65236-e86f-4eae-a1df-77ecef5b663f',
          // templateDataId:'738746d4-989d-432b-a70a-75a0b6afa941',
          deviceId: this.deviceId,
          page: this.currentPage,
          pageSize: this.pageSize,
          templateDataId: this.templateDataId
        }
      }).then(({ data }) => {
        if (data && data.code === 200) {
          //console.log(data.data.data);
          this.tableData = data.data.data;
          this.total=data.data.data.length;
        } else {
          console.log("err");
        }
      });
    },
    // 获取对应设备的值
    getProgramData(e) {
      this.deviceId=e.target.dataset.programid;
      this.queryTableData();
    }
  }
};
</script>

<style lang="scss">
.block {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 12px;
}
.earchsImg {
  margin-top: 40px;
}
.bigBox {
  width: 100%;
  // height: 100%;
  height: 80vh;
  display: flex;
}
.bigBox .bigBox-left {
  width: 16%;
  height: 100%;
  display: fixed;
  // overflow-y:scroll;
  overflow-x: hidden;
  font-size: 12px !important;
}
// .dataView_title{
//   font-size: 16px;
// }
input::-webkit-input-placeholder {
  font-size: 12px;
}
input::-moz-input-placeholder {
  font-size: 12px;
}
input::-ms-input-placeholder {
  font-size: 12px;
}

.bigBox .bigBox-right {
  height: 100%;
  flex-grow: 1;
  padding: 10px;
  //   background: #ebeff0
  border: 5px solid #ebeff0;
  overflow-y: scroll;
}
.dataTable {
  position: relative;
}
.bigBox .el-input {
  height: 30px;
  line-height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.bigBox .el-input--medium .el-input__inner {
  width: 16%;
}
.dataTable_title {
  border-left: 4px solid #3d79f3;
  padding-left: 2px;
}
.dataView_title {
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #ddd;
}
.el-tree-node__label {
  font-size: 12px !important;
}
.bigBox .el-input--medium .el-input__inner {
  line-height: 30px;
  height: 30px;
}
.bigBox .el-input--medium .el-input__icon {
  line-height: 30px;
}
.bigBox .el-tree-node__content {
  height: 36px;
}
.dataTable_title {
  background: #fff;
}
// .el-table .el-table--fit .el-table--enable-row-hover .el-table--enable-row-transition .el-table--medium{
//      margin-top: 10px;
// }
.el-table .cell {
  line-height: 40px;
}
.el-button--medium {
  padding: 8px 28px;
  position: absolute;
  left: 170px;
  top: 24px;
  font-size: 12px;
}
.tree-data {
  margin: 10px auto;
  font-size: 14px;
  text-align: center;
  border-bottom: 1.5px solid #f2f2f2;
  padding-bottom: 8px;
  cursor: pointer;
}

</style>