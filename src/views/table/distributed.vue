<template>
  <div>
    <h2>l 已发布作业</h2>
    <div class="centered-card">
      <el-card>
        <el-table :data="assignments"  class="custom-table">
          <!-- 表头 -->
          <el-table-column label="作业ID" width="80px">
            <template slot-scope="scope">
              {{ scope.row.wid }}
            </template>
          </el-table-column>
          <el-table-column label="作业名称" width="200px">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="开始时间" width="190px">
            <template slot-scope="scope">
              {{ scope.row.startTime }}
            </template>
          </el-table-column>
          <el-table-column label="截止时间" width="190px">
            <template slot-scope="scope">
              {{ scope.row.endTime }}
            </template>
          </el-table-column>
          <el-table-column label="提交人数" width="80px">
            <template slot-scope="scope">
              {{ scope.row.submitNumber }}/61
            </template>
          </el-table-column>
          <el-table-column label="操作" width="450px">
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
                <el-button class="btn3" @click="showDia(scope.row.wid)" type="primary"
                           :disabled="scope.row.evaStatus === '已发布互评'">
                  发布互评
                </el-button>
                <el-button class="btn5" @click="startSimilar(scope.row.wid)"
                           :disabled="true">
                  相似度检测
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
                           :disabled="scope.row.evaStatus === '已发布互评'">
                  发布互评
                </el-button>
                <el-button class="btn5" @click="startSimilar(scope.row.wid)">
                  相似度检测
                </el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>


    <el-dialog :visible.sync="showDialog" title="互评截止日期">
      <div class="date-time-container">
        <label for="endTime">截止日期:</label>
        <input id="endTime" class="hom-info-input" type="datetime-local">
      </div>
      <el-button type="primary" @click="evaluation()">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-dialog>

    <el-dialog :visible.sync="showSimilarDialog" title="结果展示" @close="handleCloseDialog">
      <el-table :data="tableData">
        <el-table-column prop="student1" label="学生1"></el-table-column>
        <el-table-column prop="student2" label="学生2"></el-table-column>
        <el-table-column prop="similarity" label="相似度"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleCloseDialog">关闭</el-button>
  </span>
    </el-dialog>

  </div>
</template>


<script>
import {mapGetters} from "vuex";
import {deleteHomework, evaluate, listHomework,similar} from "@/api/homework";

export default {
  data() {
    return {
      assignments:[],
      listLoading: true,
      showDialog:false,
      wwid:1,
      showSimilarDialog: false, // 控制对话框的显示与隐藏
      tableData: '' // 用于存储 response.data
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
    startSimilar(id){
      const wid = id;
      const cid = this.cid
      const data={
        wid,
        cid
      };
      similar(data).then(response => {
        console.log(response.data);
        if (response.data !== null && response.data !== undefined && response.data !== '') {
          this.$alert('成功开启', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.tableData = response.data
                .map(item => ({
                student1: item[0],
                student2: item[1],
                similarity: item[2]
              }));
              this.showSimilarDialog = true;
            }
          });
        }
      }).catch(error => {
        console.log(error);
      });
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
    openDialog(data) {
      similar(data).then(response => {
        console.log(response.data);
        if (response.data !== null && response.data !== undefined && response.data !== '') {
          this.dialogContent = response.data; // 将 response.data 存储到 dialogContent 中
          this.showSimilarDialog = true; // 打开对话框，即将 showDialog 设置为 true
        }
      }).catch(error => {
        console.log(error);
      });
    },
    handleCloseDialog() {
      this.showSimilarDialog = false; // 关闭对话框
    }

  }
}
</script>


<style scoped>

.centered-card {
  display: flex;
  justify-content: center;
  margin: 0 20px; /* 调整左右间隔 */
}

h2{
  margin-left: 20px;
}

.custom-table {
  margin-left: 20px; /* 左右各添加 20px 的空隙 */
  margin-right:20px ;
}

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
.btn5 {
  padding: 6px 12px;
  border: none;
  background-color:grey;
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
