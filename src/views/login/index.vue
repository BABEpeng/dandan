<template>
  <div>
    <div class="login-container">

<!--      store测试-->
<!--      <div>-->
<!--        <h2>{{this.$store.state.count}}</h2>-->
<!--        <h2>{{this.$store.getters.getStateCount}}</h2>-->
<!--        <button @click="addFun"></button>-->
<!--        <button @click="reductionFun"></button>-->
<!--      </div>-->

      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" class="login-form" auto-complete="on" label-position="left"
               @keyup.enter.native="dataFormSubmit()" status-icon>
        <div class="title-container">
          <h3 class="title">管理员登录</h3>
        </div>
        <el-form-item prop="userName">
           <span class="svg-container">
             <icon-svg name="user"></icon-svg>
           </span>
          <el-input
            v-model="dataForm.userName"
            placeholder="帐号"
          />
        </el-form-item>
        <el-form-item prop="password">
           <span class="svg-container">
             <icon-svg name="password"></icon-svg>
           </span>
          <el-input
            v-model="dataForm.password"
            type="password"
            placeholder="密码"
            ref="password"
          />
        </el-form-item>

        <!--              <el-form-item prop="captcha">-->
        <!--                <el-row :gutter="20">-->
        <!--                  <el-col :span="14">-->
        <!--                    <el-input v-model="dataForm.captcha" placeholder="验证码">-->
        <!--                    </el-input>-->
        <!--                  </el-col>-->
        <!--                  <el-col :span="10" class="login-captcha">-->
        <!--                    <img :src="captchaPath" @click="getCaptcha()" alt="">-->
        <!--                  </el-col>-->
        <!--                </el-row>-->
        <!--              </el-form-item>-->
        <el-form-item>
          <el-button class="login-btn-submit"  :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"@click="dataFormSubmit()">登录</el-button>
        </el-form-item>
<!--        <div class="tips">-->
<!--          <span>忘记密码</span>-->
<!--          <span>注册会员</span>-->
<!--        </div>-->
      </el-form>

    </div>
<!--    <div class="particles">-->
<!--      <vue-particles-->
<!--        color="#dedede"-->
<!--        :particleOpacity="0.7"-->
<!--        :particlesNumber="80"-->
<!--        shapeType="circle"-->
<!--        :particleSize="4"-->
<!--        linesColor="#dedede"-->
<!--        :linesWidth="1"-->
<!--        :lineLinked="true"-->
<!--        :lineOpacity="0.4"-->
<!--        :linesDistance="150"-->
<!--        :moveSpeed="3"-->
<!--        :hoverEffect="true"-->
<!--        hoverMode="grab"-->
<!--        :clickEffect="true"-->
<!--        clickMode="push"-->
<!--        class="lizi"-->
<!--      >-->
<!--      </vue-particles>-->
<!--    </div>-->
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    name: 'Login',
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
          // captcha: [
          //   { required: true, message: '验证码不能为空', trigger: 'blur' }
          // ]
        },
        captchaPath: '',
        loading: false,
        passwordType: 'password'
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      addFun () {
        // this.$store.commit('add')
        this.$store.dispatch('add')
      },
      reductionFun () {
        // this.$store.commit('reduction')
        this.$store.dispatch('reduction')
      },
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http({
              url: this.$http.adornUrl('/account/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid
                // 'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                sessionStorage.setItem('token', JSON.stringify(data.data.token))
                // this.$store.dispatch('user/login', JSON.stringify(data.data.token))
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.loading = false
                    this.$router.replace({ name: 'main' })
                  }
                })
              } else {
                // this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        // this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style lang="scss">

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #E5E5E5;;
        height: 47px;
/*
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }*/
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.24);
      background: rgba(0, 0, 0, 0);
      border-radius: 5px;
      color: #454545;
    }
    .el-button {
      background-color: #2082D9;
    }
    .el-form-item__error {
      color: #F56C6C;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 50px;
    }
  }
</style>

<style lang="scss" scoped>
  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #2082D9;
    position: fixed;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 60%;
      height: 100%;
      content: "";
      background: url(~@/assets/img/bg.png) no-repeat;
      background-size:100% 100%;
      /*-webkit-animation: bounce-up 1.4s linear infinite;*/
      /*animation: bounce-up 1.4s linear infinite;*/
      -webkit-animation: bounce-down 1.5s linear infinite;
      animation: bounce-down 1.5s linear infinite;

    }

    .login-form {
      position: relative;
      max-width: 100%;
      /*padding: 160px 35px 0;*/
      margin: 0 auto;
      overflow: hidden;
      background: #FFFFFF;
      width: 370px;
      padding: 10px;
      top: 200px;
      left: 276px;
      z-index: 300;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #646464;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 16px;
        text-align: center;
        font-weight: bold;
      }
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }


 @keyframes bounce-down {
  25% {transform: translateY(-10px);}
  50%, 100% {transform: translateY(0);}
  75% {transform: translateY(10px);}
 }

  .particles {
    position: relative;
    width: 50%;
    height: 100%;
    padding-top: 100px;
  }
</style>
