<template>
  <div class="demo-image">
    <div class="block">
      <el-image style="width: 100%; height: 100%"
        :src="pro_url"
      ></el-image>
    </div>
  </div>
</template>

<script>
  import pro1 from '../../../assets/img/shebei.jpg'
  export default {
    // inject: ['refresh'],
    data () {
      return {
        // eslint-disable-next-line standard/array-bracket-even-spacing
        pro_url: pro1
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
