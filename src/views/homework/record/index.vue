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
      <div class="hom-user">Author: {{ this.teacher }}</div>
      <div class="hom-user">publish-time: {{ homework.endTime }}</div>
      <div class="hom-content-container">
        <div class="hom-content">
          <div class="markdown-body">
            <VueMarkdown :source="homework.details" v-highlight></VueMarkdown>
          </div>
          <a color="blue" :href="homework.url" target="_blank" class="buttonText">{{ homework.url }}</a>
        </div>
      </div>
    </div>
    <div class="hom-container3">
      <el-button type="primary" @click="dialogVisible = true" style="margin-right: 20px;">选择上传pdf</el-button>
      <editorImage color="#1890ff" class="editor-upload-btn" style="margin-right: 20px;" />
      <el-button type="primary" @click="dialogVisible1 = true" style="margin-right: 20px;">选择输入文字</el-button>
    </div>
    <div class="hom-container">
      <div class="hom-title">已上传成功列表</div>
      <div class="hom-content-container">
        <div class="hom-content">
          <div class="markdown-body">
            <div class="hom-user">只允许上传文字内容和一个附件:</div>
            <div class="hom-user">{{ this.now }}</div>
            <div class="hom-user">{{ this.now1 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hom-container3">
      <el-button type="primary" @click=onPass()>完成提交</el-button>
      <el-button type="info" @click=onCancel()>退出作业</el-button>
    </div>



    <el-dialog title="导入信息" :visible.sync="dialogVisible">
      <el-form ref="importFormRef" label-width="130px">
        <el-form-item label="上传文件:">
          <el-upload class="upload-demo" ref="upload" :http-request="httpRequest" :before-upload="beforeUpload"
            :on-exceed="handleExceed" :limit="1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.pdf文件,且不超过5M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitImportForm">开始导入</el-button>
          <el-button type="info" @click="dialogVisible = false">关闭窗口</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



    <el-dialog title="导入信息" :visible.sync="dialogVisible1">
      <tinymce v-model="form.detail" />
      <el-button type="primary" @click="onSubmit()">提交作业</el-button>
      <el-button type="info" @click="dialogVisible1 = false">关闭窗口</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getpdf, getcomment, getdetail, getdetailmy } from '@/api/course'
import VueMarkdown from 'vue-markdown'
import editorImage from '@/components/Tinymce/components/EditorImage'
import MarkdownEditor from '@/components/MarkdownEditor'
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
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
  created () {
    this.fetchData(),
      this.fetchData1()
  },
  data () {
    return {
      //对话框控制权
      dialogVisible: false,
      dialogVisible1: false,
      //存放上传文件
      fileList: [],
      homework: {
        title: "作业1",
        details: 'sdsdsd',
        endTime: currentTime,
        url: '2323232'
      },
      now: "",
      now1: "",
      form: {
        sid: "",
        detail: "",
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

  methods: {
    fetchData () {
      const a = { wid: this.homeworkid, cid: this.cid }
      getdetail(a).then(response => {
        this.homework.title = response.data["title"]
        //console.log(response.data["title"])       
        this.homework.details = response.data["details"]
        this.homework.endTime = response.data["endTime"]
        this.homeworl.url = response.data["url"]
      })
    },
    fetchData1 () {
      const a = { wid: this.homeworkid, cid: this.cid }
      getdetailmy(a).then(response => {
        //console.log(response.data["title"])       
        this.now = response.data["details"]
        this.now1 = response.data["url"]
      })
    },
    // 覆盖默认的上传行为，可以自定义上传的实现，将上传的文件依次添加到fileList数组中,支持多个文件
    httpRequest (option) {
      this.fileList.push(option)
    },
    // 上传前处理
    beforeUpload (file) {
      let fileSize = file.size
      const FIVE_M = 5 * 1024 * 1024;
      //大于5M，不允许上传
      if (fileSize > FIVE_M)
      {
        this.$message.error("最大上传5M")
        return false
      }
      //判断文件类型，必须是pdf格式
      let fileName = file.name
      let reg = /^.+(\.pdf)$/
      if (!reg.test(fileName))
      {
        this.$message.error("只能上传PDF文件!")
        return false
      }
      return true
    },
    // 文件数量过多时提醒
    handleExceed () {
      this.$message({ type: 'error', message: '最多支持1个附件上传' })
    },
    //导入pdf病种信息数据
    submitImportForm () {
      // 使用form表单的数据格式
      const paramsData = new FormData()
      // 将上传文件数组依次添加到参数paramsData中
      this.fileList.forEach((x) => {
        paramsData.append('file', x.file)
      });
      // 将输入表单数据添加到params表单中
      paramsData.append('cid', this.cid)
      paramsData.append('wid', this.wid)
      getpdf(paramsData).then(response => {
        this.$message({
          message: "导入成功",
          type: "success"
        })
        this.now1 = "已上传一个文件"
      }).catch(() => {
        this.$message({
          message: "导入失败",
          type: "error"
        })
      })
      this.$refs.upload.clearFiles()//清空上传列表
      this.fileList = []//集合清空
      this.dialogVisible = false//关闭对话框
      // //这里根据自己封装的axios来进行调用后端接口
      // this.httpPostWithLoading(IMPORT_URL, paramsData).then(match => {
      //   if (match.success)
      //   {
      //     this.$message({
      //       message: "导入成功",
      //       type: "success"
      //     })
      //     this.$router.push({ path: '/example/table' })
      //   } else
      //   {
      //     this.$message({
      //       message: "导入失败",
      //       type: "error"
      //     })
      //   }
      //   this.$refs.upload.clearFiles()//清空上传列表
      //   this.fileList = []//集合清空
      //   this.dialogVisible = false//关闭对话框

      // })
    },
    onSubmit () {
      this.form.cid = this.cid
      this.form.wid = this.homeworkid
      this.form.sid = this.sid
      getcomment(this.form).then(response => {
        this.$message('submit!')
        this.now = "已上传一份文本"
      }).catch(() => {
        this.$message({
          message: "导入失败",
          type: "error"
        })
      })

    },
    onPass () {
      if (this.now != "" || this.now1 != "")
      {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.$router.push({ path: '/example/table' })
      } else
      {
        this.$message({
          message: '未提交作业',
          type: 'warning'
        })
      }

    },
    onCancel () {
      this.$message({
        message: '已取消提交',
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
  padding: 20px;
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


