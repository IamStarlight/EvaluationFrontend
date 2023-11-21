<template>
  <div>
    <p>这里是申诉具体内容界面，展示互评分数，老师分数，作业内容，申诉原因</p>
<!--    <p>{{this.$route.query.sid}}</p>-->
<!--    <p>{{this.$route.query.wid}}</p>-->
    <p>互评分数：{{emailDetail.peer_grade}}</p>
    <p>老师分数：{{emailDetail.teacher_grade}}</p>
    <p>作业标题：{{emailDetail[0].title}}</p>
    <p>作业内容：{{emailDetail.details}}</p>
    <p>申诉原因：{{emailDetail[0].appeal_reason}}</p>
    <div class="button-container1">
      <el-button type="primary" @click="showUpdateScoreDialog">修改成绩</el-button>
      <el-button type="primary" @click="reEvaluate(id)">重发互评</el-button>
      <el-button class="hom-back-btn" @click="back">返回</el-button>
    </div>

    <el-dialog :visible.sync="showDialog" title="修改成绩">
      <p>输入新成绩：</p>
      <el-input v-model="newScore"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateScore">取消</el-button>
        <el-button type="primary" @click="confirmUpdateScore">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import {reEvaluate, listEmailDetail, updateTeacherGrade} from "@/api/homework";

export default {
  data() {
    return {
      // emailDetail: [{
      //   peer_grade:90,
      //   teacher_grade:90,
      // }],
      emailDetail: [],
    };
  },

  computed: {
    ...mapGetters([
      'cid'
    ]),
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const wid = this.$route.query.wid;
      const sid = this.$route.query.sid;
      const cid = this.cid;
      const data = {
        sid,
        wid,
        cid,
      };
      this.listLoading = true;
      listEmailDetail(data).then((response) => {
        //console.log(response.data[0])
        this.emailDetail = response.data;
        this.listLoading = false;
      });
    },
    showUpdateScoreDialog() {
      this.showDialog = true;
    },
    cancelUpdateScore() {
      this.showDialog = false;
    },
    confirmUpdateScore() {
      // 在这里处理修改成绩的逻辑
      updateTeacherGrade(grade,sid,wid,cid)
        .then(response => {
          this.$alert('发布互评成功', '提示', {
            confirmButtonText: '确定',
          });
        })
        .catch(error => {
          console.log(error);
        });
      console.log("新成绩：" + this.newScore);
      this.showDialog = false;
    },
    reEvaluate(id){
      const wid = id;
      const cid = this.cid;
      const data = {
        wid,
        cid
      }
      reEvaluate(data)
        .then(response => {
          this.$alert('发布互评成功', '提示', {
            confirmButtonText: '确定',
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    back() {
      this.$nextTick(() => {
        this.$router.push({
          name: "Email",
          query: {
            cid: this.cid,
          },
        });
      });
    },
  },
};
</script>


<style scoped>
.hom-container1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.hom-details {
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  width: 60%;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
}

.hom-score {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.el-input-group__append{
  margin-left: 20px;
}


.hom-back-btn {
  margin-top: 20px;
}
</style>

