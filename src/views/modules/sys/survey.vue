<template>
  <div class="demo-image">
    <div class="block" v-for="(item,i) in pro_url">
<!--      <el-image-->
<!--        style="width: 100%; height: 100%"-->
<!--        :src="pro_url[this.$route.query.id]"-->
<!--        ></el-image>-->
      <el-image style="width: 100%; height: 100%"
        :src="item"
      ></el-image>
    </div>
  </div>
</template>

<script>
  import pro1 from '../../../assets/img/首页.jpg'
  export default {
    // inject: ['refresh'],
    data () {
      return {
        // eslint-disable-next-line standard/array-bracket-even-spacing
        pro_url: [pro1]
      }
    },
    activated () {
      console.log(this.$route.query.id)
    }
  }
</script>
<style>
.demo-image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

}
</style>
