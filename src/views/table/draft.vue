<template><!--草稿箱列表，可以去继续编辑，删除草稿，必须继续编辑才能发布，编辑跳到新页面，这里把startTime信息去掉，因为没有发布的话就不会有startTime记录-->
  <div>
    <h2>草稿箱</h2>
    <table>
      <thead>
      <tr><!--如果空呢-->
        <th>作业ID</th>
        <th>作业名称</th>
        <th>截止时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="assignment in assignments" :key="assignment.id">
        <td>{{ assignment.wid }}</td>
        <td>{{ assignment.title}}</td>
        <td>{{ assignment.endTime }}</td>
        <td>
          <button class="btn1" @click="handleModify(assignment.wid,assignment.title,assignment.endTime)">
            重新编辑
          </button>
<!--          <span style="margin: 10px;"></span>-->
<!--          <button class="btn3" @click="handleSubmit(assignment.wid)">-->
<!--            直接发布-->
<!--          </button>-->
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
import {mapGetters} from "vuex";
import {listDraft,deleteHomework} from "@/api/homework";
export default {
  data() {
    return {
      listLoading: true,
      assignments:[]
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
      listDraft(this.cid).then(response => {
        this.assignments = response.data
        console.log(response.data.wid)
        this.listLoading = false
      })
      //console.log(this.cid)
    },
    handleModify(wid,title,endTime,detail){//cid,cname,title,endTime,detail
      this.$router.push({
        name: 'modify',
        query:
          {
            wid:wid,
          title:title,
          endTime:endTime,
            detail:detail
         }
      });
    },
    handleSubmit(){
      this.$alert('发布成功', '提示', {
        confirmButtonText: '确定',
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
.btn3 {
  padding: 6px 12px;
  border: none;
  background-color:cornflowerblue;
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
