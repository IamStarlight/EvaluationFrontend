<template>
  <div class="appeal-list">
    <table>
      <thead>
      <tr>
        <th>学生姓名</th>
        <th>申诉理由</th>
        <th>提交时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in appealList" :key="item.id">
        <td>{{ item.studentName }}</td>
        <td>{{ item.reason }}</td>
        <td>{{ item.submitTime }}</td>
        <td>
          <button @click="viewDetail(item)">详情</button>
          <button @click="ignore(item)">忽略</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appealList: [
        {
          id: 1,
          studentName: '张三',
          reason: '作业批改有误',
          submitTime: '2023-11-10 14:30:22'
        },
        {
          id: 2,
          studentName: '李四',
          reason: '分数计算有误',
          submitTime: '2023-11-11 09:20:11'
        },
        {
          id: 3,
          studentName: '王五',
          reason: '作业未按时提交',
          submitTime: '2023-11-11 10:05:58'
        }
      ]
    }
  },
  methods: {
    viewDetail(item) {
      // 显示申诉详情
    },
    ignore(item) {
      // 忽略该申诉
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
