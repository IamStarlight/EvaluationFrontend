<template>
  <div>
    <h2>已发布作业</h2>
    <table>
      <thead>
      <tr>
        <th>作业ID</th>
        <th>作业名称</th>
        <th>开始时间</th>
        <th>截止时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="assignment in assignments" :key="assignment.id">
        <td>{{ assignment.id }}</td>
        <td>{{ assignment.name }}</td>
        <td>{{ assignment.startTime }}</td>
        <td>{{ assignment.deadline }}</td>
        <td>
          <button class="btn1" @click="gotoGrading(assignment.id)">
            去批改
          </button>
          <span style="margin: 10px;"></span>
          <button class="btn2" @click="deleteHom(assignment.id)">
            删除作业
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import {getHomework, listHomework} from "@/api/homework";
import {getList} from "@/api/Tcourse";

export default {
  data() {
    return {
      assignments: [
        { id: 1, name: '作业1', startTime: '2023-11-01', deadline: '2023-11-07' },
        { id: 2, name: '作业2', startTime: '2023-11-03', deadline: '2023-11-10' },
        { id: 3, name: '作业3', startTime: '2023-11-05', deadline: '2023-11-12' },
      ],
      //assignments:[],
      listLoading: true
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getHomework().then(response => {
        this.assignments = response.data
        this.listLoading = false
      })
    },
    gotoGrading(wid) {
      this.$router.push({
        name: 'box',
        query: { wid: wid }
      });
    },
    deleteHom(){

    }
  }
}
</script>


<style scoped>
table {
  margin-left: 20px;
  width: 95%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f0f0f0;
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}

.btn1 {
  padding: 6px 12px;
  border: none;
  background-color:cornflowerblue;
  color: white;
  cursor: pointer;
}
.btn2 {
  padding: 6px 12px;
  border: none;
  background-color:darkslategrey;
  color: white;
  cursor: pointer;
}

.btn1:hover {
  background-color: black;
}
.btn2:hover {
  background-color:grey;
}
</style>
