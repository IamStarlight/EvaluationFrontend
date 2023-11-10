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
          <th>提交人数</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="assignment in assignments" :key="assignment.id">
          <td>{{ assignment.wid }}</td>
          <td>{{ assignment.title }}</td>
          <td>{{ assignment.startTime }}</td>
          <td>{{ assignment.endTime }}</td>
          <td>{{ assignment.submitNumber }}</td>
          <td>
            <button class="btn1" @click="gotoGrading(assignment.wid)">
              去批改
            </button>
            <span style="margin: 10px;"></span>
            <button class="btn2" @click="deleteHom(assignment.wid)">
              删除作业
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { deleteHomework, listHomework } from "@/api/homework";

export default {
  data () {
    return {
      //cid: '1',
      // assignments: [
      //   { id: 1, name: '作业1', startTime: '2023-11-01', deadline: '2023-11-07' },
      //   { id: 2, name: '作业2', startTime: '2023-11-03', deadline: '2023-11-10' },
      //   { id: 3, name: '作业3', startTime: '2023-11-05', deadline: '2023-11-12' },
      // ],
      assignments: [],
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'cid'
    ])
  },
  created () {
    this.fetchData();
  },
  methods: {
    fetchData () {
      this.listLoading = true;
      // let cid;
      // cid = 1
      //console.log(cid)
      listHomework(this.cid).then(response => {
        this.assignments = response.data
        console.log(response.data.wid)
        this.listLoading = false
      })
      //console.log(this.cid)
    },
    gotoGrading (wid) {
      this.$router.push({
        name: 'box',
        query: { wid: wid }
      });
    },
    deleteHom (id) {
      const wid = id;
      const cid = this.cid
      const data = {
        wid,
        cid
      };
      deleteHomework(data)
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
  background-color: cornflowerblue;
  color: white;
  cursor: pointer;
}

.btn2 {
  padding: 6px 12px;
  border: none;
  background-color: darkslategrey;
  color: white;
  cursor: pointer;
}

.btn1:hover {
  background-color: black;
}

.btn2:hover {
  background-color: grey;
}
</style>
