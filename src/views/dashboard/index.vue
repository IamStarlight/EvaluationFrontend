<template>
  <div class="personal-info-container">
    <h2>个人信息</h2>
    <div class="personal-info">
      <div class="info-item">
        <label>用户名：</label>
        <p>{{ username }}</p>
      </div>
      <div class="info-item">
        <label>ID号：</label>
        <p>{{ id }}</p>
      </div>
      <div class="info-item">
        <label>密码：</label>
        <p>{{ password }}</p>
      </div>
      <div class="info-item">
        <label>个性签名：</label>
        <p>{{ signature }}</p>
      </div>
    </div>
    <button class="change-password-btn" @click="showModal = true">修改密码</button>

    <!-- 修改密码弹窗 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>修改密码</h3>
        <input type="password" v-model="oldPassword" placeholder="请输入原密码" />
        <input type="password" v-model="newPassword" placeholder="请输入新密码" />
        <button class="confirm-btn" @click="changePassword">确认修改</button>
      </div>
    </div>
    <div class="dashboard-container">
      <div class="dashboard-text">name: {{ name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo, changePassword } from "@/api/change";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid'
    ])
  },
  data () {
    return {
      username: this.name,
      id: this.sid,
      password: '',
      signature: '',
      showModal: false,
      newPassword: '',
      oldPassword: ''
    };
  },
  mounted () {
    // 页面加载时调用 API 获取个人信息
    this.getUserInfo();
  },
  methods: {
    getUserInfo () {
      getUserInfo()
        .then(response => {
          const userInfo = response.data.userInfo;
          console.log(userInfo);//成功输出
          console.log(this.username);//111111
          this.username = userInfo.username;
          console.log(this.username);//成功输出
          this.id = userInfo.id;
          this.password = userInfo.password;
          this.signature = userInfo.signature;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changePassword () {
      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      console.log(data.oldPassword);
      console.log(this.password);
      console.log(data.newPassword);
      // 根据您的需求，您可以在此处添加对输入的旧密码进行比较的逻辑
      if (data.oldPassword !== this.password)
      {
        console.log("旧密码输入错误");
        return; // 如果旧密码输入错误，不继续执行修改密码的操作
      }

      changePassword(data.newPassword)
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
  }
}
</script>

<style lang="scss" scoped>
.personal-info-container {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  background-color: #f1f8ff;
}

.personal-info {
  display: flex;
  flex-direction: column;
  /* 修改为纵向布局 */
  margin: -10px;
}

.info-item {
  padding: 10px;
}

.info-item label {
  font-weight: bold;
}

.change-password-btn {
  margin-top: 10px;
  /* 修改为上方留出一点间距 */
  display: block;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
}

.confirm-btn {
  padding: 10px 20px;
  display: block;
  margin-left: auto;
  margin-right: 0;
}

.dashboard-container {
  margin-top: 20px;
  /* 修改为上方留出一点间距 */
}

.dashboard-text {
  font-size: 30px;
  line-height: 46px;
}
</style>
