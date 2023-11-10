<template>
  <div>
    <!-- 问候语 -->
    <div class="greetings">
      <h1>{{ greeting }}</h1>
    </div>
    <!-- 用户信息容器 -->
    <div class="personal-info-container">
      <h2>个人信息</h2>
      <div class="personal-info">
        <div class="info-item">
          <label style="color: black;">用户名：</label>
          <p style="color: purple;">{{ name }}</p>
        </div>
        <div class="info-item">
          <label style="color: black;">ID号：</label>
          <p style="color: purple;">{{ id }}</p>
        </div>
        <div class="info-item">
          <label style="color: black;">permission：</label>
          <p style="color: purple;">{{ permission }}</p>
        </div>
        <div class="info-item">
          <label style="color: black;">邮箱：</label>
          <p style="color: purple;">{{ email}}</p>
        </div>
      </div>
      <button class="change-password-btn" @click="showModal=true">修改密码</button>
    </div>
    <!-- 修改密码弹窗 -->
    <div class="modal-wrapper">
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <h3>修改密码</h3>
          <input type="password" v-model="oldpwd" placeholder="请输入原密码" />
          <input type="password" v-model="newpwd" placeholder="请输入新密码" />
          <div class="modal-buttons">
            <button class="confirm-btn" @click="changePassword">确认修改</button>
            <button class="cancel-btn" @click="cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
import { getUserInfo, changePassword } from "@/api/change";


export default {
  name: 'Dashboard',
  data () {
    return {
      name: '1111',
      id: '',
      password: '',
      permission:'',
      email:'',
      showModal: false,
      newpwd: '',
      oldpwd: ''
    };
  },
  mounted() {
    // 页面加载时调用 API 获取个人信息
    this.getUserInfo();
  },
   computed: {
     ...mapGetters([
       'name',
       'roles',
       'sid'
     ]),
    // 根据当前时间返回不同的问候语
    greeting() {
      const currentHour = new Date().getHours(); // 获取当前小时数
      if (currentHour >= 5 && currentHour < 12) {
        return `早上好，${this.name}！`;
      } else if (currentHour >= 12 && currentHour < 18) {
        return `下午好，${this.name}！`;
      } else {
        return `晚上好，${this.name}，夜深了早点休息。`;
      }
    },
  },
  methods: {
      getUserInfo() {
        getUserInfo()
          .then(response => {
            const userInfo = response.data;
            console.log(userInfo);//成功输出
            console.log(this.name);//111111
            this.name = userInfo.name;
            console.log(this.name);//成功输出
            this.id = userInfo.id;
            this.password = userInfo.password;
            this.permission = userInfo.permission;
            this.email = userInfo.email
          })
          .catch(error => {
            console.log(error);
          });
      },
      changePassword() {
        const data = {
          oldpwd: this.oldpwd,
          newpwd: this.newpwd
        };
        console.log(data.oldpwd);
        console.log(this.password);
        console.log(data.newpwd);

        changePassword(data)
          .then(response => {
            console.log(response.data.message);
            // 根据 API 返回的响应，进行相应的处理
            // 可以将密码更新成功的消息提示给用户
            // 或重新获取个人信息等操作
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
            });
            this.showModal = false
            //this.hideModal();
          })
          .catch(error => {
            console.log(error);
          });
      },

      cancel(){
        this.showModal=false;
      },
      change() {
        if (this.roles == 3) {
          this.$store.dispatch("user/setchangerole",
            ['4']
          );
        } else {
          this.$store.dispatch("user/setchangerole",
            ['5']
          );
        }
      }


    }
}
</script>

<style lang="scss" scoped>
.personal-info-container {
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
}

.personal-info-container h2 {
  color: #333;
}

.personal-info .info-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.personal-info .info-item label {
  color: white;
}

.personal-info .info-item p {
  color: blue;
  margin-left: 5px;
}

.change-password-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: grey	;
  color: black;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-top: 100px;
}

.modal h3 {
  margin-bottom: 10px;
  color: #333;
}

.modal input[type="password"] {
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
}

.modal-buttons button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ccc;
  color: #333;
}

.dashboard-container {
  padding: 10px;
  margin-top: 10px;
}

.dashboard-text {
  color: #333;
  font-weight: bold;
}

p {
  font-size: 18px;
}

label{
  font-size:18px
}
</style>
