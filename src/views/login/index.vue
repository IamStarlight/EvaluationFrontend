<template>
  <div class="login-container">
    <div class="stars">
      <div v-for="(item, index) in starsCount" :key="index" class="star" ref="star"></div>
    </div>
    <div class="a">
      <div class="b"></div>
      <div class="c">
        <div class="d" ref="loginForm" :model="loginForm">
          <h1>北交疯人院</h1>
          <h2>Login</h2>
          <input type="text" class="e" placeholder="USER NAME" v-model="loginForm.username">
          <input type="password" class="e" placeholder="PASSWORD" v-model="loginForm.password">
          <el-button class="g" type="primary" @click.native.prevent="handleLogin">Login</el-button>
          <el-button type="text" style="color: black; font-weight: 700;" @click.native.prevent="handleSign">sign
            in</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6)
      {
        callback(new Error('The password can not be less than 6 digits'))
      } else
      {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'hyx',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      starsCount: 2000, //星星数量
      distance: 600 //间距
    }
  },
  mounted () {
    let starArr = this.$refs.star
    starArr.forEach(item => {
      let speed = 0.2 + (Math.random() * 1);
      let thisDistance = this.distance + (Math.random() * 300);
      item.style.transformOrigin = `0 0 ${thisDistance}px`;
      item.style.transform = `
        translate3d(0,0,-${thisDistance}px)
        rotateY(${Math.random() * 360}deg)
        rotateX(${Math.random() * -50}deg)
        scale(${speed},${speed})`;
    })
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password')
      {
        this.passwordType = ''
      } else
      {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        alert("登录成功!")
        console.log('跳转后的路由地址:', this.$route.fullPath)
        this.$router.push({ path: this.redirect || '/' })
        console.log('跳转后的路由地址:', this.$route.fullPath)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSign () {
      this.$router.push({ path: '/sign' })
      // console.log('跳转后的路由地址:', this.$route.fullPath)
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

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
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }

  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}

.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  // left: 50%;
  animation: rotate 90s infinite linear;
  bottom: 0;
}

.star {
  width: 2px;
  height: 2px;
  background: #f7f7b6;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
}

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #000000, #3cadeb);
  display: flex;
  overflow: hidden;
  justify-content: center;
  position: absolute;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    height: 350px;
    padding: 70px 35px 0;
    background-color: transparent;
    border: 2px solid #f7f7b6;
    backdrop-filter: blur(8px);
    margin: auto;
    margin-top: 100px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.a {
  position: relative;
  top: 100px;
  width: 1100px;
  height: 550px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .8);
  display: flex;
}

.b {
  width: 800px;
  height: 550px;
  background-image: url(../../assets/background/H.jpg);
  /* 让图片适应大小 */
  background-size: cover;
  font: 900 50px '';
}

.c {
  width: 300px;
  height: 550px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.d {
  width: 250px;
  height: 500px;
}

.d h1 {
  font: 900 30px '';
}

.e {
  width: 230px;
  margin: 20px 0;
  outline: none;
  border: 0;
  padding: 10px;
  border-bottom: 3px solid rgb(80, 80, 170);
  font: 900 16px '';
  line-height: 30px;
}

.f {
  float: right;
  margin: 10px 0;
}

.g {
  position: absolute;
  margin: 20px;
  bottom: 85px;
  display: block;
  width: 200px;
  height: 60px;
  font: 900 30px '';
  text-decoration: none;
  line-height: 30px;
  border-radius: 30px;
  background-image: linear-gradient(to left,
      #9c88ff, #3cadeb);
  text-align: center;
}
</style>
