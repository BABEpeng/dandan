<template>
  <div>
    <div class="login-container">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" class="login-form" auto-complete="on" label-position="left"
               @keyup.enter.native="dataFormSubmit()" status-icon>
        <div class="title-container">
          <p class="title">账号密码登录</p>
        </div>
        <el-form-item prop="userName">
           <span class="svg-container">
             <icon-svg name="user"></icon-svg>
           </span>
          <el-input 
            v-model="dataForm.userName"
            placeholder="请输入登录账号"
          />
        </el-form-item>
        <el-form-item prop="password">
           <span class="svg-container">
             <icon-svg name="password"></icon-svg>
           </span>
          <el-input
            v-model="dataForm.password"
            type="password"
            placeholder="请输入登录密码"
            ref="password"
          />
        </el-form-item>
           <el-checkbox label=记住密码 name="type"></el-checkbox>

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
          <el-button class="login-btn-submit"  :loading="loading" type="primary" style="width:100%;" @click="dataFormSubmit()">登录</el-button>
          <p class="tips">
            <span>忘记密码</span>
            <span>注册会员</span>
          </p>
        </el-form-item>
       
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
            { required: true, message: '帐号不能为空', trigger: 'change' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'change' }
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
                this.$store.commit('user/updateName', data.data.username)
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
                this.loading = false
                this.$message.error(data.msg)
              }
            }).catch(() => {
              this.loading = false
              this.$message.error('连接服务失败，请检查网络是否可用！')
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
  // .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    
  // }
  .tips{
    text-align: right;
    color: white
  }
  .el-checkbox__label{
    color: #ccc;
    font-size: 13px
  }
  .el-checkbox__inner{
    background-color:#4a87e2;
    border-color: #d1d1d1;
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 36px;
      width: 85%;

      input {
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        /*color: #E5E5E5;*/
        height: 36px;
        background: none;
        border: none
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
      margin-bottom:16px;
    }
    .el-form-item:last-child{
      border: none
    }
    .el-button {
      background-color: #2082D9;
      border: none
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
    .el-form-item--medium .el-form-item__content{
      line-height: 28px;
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
      width:100%;
      height: 100%;
      content: "";
      background: url(~@/assets/img/bg.jpg) no-repeat;
      background-size: 100% 100%;
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
      background:rgba(89, 144, 227,0.3);
      border: 1px solid #4793f1;
      width: 340px;
      padding:34px 34px 0 34px;
      top:160px;
      left: 400px;
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
        text-align: left;
        color: white
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
    .login-container .el-input input {
      color: rgba(12, 35, 59, 0.74);
    }
  }


//  @keyframes bounce-down {
//   25% {transform: translateY(-10px);}
//   50%, 100% {transform: translateY(0);}
//   75% {transform: translateY(10px);}
//  }

  .particles {
    position: relative;
    width: 50%;
    height: 100%;
    padding-top: 100px;
  }
  // .el-input .el-input--medium{
    
  // }
</style>
