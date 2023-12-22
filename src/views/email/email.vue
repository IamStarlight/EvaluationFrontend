<template>
  <div class="appeal-list">
    <el-table :data="appealList">
      <el-table-column label="学生姓名">
        <template slot-scope="scope">
          {{ scope.row.sname }}
        </template>
      </el-table-column>
      <el-table-column label="作业名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="申诉理由">
        <template slot-scope="scope">
          <VueMarkdown :source="scope.row.appeal_reason" v-highlight></VueMarkdown>
<!--          {{ scope.row.appeal_reason }}-->
        </template>
      </el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.appeal_time }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row.wid, scope.row.sid)">
            详情
          </el-button>
          <el-button @click="ignore(scope.row.sid, scope.row.wid)">
            忽略
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {listEmail, deleteEmail} from "@/api/homework";
import VueMarkdown from "vue-markdown";

export default {
  components: {VueMarkdown},
  data() {
    return {
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
      // this.listLoading = true;
      // const cid = this.cid;
      // const tid =
      // const data={
      //   cid,
      //   tid
      // }
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
        name: 'Detail',
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
