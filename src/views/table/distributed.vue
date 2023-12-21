<template>
  <div>
    <h2>已发布作业</h2>
    <el-table :data="assignments">
      <!-- 表头 -->
      <el-table-column label="作业ID" width="80px">
        <template slot-scope="scope">
          {{ scope.row.wid }}
        </template>
      </el-table-column>
      <el-table-column label="作业名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="截止时间">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="提交人数" width="100px">
        <template slot-scope="scope">
          {{ scope.row.submitNumber }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <template v-if="new Date(scope.row.endTime) > new Date()">
            <el-button class="btn1" @click="gotoGrading(scope.row.wid)">
              去批改
            </el-button>
            <span style="margin: 10px;"></span>
            <el-button class="btn2" @click="deleteHom(scope.row.wid)">
              删除作业
            </el-button>
            <span style="margin: 10px;"></span>
            <el-button class="btn3" @click="showDia(scope.row.wid)"
                       :disabled="false" type="primary">
              发布互评
            </el-button>
          </template>
          <template v-else>
            <el-button class="btn4" @click="gotoDetail(scope.row.wid)"
                       :disabled="false" type="warning">
              查看详情
            </el-button>
            <span style="margin: 10px;"></span>
            <el-button class="btn2" @click="deleteHom(scope.row.wid)">
              删除作业
            </el-button>
            <span style="margin: 10px;"></span>
            <el-button class="btn3" @click="showDia(scope.row.wid)"
                       :disabled="true">
              发布互评
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="showDialog" title="互评截止日期">
      <div class="date-time-container">
        <label for="endTime">截止日期:</label>
        <input id="endTime" class="hom-info-input" type="datetime-local">
      </div>
      <el-button type="primary" @click="evaluation()">确定</el-button>
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
      showDialog:false,
      wwid:1,
    }
  },
  computed: {
    ...mapGetters([
      'cid',
      'homeworkid'
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
    gotoDetail(wid) {
      this.$router.push({
        name: 'detail',
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
    showDia(wid) {
      this.showDialog = true;
      //this.wwid = wid;
      console.log(wid);
      //console.log(this.wwid);
      this.$store.dispatch("course/setchangehomeworkid",
        wid
      );
      console.log(this.homeworkid)
    },
    cancel() {
      this.showDialog = false;
    },
    evaluation(){
      const endTimeInput = document.getElementById('endTime')
      const endTimeValue = endTimeInput.value;
      const endTime1 = new Date(endTimeValue);
      // 格式化为 "yyyy-MM-dd hh:mm" 格式
      const ddl= `${endTime1.getFullYear()}-${(endTime1.getMonth() + 1).toString().padStart(2, '0')}-${endTime1.getDate().toString().padStart(2, '0')} ${endTime1.getHours().toString().padStart(2, '0')}:${endTime1.getMinutes().toString().padStart(2, '0')}`;

      //const wid = this.homeworkid;
      const wid = this.wwid;
      console.log(wid);
      const cid = this.cid;
      const status = 2;
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
    },

  }
}
</script>


<style scoped>
el-table {
  margin-left: 20px;
  width: 95%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f0f0f0;
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
  background-color:darkred;
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

.btn4 {
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
.btn3:hover {
  background-color:grey;
}

</style>
