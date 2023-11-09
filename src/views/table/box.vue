<template>
  <div>
    <h2>批改作业</h2>
    <p>正在批改作业id为：{{this.$route.query.wid}}</p>
<!--    <p>正在批改作业id为：{{studentHomework.wid}}</p>-->
    <table>
      <thead>
      <tr>
        <th>学生ID</th>
        <th>学生姓名</th>
        <th>提交时间</th>
        <th>老师评分</th>
        <th>总分</th>
<!--        <th>状态</th>-->
        <th>是否迟交</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="studentHomework in studentHomework" :key="studentHomework.id">
        <td>{{ studentHomework.id }}</td>
        <td>{{ studentHomework.name }}</td>
        <td>{{ studentHomework.submit_time }}</td>
        <td>{{ studentHomework.teacher_grade }}</td>
        <td>{{ studentHomework.total_grade}}</td>
<!--        <td>{{ studentHomework.status}}</td>-->
        <td>{{ studentHomework.is_late }}</td>
        <td>
           <button class="btn1" @click="handleClick(studentHomework.id)">
             详情
           </button>
           <span style="margin: 10px;"></span>
<!--           <button class="btn2" @click="handleSave(studentHomework.id)">-->
<!--             评论-->
<!--           </button>-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import {getHomework} from "@/api/homework";

export default {
  name: "GradingComponent",

  computed: {
    ...mapGetters([
      'id'
    ])
  },
  data() {
    return {
      // studentHomework: [
      //   { sid: 1, name: "张三", submitTime: "2023-11-01T13:00:00.000Z", teacherGrade: 95,isOK:"1" ,content:"123"},
      //   { sid: 2, name: "李四", submitTime: "2023-11-02T14:00:00.000Z", teacherGrade: 80 },
      //   { sid: 3, name: "王五", submitTime: "2023-11-03T15:00:00.000Z", teacherGrade: 85 },
      //   { sid: 4, name: "赵六", submitTime: "2023-11-04T16:00:00.000Z", teacherGrade: 90 },
      //   { sid: 5, name: "刘七", submitTime: "2023-11-05T17:00:00.000Z", teacherGrade: 75 }
      // ],
      studentHomework:[],
      loading :false
    };
  },
  created() {
    this.fetchData();
  },
  mounted(){
  },
  methods: {
    fetchData() {
      const wid = this.$route.query.wid;
      const cid = this.id;
      const data = {
        wid,
        cid,
      }
      this.listLoading = true
      getHomework(data).then(response => {
        this.studentHomework = response.data
        //console.log(response.data.cid)
        this.listLoading = false
      })
    },

    handleClick(id) {
      console.log(this.studentHomework.id);//为什么为空呢
      console.log(this.$route.query.wid)//非空
      this.$nextTick(() => {
        this.$router.push({
          name: 'grading',
          query: {
            sid: id,
            wid: this.$route.query.wid
          }
        });
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



