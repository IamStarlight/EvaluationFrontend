<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; 问候语 &ndash;&gt;-->
<!--    <div class="greetings">-->
<!--      <h1>{{ greeting }}</h1>-->
<!--    </div>-->

<template>
  <div>
    <div class="grid-content bg-purple">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人中心</span>
        </div>
        <div class="name-role">
          <span class="sender">{{permission === 'ROLE_TEACHER' ? 'teacher' : permission === 'ROLE_STUDENT' ? 'student' : permission === 'ROLE_ADMIN' ? 'admin' : ''}} - {{name}}</span>
        </div>
        <div class="registe-info">
          <span class="registe-info">
           <i class="fa fa-clock-o"></i>
            登录时间：{{ formatDate(new Date()) }}
           </span>
        </div>
        <div class="personal-relation">
          <div class="relation-item">用户ID:  <div style="float: right; padding-right:20px;">{{id}}</div></div>
        </div>
        <div class="personal-relation">
          <div class="relation-item">用户邮箱:  <div style="float: right; padding-right:20px;">{{email}}</div></div>
        </div>
        <div class="relation-item">role:
          <div style="float: right; padding-right:20px;">
            {{permission === 'ROLE_TEACHER' ? 'teacher' : permission === 'ROLE_STUDENT' ? 'student' : permission === 'ROLE_ADMIN' ? 'admin' : ''}}
          </div>
        </div>
        <div class="button-container">
          <el-button type="primary" @click="showModal=true">修改密码</el-button>
        </div>
      </el-card>
    </div>
<!--    <p>{{this.}}</p>-->
    <el-dialog :visible.sync="showModal" title="修改密码" width="30%" center>
      <el-form :model="passwordForm" ref="passwordForm" label-width="80px" size="small">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="oldpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="newpwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword">确定修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
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
      oldpwd: '',
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
       'sid',
       'teacher'
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
      },
    formatDate(date) {
      const year = date.getFullYear();
      const month =  (date.getMonth()+1).toString().padStart(2, '0');
      const day = (date.getDate()).toString().padStart(2, '0');
      const hour = (date.getHours()).toString().padStart(2, '0');
      const minute = (date.getMinutes()).toString().padStart(2, '0');
      const second = (date.getSeconds()).toString().padStart(2, '0');
      return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    },




    }
}
</script>

<style lang="scss" scoped>
.grid-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
//卡片样式
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  margin-top: 10px;
  width: 70%;
  background-color: rgb(211, 240, 203);
}
//文本样式区
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align:center;
}
//.sender{
//  text-align:center;
//}
.registe-info{
  text-align: center;
  padding-top:10px;
}

.relation-item {
  padding: 12px;
}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
//布局样式区
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}


</style>
