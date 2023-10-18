<template>
  <div class="register-page">
    <div class="register-content">
      <div class="register-header">你好这个是注册界面</div>
      <div class="register-form">
        <el-form ref="registerForm" :model="registerForm" :rules="registerFormRules" label-width="100px">
          <el-form-item label="UserName" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item label="Identity" prop="role">
            <el-select v-model="registerForm.role" placeholder="Choose you identity">
              <el-option label="student" value="student"></el-option>
              <el-option label="teacher" value="teacher"></el-option>
              <el-option label="administer" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="e-mail" prop="email">
            <el-input v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister">sign</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="stars">
      <div class="star" v-for="(item, index) in starsCount" :key="index" ref="star"></div>
    </div>
  </div>
</template>


<script>
import { MessageBox } from 'element-ui';
export default {
  data() {
    return {
      starsCount: 1200,
      distance: 800,
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        email: '',
      },
      registerFormRules: {
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: 'Please check your password', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' },
        ],
        role: [
          { required: true, message: 'Please choose identity', trigger: 'change' },
        ],
        email: [
          { required: true, message: 'Please input your e-mail', trigger: 'blur' },
          { type: 'email', message: 'Please input the correct format', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  mounted() {
    this.initStars()
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 执行注册逻辑，发送请求到后端
          console.log('注册成功');

          // 弹出注册成功的提示窗口
          MessageBox.alert('注册成功', '提示', {
            confirmButtonText: '去登录',
            callback: action => {
              // 跳转到登录界面
              this.$router.push('/login');
            }
          });
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    initStars() {
      let starArr = this.$refs.star
      starArr.forEach(item => {
        let speed = 0.2 + (Math.random() * 1)
        let thisDistance = this.distance + (Math.random() * 300)
        item.style.transformOrigin = `0 0 ${thisDistance}px`
        item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed}, ${speed})`
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(black,black,grey,black);
  //background-color:#2d3a4b; /* 设置背景颜色 */
}

.register-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.register-header {
  margin-top: 0; /* 将标题位置设置为正上方 */
  color: #fff; /* 将标题颜色设置为白色 */
  font-size: 42px; /* 增大标题字体大小，使其更加显眼 */
}

.register-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px; /* 增加表单与标题之间的间距 */
  width: 700px;
  height: 430px;
}

.el-form-item__content {
  width: 100%; /* 输入框拉长 */
}

.register-button {
  background-color:#2d3a4b; /* 设置按钮的背景颜色 */
}

@keyframes rotate {
  0% {
    transform: perspective(600px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(600px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}

.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  bottom: -200px;
}

.star {
  width: 2px;
  height: 2px;
  background: #f7f7b8;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

</style>
