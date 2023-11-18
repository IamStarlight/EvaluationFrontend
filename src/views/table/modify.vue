<template>
  <!--下载依赖 npm install --save vue-markdown
    npm install highlight.js
    npm install github-markdown-css
  -->
  <div class="container">
    <div class="container1">
      <div class="notice">课程号:{{ cid }}</div>
      <div class="notice">本课程为：{{ cname }}</div>
    </div>


    <div class="hom-info-container">
      <div class="hom-info">
        <label for="title">作业标题:</label>
        <input id="title" class="hom-info-input" type="text" placeholder="请输入作业标题">
      </div>
      <div class="date-time-container">
        <label for="endTime">截止日期:</label>
        <input id="endTime" class="hom-info-input" type="datetime-local">
      </div>
    </div>

    <!--大文本输入框-->
    <div class="hom-info-container2">
      <label for="detail">作业内容:</label>
      <tinymce v-model="content" style="width: 1200px;" />
    </div>

    <div class="button-container">
      <label for="plugin">选择附件:</label>
      <el-button type="info" @click="dialogVisible = true">选择pdf</el-button>
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>

    <div class="button-container2">
      <el-button type="primary" @click="onSubmit">发布作业</el-button>
      <el-button type="info" @click=toDraft()>存入草稿</el-button>
      <el-button type="info" @click=back()>返回</el-button>
    </div>


    <el-dialog title="导入信息" :visible.sync="dialogVisible">
      <el-form ref="importFormRef" :model="importForm" label-width="130px">
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
  </div>
</template>

<script>
//TODO:这里暂时copy的发布作业界面，到时候记得改动
import VueMarkdown from 'vue-markdown'
import editorImage from '@/components/Tinymce/components/EditorImage'
import MarkdownEditor from '@/components/MarkdownEditor'
import Tinymce from '@/components/Tinymce'
import { mapGetters } from "vuex";
//import 'vue-datetime/dist/vue-datetime.css';
import {listDraftDetail, deliverHomework, intoDraft} from "@/api/homework";
import { id } from "html-webpack-plugin/lib/chunksorter";
export default {
  data () {
    return {
      listLoading: true,
      selectedDate: '',
      //对话框控制权
      dialogVisible: false,
      //导入表单数据
      importForm: {
        kgCode: '',
        targetUrl: '',
        targetUsername: '',
        targetPassword: '',
      },
      //存放上传文件
      fileList: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },
  components: {
    Tinymce,
    VueMarkdown, // 注入组件
    editorImage
  },

  computed: {
    ...mapGetters([
      'cid',
      'cname',
      'teacher',
    ])
  },
  created() {
    this.fetchData();
  },
  methods: {
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
      //判断文件类型，必须是xlsx格式
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
    //导入Excel病种信息数据
    submitImportForm () {
      // 使用form表单的数据格式
      const params = new FormData()
      // 将上传文件数组依次添加到参数paramsData中
      this.fileList.forEach((x) => {
        paramsData.append('file', x.file)
      });
      // 将输入表单数据添加到params表单中
      params.append('kgCode', this.importForm.kgCode)
      params.append('targetUrl', this.importForm.targetUrl)
      params.append('targetUsername', this.importForm.targetUsername)
      params.append('targetPassword', this.importForm.targetPassword)

      //这里根据自己封装的axios来进行调用后端接口
      this.httpPostWithLoading(IMPORT_URL, paramsData).then(match => {
        if (match.success)
        {
          this.$message({
            message: "导入成功",
            type: "success"
          })
        } else
        {
          this.$message({
            message: "导入失败",
            type: "error"
          })
        }
        this.fileList = []//集合清空
        this.dialogVisible1 = false//关闭对话框
      })
    },


    fetchData() {
      this.listLoading = true;
      const wid = this.$route.query.wid;
      // const data = {
      //   wid,
      // };
      listDraftDetail(wid).then(response => {
        this.draft= response.data
        console.log(response.data.wid)
        this.listLoading = false
      })
      //console.log(this.cid)
    },
    onSubmit () {
      //获取截止日期输入框元素
      const endTimeInput = document.getElementById('endTime')
      const endTimeValue = endTimeInput.value;
      const endTime = new Date(endTimeValue);
      // 获取作业内容
      const detail = 'eat';
      const cid = this.cid
      const wid = 5;
      const status = 2;//111111111111111111111111111111111111111111111111111111直接发布
      // 获取作业标题
      const titleInput = document.getElementById('title');
      const title = titleInput.value

      // 构造请求参数
      const requestData = {
        detail,
        cid,
        //tid,
        title,
        wid,
        endTime,
        status
      };//wid是自动生成的吗

      // 发送请求给后端，并传递请求参数
      deliverHomework(requestData)
        .then(response => {
          console.log(response.data.message);
          // 根据 API 返回的响应，进行相应的处理
          // 可以给用户显示作业提交成功的消息
          this.$message.success('作业发布成功');
          // 其他操作
        })
        .catch(error => {
          console.log(error);
          // 错误处理
          // 可以将错误信息提示给用户
          this.$message.error('作业发布失败');
        });

      this.$message('submit!')
    },
    toDraft () {
      const endTimeInput = document.getElementById('endTime')
      const endTimeValue = endTimeInput.value;
      const endTime = new Date(endTimeValue);
      const detail = 'eat';
      const cid = this.cid
      const wid = 5;
      const status = 1;//111111111111111111111111111111111111111111111111111111存入草稿
      // 获取作业标题
      const titleInput = document.getElementById('title');
      const title = titleInput.value
      const requestData = {
        detail,
        cid,
        //tid,
        title,
        wid,
        endTime,
        status
      }
      intoDraft(requestData)
        .then(response => {
          console.log(response.data.message);
          // 根据 API 返回的响应，进行相应的处理
          // 可以给用户显示作业提交成功的消息
          this.$message.success('存入草稿成功');
          // 其他操作
        })
        .catch(error => {
          console.log(error);
          // 错误处理
          // 可以将错误信息提示给用户
          this.$message.error('存入草稿失败');
        });

      this.$message('save!')
    },
    back() {
      this.$nextTick(() => {
        this.$router.push({
          name: "draft",
          query: {
            wid: this.$route.query.wid,
          },
        });
      });
    },
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


//课程名称提示
.notice {
  color: grey
}

//标题和DDL样式
.hom-info-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 将子元素左对齐 */
  margin: 20px;
}

.hom-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.hom-info label {
  margin-right: 10px;
}

.hom-info input[type="text"] {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.date-time-container {
  display: flex;
  align-items: center;
}

.date-time-container label {
  margin-right: 10px;
}

.date-time-container input[type="datetime-local"] {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.hom-info:focus-within {
  outline: none;
  border-color: #66afe9;
  box-shadow: 0 0 5px #66afe9;
}

//大文本框样式
.hom-info-container2 {
  display: flex;
  align-items: flex-start;
  margin: 20px;
}

.hom-info-container2 label {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.hom-info-container2 tinymce {
  width: 1200px;
}

//上传pdf按钮样式
.button-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
}

.button-container label {
  margin-right: 10px;
}

.button-container .el-button {
  margin-right: 20px;
}

//上传作业按钮
.button-container2 .inner-element {
  margin: 10px;
  /* 设置间距为10px，根据需要调整间距大小 */
}

.button-container2 {
  padding: 20px;
  align-items: center;
  display: flex;
  /* 使用Flexbox布局 */
  /* 水平居中 */
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
</style>


