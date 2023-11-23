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
        <td>{{ assignment.title}}</td>
        <td>{{ assignment.startTime}}</td>
        <td>{{ assignment.endTime }}</td>
        <td>{{ assignment.submitNumber}}</td>
        <td>
          <button class="btn1" @click="gotoGrading(assignment.wid)">
            去批改
          </button>
          <span style="margin: 10px;"></span>
          <button class="btn2" @click="deleteHom(assignment.wid)">
            删除作业
          </button>
          <span style="margin: 10px;"></span>
<!--          <button class="btn3" @click="evaluation(assignment.wid)">-->
<!--            发布互评-->
<!--          </button>-->
          <button class="btn3" @click="showDia">
            发布互评
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <el-dialog :visible.sync="showDialog" title="互评截止日期">
      <div class="date-time-container">
        <label for="endTime">截止日期:</label>
        <input id="endTime" class="hom-info-input" type="datetime-local">
      </div>
      <el-button type="primary" @click="evaluation(assignments.wid)">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-dialog>

  </div>
</template>


<script>
import {mapGetters} from "vuex";
import {deleteHomework, evaluate, listHomework} from "@/api/homework";

export default {
  data() {
    return {
     // cid:'1',
      // assignments: [
      //   { id: 1, name: '作业1', startTime: '2023-11-01', deadline: '2023-11-07' },
      //   { id: 2, name: '作业2', startTime: '2023-11-03', deadline: '2023-11-10' },
      //   { id: 3, name: '作业3', startTime: '2023-11-05', deadline: '2023-11-12' },
      // ],
      assignments:[],
      listLoading: true,
      showDialog:false
    }
  },
  computed: {
    ...mapGetters([
      'cid'
    ])
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
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
    gotoGrading(wid) {
      this.$router.push({
        name: 'box',
        query: { wid: wid }
      });
    },
    deleteHom(id){
      const wid = id;
      const cid = this.cid
      const data={
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
    },
    showDia() {
      this.showDialog = true;
    },
    cancel() {
      this.showDialog = false;
    },
    evaluation(id){
      const endTimeInput = document.getElementById('endTime')
      const endTimeValue = endTimeInput.value;
      const endTime1 = new Date(endTimeValue);
      // 格式化为 "yyyy-MM-dd hh:mm" 格式
      const ddl= `${endTime1.getFullYear()}-${(endTime1.getMonth() + 1).toString().padStart(2, '0')}-${endTime1.getDate().toString().padStart(2, '0')} ${endTime1.getHours().toString().padStart(2, '0')}:${endTime1.getMinutes().toString().padStart(2, '0')}`;

      const wid = id;
      console.log(wid);
      const cid = this.cid;
      const status = 1;
      const data = {
        wid,
        cid,
        status,
        ddl
      }
      evaluate(data)
        .then(response => {
          this.$alert('发布互评成功', '提示', {
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
  background-color:cornflowerblue;
  color: white;
  cursor: pointer;
}
.btn2 {
  padding: 6px 12px;
  border: none;
  background-color:cornflowerblue;
  color: white;
  cursor: pointer;
}

.btn3 {
  padding: 6px 12px;
  border: none;
  background-color:green;
  color: white;
  cursor: pointer;
}

.btn1:hover {
  background-color: black;
}
.btn2:hover {
  background-color:grey;
}
.btn3:hover {
  background-color:grey;
}
</style>
