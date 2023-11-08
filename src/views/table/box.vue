<template>
  <div>
    <h2>批改作业</h2>
    <p>正在批改作业id为：{{this.$route.query.wid}}</p>
    <table>
      <thead>
      <tr>
        <th>学生ID</th>
        <th>学生姓名</th>
        <th>提交时间</th>
        <th>评分</th>
        <th>作业状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="studentHomework in studentHomework" :key="studentHomework.sid">
        <td>{{ studentHomework.sid }}</td>
        <td>{{ studentHomework.name }}</td>
        <td>{{ studentHomework.submitTime }}</td>
        <td>
          <input type="text" v-model="studentHomework.teacher_grad" @change="updateScore">
        </td>
        <td>{{ studentHomework.isOK }}</td>
        <td>
           <button class="btn1" @click="showDetail(studentHomework.sid)">
             详情
           </button>
           <span style="margin: 10px;"></span>
           <button class="btn2" @click="handleSave(studentHomework.sid)">
             保存
           </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

import {mapGetters} from "vuex";
import {updateScore} from "@/api/homework";

export default {
  name: "GradingComponent",

  components: {

  },
  data() {
    return {
      studentHomework: [
        { sid: 1, name: "张三", submitTime: "2023-11-01T13:00:00.000Z", teacher_grad: 95,isOK:"1" ,content:"123"},
        { sid: 2, name: "李四", submitTime: "2023-11-02T14:00:00.000Z", teacher_grad: 80 },
        { sid: 3, name: "王五", submitTime: "2023-11-03T15:00:00.000Z", teacher_grad: 85 },
        { sid: 4, name: "赵六", submitTime: "2023-11-04T16:00:00.000Z", teacher_grad: 90 },
        { sid: 5, name: "刘七", submitTime: "2023-11-05T17:00:00.000Z", teacher_grad: 75 }
      ],
      //studentHomework:[],
      loading :false
    };
  },
  methods: {
    updateScore() {
      console.log(this.studentHomework.sid)
      const data={
        sid:this.sid,
        teacher_grad:this.teacher_grad
      };
      console.log(data.sid)
      console.log(data.teacher_grad)
      updateScore(data)
      .then(response => {
        console.log(response.data.message());
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
      // 假设这里有一个网络请求将更新后的teacher_grad提交到后台数据库
      console.log(data.teacher_grad);
    },
    showDetail(sid) {
      this.$router.push({
        name: 'grading',
        query: { sid: sid}
      });
    },
    handleSave(studentId) {
      // 假设这里有一个网络请求删除该学生的评语
      console.log(studentId);
    }
  }
};
</script>

<style scoped>
table {
  margin-left: 20px;
  border-collapse: collapse;
  width: 95%;
}

th,
td {
  text-align: center;
  padding: 8px;
  font-size: 16px;
  border: 1px solid black;
}

th {
  background-color: #c2c2c2;
}

.btn1,
.btn2 {
  border: none;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.btn1 {
  background-color: #4CAF50;
  color: white;
}

.btn2 {
  background-color: #f44336;
  color: white;
}
</style>



