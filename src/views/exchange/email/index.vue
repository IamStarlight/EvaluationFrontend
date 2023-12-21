<template>
  <!--下载依赖 npm install --save vue-markdown
    npm install highlight.js
    npm install github-markdown-css
  -->
  <div class="container">
    <div class="container1">
    </div>
    <div class="hom-container">
      <div class="hom-title">{{ homework.title }}</div>
      <div class="hom-user">发布人: {{ this.teacher }}</div>
      <div class="hom-user">截止日期: {{ homework.endTime }}</div>
      <div class="hom-content-container">
        <div class="hom-content">
          <div class="markdown-body">
            <VueMarkdown :source="homework.details" v-highlight></VueMarkdown>
          </div>
          <a class="hom-user2">下载附件：</a>
          <a :href="homework.url" target="_blank" class="hom-user1">{{ homework.url }}</a>
        </div>
      </div>
    </div>

    <div class="container1">
    </div>

    <div class="hom-container">
      <div class="hom-title">已提交作业内容</div>
      <div class="hom-user">提交时间: {{ homeworkmy.time }}</div>
      <div class="hom-content-container">
        <div class="hom-content">
          <div class="markdown-body">
            <VueMarkdown :source="homeworkmy.details" v-highlight></VueMarkdown>
          </div>
          <a class="hom-user2">下载附件：</a>
          <a :href="homework.url" target="_blank" class="hom-user1">{{ homeworkmy.url }}</a>
        </div>
      </div>
    </div>

    <div class="container1">
    </div>

    <div class="hom-container2">
      <div class="hom-title">申诉原因</div>
      <tinymce v-model="form.reason" />
    </div>
    <div class="hom-container3">
      <el-button type="primary" @click=onSubmit()>提交申诉</el-button>
      <el-button type="info" @click=onCancel()>退出申诉</el-button>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import editorImage from '@/components/Tinymce/components/EditorImage'
import MarkdownEditor from '@/components/MarkdownEditor'
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
import { getemail, getdetail, getdetailmy } from '@/api/course'
import { parseTime } from '@/utils/index'
const currentTime = parseTime(Date.now(), '{y}-{m}-{d} {h}:{i}:{s}')

export default {
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid',
      'teacher',
      'cid',
      'homeworkid'
    ])
  },
  data () {
    return {
      homework: {
        title: "作业1",
        details: 'sdsdsd',
        endTime: currentTime,
        url: '2323232'
      },
      homeworkmy: {
        title: "作业1",
        details: 'sdsdsd',
        time: currentTime,
        url: '2323232'
      },
      form: {
        sid: "",
        reason: "",
        cid: "",
        wid: ""
      }
    }
  },
  components: {
    Tinymce,
    VueMarkdown, // 注入组件
    editorImage
  },
  created () {
    this.fetchData()
    this.fetchData1()
  },
  methods: {
    fetchData () {
      const a = { wid: this.homeworkid, cid: this.cid }
      getdetail(a).then(response => {
        this.homework = response.data[0]
      })
    },
    fetchData1 () {
      const a = { sid: this.sid, wid: this.homeworkid, cid: this.cid }
      getdetailmy(a).then(response => {
        //console.log(response.data["title"])       
        this.homeworkmy.details = response.data[0]["details"]
        this.homeworkmy.url = response.data[0]["url"]
      })
    },
    onSubmit () {
      this.form.cid = this.cid
      this.form.wid = this.homeworkid
      this.form.sid = this.sid
      getemail(this.form).then(response => {
        this.$message('submit!')
        this.$router.push({ path: '/example/table' })
      }).catch(() => {
        this.$message({
          message: "导入失败",
          type: "error"
        })
      })
    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({ path: '/example/table' })
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

.container {
  //background-color: rgb(211, 240, 203);
  display: flex;
  // justify-content: center;
  flex-direction: column;
  /* 设置垂直方向布局 */
  height: auto;
  background-size: 100% 100%;
  // background-color: #000;
}

.container1 {
  height: 50px;
}


.hom-container {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: rgb(220, 220, 220);
  width: 80%;
  //max-height: 700px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  /* 设置固定宽度 */
  margin: 0px auto 0;
  position: relative;
  /* 居中显示 */
  border-radius: 10px;
}

.hom-container1 {
  padding: 20px;
  background-color: rgb(255, 255, 255);
  width: 80%;
  //max-height: 700px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  /* 设置固定宽度 */
  margin: 20px auto 0;
  position: relative;
  /* 居中显示 */
  border-radius: 10px;
}

/* 为内部元素设置间距 */
.hom-container1 .inner-element {
  margin: 10px;
  /* 设置间距为10px，根据需要调整间距大小 */
}

.hom-container2 {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  width: 80%;
  //max-height: 700px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  /* 设置固定宽度 */
  margin-top: 20px;
  margin: 0px auto 0;
  position: relative;
  /* 居中显示 */
  border-radius: 10px;
}

.hom-container3 {
  padding: 20px;
  align-items: center;
  display: flex;
  /* 使用Flexbox布局 */
  /* 水平居中 */
  background-color: rgb (255, 255, 255);
  width: auto;
  //max-height: 700px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  /* 设置固定宽度 */
  margin: 0px auto 0;
  position: relative;
  /* 居中显示 */
  border-radius: 10px;
}

.hom-container3 .inner-element {
  margin: 10px;
  /* 设置间距为10px，根据需要调整间距大小 */
}

.hom-container div {
  width: 100%;
  /* 内部<div>元素宽度为容器宽度 */
  word-wrap: break-word;
  /* 溢出时自动换行 */
}

.hom-content-container {
  //max-height: 500px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  background-attachment: scroll;
  background-blend-mode: normal;
  background-clip: border-box;
  // background-color: rgb(255, 255, 255, 0.5);
  background-image: none;
  background-origin: padding-box;
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  overflow: auto;
  margin: 0 auto 60px;
}

.hom-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.hom-user {
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
}

.hom-content {
  font-size: 18px;
  line-height: 1.5;
}

.button-container {
  position: absolute;
  width: 100%;
  bottom: 20px;
  right: 0;
  margin-bottom: 0px;
  border-top: 2px solid #888;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.button {
  play: inline-block;
  margin-right: 10px;
  padding: 8px 16px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  width: 70px;
  height: 30px;
  background-color: lightgray;
  border: none;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

}

.clicked {
  play: inline-block;
  margin-right: 10px;
  padding: 8px 16px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  width: 70px;
  height: 30px;
  background-color: #555555;
  border: none;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.narrow-button {
  width: 100px;
  height: 10px;
  /* 设置按钮宽度为100px，根据需要调整宽度 */
}

.hom-user2 {
  font-size: 16px;
  color: #181717;
  margin-bottom: 10px;
}

.hom-user1 {
  font-size: 16px;
  color: #1146e5;
  margin-bottom: 10px;
  text-decoration: underline;
}
</style>


