<template>
  <div>
    <h2>作业详情</h2>
    <el-button  @click="back()">
      返回
    </el-button>
    <el-table :data="studentHomework">
      <!-- 表头 -->
      <el-table-column label="学生ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.submit_time }}
        </template>
      </el-table-column>
      <el-table-column label="老师评分">
        <template slot-scope="scope">
          {{ scope.row.teacher_grade }}
        </template>
      </el-table-column>
      <el-table-column label="总分">
        <template slot-scope="scope">
          {{ scope.row.total_grade }}
        </template>
      </el-table-column>
      <el-table-column label="是否迟交">
        <template slot-scope="scope">
          {{ scope.row.is_late }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getHomework } from "@/api/homework";

export default {
  name: "detail",

  computed: {
    ...mapGetters([
      'cid'
    ])
  },
  data () {
    return {
      studentHomework: [],
      loading: false
    };
  },
  created () {
    this.fetchData();
  },
  mounted () {
  },
  methods: {
    fetchData () {
      const wid = this.$route.query.wid;
      const cid = this.cid;
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

    handleClick (id) {
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
    handleSave (studentId) {
      // 假设这里有一个网络请求删除该学生的评语
      console.log(studentId);
    },
    back(){
      this.$router.push({
        name: 'Distributed',
      });
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



