<template>
  <!--下载依赖 npm install --save vue-markdown
    npm install highlight.js
    npm install github-markdown-css
  -->
  <div class="container">
    <div class="container1">
    </div>
    <div class="hom-container">
      <div class="hom-title">{{ blog.title }}</div>
      <div class="hom-user">publish-time: {{ blog.time }}</div>
      <div class="hom-content-container">
        <div class="hom-content">
          <div class="markdown-body">
            <VueMarkdown :source="blog.content" v-highlight></VueMarkdown>
          </div>
        </div>
      </div>
    </div>
    <div class="hom-container1">
      <el-form :rules="Rules" :model="result" ref="result">
        <el-form-item ref="grade" prop="grade" label="评分">
          <el-input v-model="result.grade" placeholder="得分" type="number"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="hom-container2">
      <div class="hom-user">评语</div>
      <tinymce v-model="result.comments" />
    </div>
    <div class="hom-container3">
      <el-button type="primary" @click.native.prevent="onSubmit()">提交评分</el-button>
      <el-button type="info" @click=onCancel()>退出评分</el-button>
    </div>

  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import editorImage from '@/components/Tinymce/components/EditorImage'
import MarkdownEditor from '@/components/MarkdownEditor'
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
import { getexhomework, getexchomework } from '@/api/course'
export default {
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid',
      'teacher',
      'cid',
      'homeworkid',
      'exchangeid'
    ])
  },
  data () {
    const validateInput = (rule, value, callback) => {
      if (value > 100 || value < 0)
      {
        callback(new Error('请输入正确的分数'))
      } else
      {
        callback()
      }
    }
    return {
      Rules: {
        grade: [{ required: true, trigger: 'blur', validator: validateInput }],
      },
      blog: {
        title: '作业1',//名字
        content: "a",//文本内容
        time: 'sdsdsd',//发布时间
        url: ""//下载链接

      },
      result: {
        sid: "",
        evaSid: "",
        wid: "",
        cid: "",
        grade: "",
        comments: "",
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
  },
  methods: {
    fetchData () {
      const a = { beEvaSid: this.exchangeid, wid: this.homeworkid, cid: this.cid }
      getexchomework(a).then(response => {
        this.blog = response.data
      })
    },
    onSubmit () {
      this.$refs.result.validate(valid => {
        if (valid)
        {
          this.result.sid = this.exchangeid
          this.result.evaSid = this.sid
          this.result.wid = this.homeworkid
          this.result.cid = this.cid
          getexhomework(this.result).then(response => {
            this.$message({
              message: '提交成功',
              type: 'sucess'
            })
          })

        }
        else
        {
          this.$message({
            message: '提交失败',
            type: 'warning'
          })
          console.log('error submit!!')
          return false
        }
      })

    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({ path: '/evaluation/index' })
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

.container {
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
  display: flex;
  /* 使用Flexbox布局 */
  padding: 0px;
  background-color: rgb(255, 255, 255);
  width: 80%;
  //max-height: 700px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  /* 设置固定宽度 */
  margin: 20px auto 10px;
  position: relative;
  /* 居中显示 */
  border-radius: 10px;
}

/* 为内部元素设置间距 */
.hom-container1 .inner-element {
  /* 设置间距为10px，根据需要调整间距大小 */
}

.hom-container2 {
  background-color: rgb (255, 255, 255);
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
</style>


