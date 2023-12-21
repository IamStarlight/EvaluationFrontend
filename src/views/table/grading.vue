<template>
  <div class="hom-container1">
    <p>正在批改学号为：{{this.$route.query.sid}} 同学的作业</p>
    <div class="hom-container1">
      <p>文字内容：</p>
      {{ sHomework[0].details }}
    </div>
    <el-button @click="download">下载附件</el-button>
    <a href="sHomework[0].url" download>下载</a>
    <div class="hom-score" style="display: flex; flex-direction: column;">
      学生当前评分为：<p>{{sHomework[0].teacher_grade}}</p>
      <el-input
        v-model="sHomework[0].teacher_grade"
        placeholder="请输入学生的分数"
        clearable
        style="width: 160px;"
      ></el-input>
      <div style="margin-bottom: 20px;"></div>
      <el-input
        v-model="sHomework[0].teacher_comments"
        type="textarea"
        placeholder="请输入给学生的评语"
        style="width: 400px;"
        :autosize="{minRows: 4, maxRows: 8}"
      ></el-input>
    </div>
    <div class="button-container">
<!--      <el-button type="primary" @click="updateScore(sHomework[0].teacher_grade,sHomework[0].teacher_comments)">提交</el-button>-->
      <el-button type="primary" @click="updateScore(sHomework[0].teacher_grade,sHomework[0].teacher_comments)">提交</el-button>
      <el-button class="hom-back-btn" @click="back">返回</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {download, getStudentHomework, updateScore} from "@/api/homework";

export default {
  data() {
    return {
      sHomework: [],
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
      getStudentHomework(data).then((response) => {
        //console.log(response.data[0])
        this.sHomework = response.data;
        this.listLoading = false;
      });
    },
    download(){
      const wid = this.$route.query.wid;
      const sid = this.$route.query.sid;
      const cid = this.cid;
      const data = {
        sid,
        wid,
        cid,
      };
      download(data).then((response)=> {
        const file = response.data
        console.log(response.data)
      })
    },
    updateScore(Grade,comment) {
      //updateScore(grade,comment) {
      const wid = this.$route.query.wid;
      const sid = this.$route.query.sid;//学生id
      const cid =this.cid;
      const grade = parseInt(Grade);
      const comments =comment;
      const data={
        sid,
        wid,
        cid,
        grade,
        comments
      };
      // console.log(data.sid)
      // console.log(data.teacherGrade)
      updateScore(data)
        .then(response => {
          //console.log(response.data.message());
          // 根据 API 返回的响应，进行相应的处理
          // 可以将密码更新成功的消息提示给用户
          // 或重新获取个人信息等操作
          this.$alert('提交成功', '提示', {
            confirmButtonText: '确定',
          });
          this.showModal = false
          //this.hideModal();
        })
        .catch(error => {
          console.log(error);
        });
      // 假设这里有一个网络请求将更新后的teacherGrade提交到后台数据库
      console.log(data.grade);
    },

    back() {
      this.$nextTick(() => {
        this.$router.push({
          name: "box",
          query: {
            wid: this.$route.query.wid,
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
