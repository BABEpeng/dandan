<template>
      <div class="footer">
        <p>
          <router-link to="/page">关于公司</router-link><span>|</span>
          <router-link to="/page">提供服务</router-link><span>|</span>
          <router-link to="/page">专利申请</router-link><span>|</span>
          <router-link to="/page">合作单位</router-link><span>|</span>
          <router-link to="/page">客服中心</router-link><span>|</span>
          <router-link to="/page">技术团队</router-link><span>|</span>
          <router-link to="/page">下载官方APP</router-link>
        </p>
      </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .footer{
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    position: relative;
    padding: 3px 0;
    border-top: 1px solid #e9e9e9;
  }

  .footer p{
    color: #979797;
    line-height: 22px;
    margin-bottom: 2px;
    text-align: center;
  }
  .footer p a{
    color: #2077d1;
  }
  .footer p span{
    padding: 0 8px;
  }
</style>
