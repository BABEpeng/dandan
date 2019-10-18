<template>
  <div class="bigBox">
    <!-- 左边栏 -->
    <div class="bigBox-left">
      <div class="dataView_title">数据查看</div>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :filter-node-method="filterNode"
        accordion
        ref="tree"
      ></el-tree>
    </div>
    <!-- 右边栏 -->
    <div class="bigBox-right">
        <!-- 右边部分表格 -->
        <div class="dataTable">
            <div class="dataTable_title">数据点位</div>
            <span>
              <el-input placeholder="设置/区域/事项" v-model="filterText"></el-input>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </span>

            <el-table :data="tableData" 
                      style="width: 100%;font-size: 10px"
                      :row-style="{height:'20px'}"
                      :cell-style="{padding:'6px'}">
            <el-table-column prop="name" label="点位名称"></el-table-column>
            <el-table-column prop="shebei" label="所属设备"></el-table-column>
            <el-table-column prop="data" label="数据事项"></el-table-column>
            <el-table-column prop="value" label="当前值"></el-table-column>
            <el-table-column prop="beizhu" label="备注"></el-table-column>
            <el-table-column prop="time" label="数据更新时间"></el-table-column>
            </el-table>
        </div>
        <!-- 翻页 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        <!-- 折线图 -->
        <div class="earchsImg">
            <div class="dataTable_title">数据趋势图</div>
            <div class="block">
                <span class="demonstration">时间：</span>
                <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="2019-10-11"
                end-placeholder="2019-12-22">
                </el-date-picker>
                <span>
                  <el-dropdown size="small" split-button type="primary">
                      自定义
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>近7天</el-dropdown-item>
                        <el-dropdown-item>近30天</el-dropdown-item>
                        <el-dropdown-item>近90天</el-dropdown-item>
                        <el-dropdown-item>近半年</el-dropdown-item>
                        <el-dropdown-item>全部</el-dropdown-item>
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
      value1:'',
      expandedKeys:[],
      tableData: [
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        },
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        },
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        },
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        },
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        },
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        },
        {
          name: "被绑定设备名",
          shebei:"主机",
          data: "温度",
          value: "22",
          beizhu:"被绑定设备备注",
          time:2019-10-22
        }
      ],
      filterText: "",
      data: [
        {
          id: 1,
          label: "动力站",
          children: [
            {
              id: 1 - 1,
              label: "主机"
            },
            {
              id: 1 - 2,
              label: "冷冻水泵"
            },
            {
              id: 1 - 3,
              label: "冷却水泵"
            },
            {
              id: 1 - 4,
              label: "板式换热器"
            },
            {
              id: 1 - 5,
              label: "循环泵"
            },
            {
              id: 1 - 6,
              label: "膨胀水箱"
            },
            {
              id: 1 - 7,
              label: "分/集水器"
            },
            {
              id: 1 - 8,
              label: "冷却塔"
            }
            
          ]
        },
        {
          id: 2,
          label: "1F层",
          children: [
            {
              id: 2 - 1,
              label: "0101房间",
              children: [
                {
                  id: 2 - 1 - 1,
                  label: "风箱盘管",
                  children: [
                    {
                      id: 2 - 1 - 1 - 1,
                      label: "风速监测"
                    }
                  ]
                },
                {
                  id: 2 - 1 - 2,
                  label: "控制面板",
                  children: [
                    {
                      id: 2 - 1 - 2 - 1,
                      label: "温度监测"
                    },
                    {
                      id: 2 - 1 - 2 - 2,
                      label: "CO2监测"
                    },
                    {
                      id: 2 - 1 - 2 - 3,
                      label: "湿度监测"
                    },
                    {
                      id: 2 - 1 - 2 - 4,
                      label: "PM2.5监测"
                    },
                    {
                      id: 2 - 1 - 2 - 5,
                      label: "起停控制"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          label: "2F层",
          children: [
                       {
              id: 3 - 1,
              label: "0201房间",
              children: [
                {
                  id: 3 - 1 - 1,
                  label: "风箱盘管",
                  children: [
                    {
                      id: 3 - 1 - 1 - 1,
                      label: "风速监测"
                    }
                  ]
                },
                {
                  id: 3 - 1 - 2,
                  label: "控制面板",
                  children: [
                    {
                      id: 3 - 1 - 2 - 1,
                      label: "温度监测"
                    },
                    {
                      id: 3 - 1 - 2 - 2,
                      label: "CO2监测"
                    },
                    {
                      id: 3 - 1 - 2 - 3,
                      label: "湿度监测"
                    },
                    {
                      id: 3 - 1 - 2 - 4,
                      label: "PM2.5监测"
                    },
                    {
                      id: 3 - 1 - 2 - 5,
                      label: "起停控制"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 4,
          label: "3F层",
          children: [
                       {
              id: 4 - 1,
              label: "0301房间",
              children: [
                {
                  id: 4 - 1 - 1,
                  label: "风箱盘管",
                  children: [
                    {
                      id: 4 - 1 - 1 - 1,
                      label: "风速监测"
                    }
                  ]
                },
                {
                  id: 4 - 1 - 2,
                  label: "控制面板",
                  children: [
                    {
                      id: 4 - 1 - 2 - 1,
                      label: "温度监测"
                    },
                    {
                      id: 4 - 1 - 2 - 2,
                      label: "CO2监测"
                    },
                    {
                      id: 4 - 1 - 2 - 3,
                      label: "湿度监测"
                    },
                    {
                      id: 4 - 1 - 2 - 4,
                      label: "PM2.5监测"
                    },
                    {
                      id: 4 - 1 - 2 - 5,
                      label: "起停控制"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          label: "4F层",
          children: [
                       {
              id: 4 - 1,
              label: "0401房间",
              children: [
                {
                  id: 4 - 1 - 1,
                  label: "风箱盘管",
                  children: [
                    {
                      id: 4 - 1 - 1 - 1,
                      label: "风速监测"
                    }
                  ]
                },
                {
                  id: 4 - 1 - 2,
                  label: "控制面板",
                  children: [
                    {
                      id: 4 - 1 - 2 - 1,
                      label: "温度监测"
                    },
                    {
                      id: 4 - 1 - 2 - 2,
                      label: "CO2监测"
                    },
                    {
                      id: 4 - 1 - 2 - 3,
                      label: "湿度监测"
                    },
                    {
                      id: 4 - 1 - 2 - 4,
                      label: "PM2.5监测"
                    },
                    {
                      id: 4 - 1 - 2 - 5,
                      label: "起停控制"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 6,
          label: "5F层",
          children: [
                       {
              id: 6 - 1,
              label: "0501房间",
              children: [
                {
                  id: 6 - 1 - 1,
                  label: "风箱盘管",
                  children: [
                    {
                      id: 6 - 1 - 1 - 1,
                      label: "风速监测"
                    }
                  ]
                },
                {
                  id: 6 - 1 - 2,
                  label: "控制面板",
                  children: [
                    {
                      id: 6 - 1 - 2 - 1,
                      label: "温度监测"
                    },
                    {
                      id: 6 - 1 - 2 - 2,
                      label: "CO2监测"
                    },
                    {
                      id: 6 - 1 - 2 - 3,
                      label: "湿度监测"
                    },
                    {
                      id: 6 - 1 - 2 - 4,
                      label: "PM2.5监测"
                    },
                    {
                      id: 6 - 1 - 2 - 5,
                      label: "起停控制"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    // 定义一个data变量
    let datas = this.data
    this.expandedTree (datas)


    ///图表
    var dom = document.getElementById('echarts')
    var myChart = this.echarts.init(dom)

    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round(value)
            ]
        }
    }
      var data = [];
      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
          data.push(randomData());
      }


      // 绘制图表
      myChart.setOption({
        title: {
        // text: '动态数据 + 时间坐标轴'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
      });
      setInterval(function () {

    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }

    myChart.setOption({
        series: [{
            data: data
        }]
    });
}, 1000);

  },//////////

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    // init(){
    //   this.getAllData()
    // },

    filterNode(value, data) {
      //console.log('asd1234')
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    expandedTree (datas) {
      //console.log(datas)
      this.expandedKeys.push(datas[0].id)
      //console.log(this.expandedKeys)
      // this.expandedKeys = [];
      // for (var i = 0; i < datas.length; i++) {
      //     this.expandedKeys.push(datas[i].id);//循环data的数据，把对应要展开的节点id放入展开的数组中
      //     console.log(this.expandedKeys)
      //     }
      },
      onSubmit() {
        //console.log('submit!');
       }
      //,
      // getAllData(){
      //   this.$http({
      //     url: this.$http.adornUrl('/equipment/device/measure/'),
      //     method: 'post',
      //     data: this.$http.getAllData()
      //   }).then(({data}) => {
      //     if (data && data.code === 200) {
      //       console.log(this.getAllData)
      //     }
      //   })
      // }
  },
}
</script>

<style lang="scss">
.block{
    margin-top: 20px;
    margin-left: 20px;
    font-size: 12px
}
.earchsImg{
    margin-top:40px;
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
  display:fixed;
  // overflow-y:scroll;
  overflow-x:hidden;
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
    overflow-y:scroll;

}
.dataTable{
  position: relative;
}
.bigBox .el-input {
  height: 30px;
  line-height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.bigBox .el-input--medium .el-input__inner{
  width: 16%;
}
.dataTable_title{
  border-left: 4px solid #3d79f3;
  padding-left: 2px;
}
.dataView_title{
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom:1.5px solid #ddd;
}
.el-tree-node__label{
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
.dataTable_title{
    background: #fff
}
// .el-table .el-table--fit .el-table--enable-row-hover .el-table--enable-row-transition .el-table--medium{
//      margin-top: 10px;
// }
.el-table .cell{
  line-height:40px;
}
.el-button--medium{
  padding: 8px 28px;
  position: absolute;
  left: 170px;
  top:24px;
  font-size: 12px;
}
</style>