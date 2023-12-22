<template>
  <div>
    <div class="info-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>申诉详情</span>
        </div>
        <!--    <p>{{this.$route.query.sid}}</p>-->
        <!--    <p>{{this.$route.query.wid}}</p>-->
        <p>作业标题：{{emailDetail[0].title}}</p>
        <p>老师分数：{{emailDetail[0].teacher_grade}}</p>

        <strong>作业内容：</strong>
        <VueMarkdown :source="emailDetail[0].details" v-highlight></VueMarkdown>
        <strong>申诉原因：</strong>
        <VueMarkdown :source="emailDetail[0].appeal_reason" v-highlight></VueMarkdown>
        <div class="button-container1">
          <el-button type="primary" @click="showUpdateScoreDialog">修改成绩</el-button>
          <el-button type="primary" @click="showRDialog">回复申诉</el-button>
          <el-button class="hom-back-btn" @click="back">返回</el-button>
        </div>
      </el-card>
    </div>

    <el-dialog :visible.sync="showDialog" title="修改成绩">
      <p>输入新成绩：</p>
      <el-input v-model="newScore"></el-input>
      <p>回复申诉：</p>
      <el-input v-model="comment"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateScore">取消</el-button>
        <el-button type="primary" @click="confirmUpdateScore(newScore,comment)">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showReplyDialog" title="回复申诉">
      <p>回复申诉：</p>
      <el-input v-model="appeal_reply"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRDialog">取消</el-button>
        <el-button type="primary" @click="reEvaluate(appeal_reply)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { listEmailDetail, updateScore, appealReply} from "@/api/homework";
import VueMarkdown from "vue-markdown";

export default {
  components: {VueMarkdown},
  data() {
    return {
      // emailDetail: [{
      //   peer_grade:90,
      //   teacher_grade:90,
      //   title:"title",
      //   details:"hhhhhh",
      //   appeal_reason:"打分错误"
      // }],
      emailDetail: [],
      showDialog:false,
      showReplyDialog:false,
      newScore:'',
      comment:'',
      appeal_reply:''
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
    showRDialog() {
      this.showReplyDialog = true;
    },
    cancelRDialog() {
      this.showReplyDialog = false;
    },
    confirmUpdateScore(Grade,comment) {
      const wid = this.$route.query.wid;
      const sid = this.$route.query.sid;//学生id
      const cid =this.cid;
      const comments = comment;
      const grade = parseInt(Grade);
      const data={
        sid,
        wid,
        cid,
        grade,
        comments
      };
      // 在这里处理修改成绩的逻辑
      updateScore(data)
        .then(response => {
          this.$alert('修改成绩成功', '提示', {
            confirmButtonText: '确定',
          });
        })
        .catch(error => {
          console.log(error);
        });
      console.log("新成绩：" + this.newScore);
      console.log("回复：" + this.comment);
      this.showDialog = false;
    },
    reEvaluate(appeal_reply){
      const wid = this.$route.query.wid;
      const sid = this.$route.query.sid;//学生id
      const cid =this.cid;
      const reply = appeal_reply;
      const data={
        sid,
        wid,
        cid,
        reply
      };
      // 在这里处理修改成绩的逻辑
      appealReply(data)
        .then(response => {
          this.$alert('回复成功', '提示', {
            confirmButtonText: '确定',
          });
        })
        .catch(error => {
          console.log(error);
        });
      this.showReplyDialog = false;
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

.info-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  margin-top: 10px;
  width: 80%;
}
.hom-back-btn {
  margin-top: 20px;
}
</style>

