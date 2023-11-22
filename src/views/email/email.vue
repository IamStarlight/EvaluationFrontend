<template>
  <div class="appeal-list">
    <table>
      <thead>
      <tr>
        <th>学生姓名</th>
        <th>作业名称</th>
        <th>申诉理由</th>
        <th>提交时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="email in appealList" :key="email.sid">
        <td>{{ email.sname }}</td>
        <td>{{ email.title}}</td>
        <td>{{ email.reason }}</td>
        <td>{{ email.submit_time }}</td>
        <td>
          <button @click="viewDetail(email.wid,email.sid)">详情</button>
          <button @click="ignore(email.sid,email.wid)">忽略</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {listEmail, deleteEmail} from "@/api/homework";

export default {
  data() {
    return {
      // appealList: [
      //   {
      //     sid: 1,
      //     wid:1,
      //     title:'haha1',
      //     studentName: '张三',
      //     reason: '作业批改有误',
      //     submitTime: '2023-11-10 14:30:22'
      //   },
      //   {
      //     sid: 2,
      //     title:'haha2',
      //     wid:2,
      //     studentName: '李四',
      //     reason: '分数计算有误',
      //     submitTime: '2023-11-11 09:20:11'
      //   },
      //   {
      //     sid: 3,
      //     wid:3,
      //     title:'haha3',
      //     studentName: '王五',
      //     reason: '作业未按时提交',
      //     submitTime: '2023-11-11 10:05:58'
      //   }
      // ],
       appealList:[]
    }
  },
  computed: {
    ...mapGetters([
      'cid',
      'cname'
    ])
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      listEmail(this.cid).then(response => {
        this.appealList = response.data
        console.log(response.data.wid)
        this.listLoading = false
      })
      //console.log(this.cid)
    },

    viewDetail(wid,sid) {
      // 显示申诉详情
      this.$router.push({
        name: 'detail',
        query: { wid:wid ,sid:sid}
      });
    },
    ignore(sid,wid) {
      // 忽略该申诉
      const cid = this.cid
      const data={
        sid,
        wid,
        cid
      };
      deleteEmail(data)
        .then(response => {
          this.$alert('删除成功', '提示', {
            confirmButtonText: '确定',
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.appeal-list {
  margin-top: 20px;
}

table {
  margin-left: 20px;
  border-collapse: collapse;
  width: 95%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f1f1f1;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 0 10px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
