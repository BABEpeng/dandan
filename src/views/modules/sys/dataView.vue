<template>
  <div class="bigBox">
    <!-- 左边栏 -->
    <div class="bigBox-left">
      <div class="dataView_title">数据查看</div>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
      ></el-tree>
    </div>
    <!-- 右边栏 -->
    <div class="bigBox-right">
        <!-- 右边部分表格 -->
        <div class="dataTable">
            <div class="dataTable_title">数据点位</div>
            <el-table :data="tableData" style="width: 100%;">
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
                <span>自定义</span>
            </div>
            <div id="echarts" :style="{width: '100%', height: '300px'}"></div>

        </div>
    </div>
    
  </div>
  
    

</template>

<script>
export default {
  mounted() {
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

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },

  data() {
    return {
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
  }
};
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
  height: 100%;
  display: flex;
}
.bigBox .bigBox-left {
  width: 18%;
  height: 100%;
  display:fixed;
  overflow-y:scroll;
  overflow-x:hidden;
}

.bigBox .bigBox-right {
  height: 100%;
  flex-grow: 1;
  padding: 10px;
//   background: #ebeff0
    border: 5px solid #ebeff0;
}
.bigBox .el-input {
  height: 30px;
  line-height: 30px;
  margin-top: 8px;
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
//      font-size: 12px;
// }
</style>