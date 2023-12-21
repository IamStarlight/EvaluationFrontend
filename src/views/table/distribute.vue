<template>
  <!--下载依赖 npm install --save vue-markdown
    npm install highlight.js
    npm install github-markdown-css
  -->
  <el-form ref="homeworkForm" :model="form" label-width="100px" style="margin-top: 40px;">

    <el-form-item label="作业标题" required>
      <el-input v-model="form.title" placeholder="请输入作业标题"></el-input>
    </el-form-item>

    <el-form-item label="是否定时发布">
      <el-switch v-model="form.isScheduled"></el-switch>
    </el-form-item>

    <el-form-item v-if="form.isScheduled" label="定时发布">
      <el-date-picker type="datetime" v-model="form.startTime" :picker-options="pickerOptions" placeholder="选择日期时间"></el-date-picker>
    </el-form-item>

    <el-form-item label="截止日期" required>
      <el-date-picker type="datetime" v-model="form.endTime" :picker-options="pickerOptions" placeholder="选择日期时间" value-format="yyyy-MM-dd hh:mm" ></el-date-picker>
    </el-form-item>

    <el-form-item label="上传附件">
      <el-button type="primary" @click="dialogVisible = true" style="margin-right: 20px;">选择上传pdf</el-button>
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
    </el-form-item>

    <el-form-item label="作业内容" required>
      <el-input v-model="form.details" type="textarea" :rows="6" placeholder="请输入作业内容"></el-input>
    </el-form-item>

    <el-form-item label="评分占比" required>
      <el-select v-model="form.rate" placeholder="请选择占比">
        <el-option label="30" value="30"></el-option>
        <el-option label="50" value="50"></el-option>
        <el-option label="70" value="70"></el-option>
      </el-select>
    </el-form-item>

    <div v-if="!form.isScheduled" style="margin-left: 100px;">
      <el-button type="primary" @click="onSubmit">发布作业</el-button>
      <el-button type="info" @click="toDraft">存入草稿</el-button>
    </div>

    <div v-if="form.isScheduled" style="margin-left: 100px;">
      <el-button type="primary" @click="onTime">定时发布</el-button>
    </div>
  </el-form>
</template>


<script>
import { mapGetters } from "vuex";
import { deliverHomework,deliverpdf } from "@/api/homework";


export default {
  data () {
    return {
      // content:'',
      // selectedDate: '',
      // isScheduled: false,
      //对话框控制权
      dialogVisible: false,
      dialogVisible1: false,
      //存放上传文件
      fileList: [],
      form: {
        cid:this.cid,
        title: '',
        isScheduled: false,
        startTime: null,
        endTime: null,
        details: '',
        status:'',
        wid:'',//如果后端有传回一个wid那么把这个存起来，每次提交都传一个wid，如果有那么写在一起，如果为空那么新增一个
        rate:''
      },
    }
  },
  components: {

  },

  computed: {
    ...mapGetters([
      'cid',
      'cname',
      'teacher',
    ])
  },

  methods: {

    submitImportForm () {
      // 使用form表单的数据格式
      const paramsData = new FormData()
      // 将上传文件数组依次添加到参数paramsData中
      this.fileList.forEach((x) => {
        paramsData.append('file', x.file)
      });
      // 将输入表单数据添加到params表单中
      paramsData.append('cid', this.cid)
      deliverpdf(paramsData).then(response => {
        this.form.wid = response.data.wid
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
      this.fileList = []//集合清空
      this.dialogVisible = false//关闭对话框
    },

    onSubmit () {
      console.log(this.form)
      this.$refs.homeworkForm.validate(valid => {
        if (valid) {
          this.form.status = 2
          const details = this.form.details;
          const cid = this.cid
          const title = this.form.title;
          const endTime = this.form.endTime
          const status = this.form.status
          const wid = this.form.wid
          // 构造请求参数
          const requestData = {
            details,
            cid,
            title,
            endTime,
            status,
            wid
          };
          // 发送请求给后端，并传递请求参数
          deliverHomework(requestData)
            .then(response => {
              console.log(response.data.message);
              // 根据 API 返回的响应，进行相应的处理
              // 可以给用户显示作业提交成功的消息
              this.$message.success('作业发布成功');
              // 其他操作
            })
          this.$message('submit!')
        } else {
          this.$message.error('请正确填写表单信息');
          return false;
        }
      });
    },
    toDraft () {
      console.log(this.form)
      this.$refs.homeworkForm.validate(valid => {
        if (valid) {
          this.form.status = 1
          const details = this.form.details;
          const cid = this.cid
          const title = this.form.title;
          const endTime = this.form.endTime
          const status = this.form.status
          const wid = this.form.wid
          // 构造请求参数
          const requestData = {
            details,
            cid,
            title,
            endTime,
            status,
          };
          // 发送请求给后端，并传递请求参数
          deliverHomework(requestData)
            .then(response => {
              console.log(response.data.message);
              // 根据 API 返回的响应，进行相应的处理
              // 可以给用户显示作业提交成功的消息
              this.$message.success('作业发布成功');
              // 其他操作
            })
          this.$message('save!')
        } else {
          this.$message.error('请正确填写表单信息');
          return false;
        }
      });
    },
    onTime () {
      console.log(this.form)
      this.$refs.homeworkForm.validate(valid => {
        if (valid) {
          this.form.status = 4
          const details = this.form.details;
          const cid = this.cid
          const title = this.form.title;
          const endTime = this.form.endTime
          const status = this.form.status
          const startTime = this.form.startTime
          const wid = this.form.wid
          // 构造请求参数
          const requestData = {
            details,
            cid,
            title,
            endTime,
            status,
            startTime,
            wid
          };
          // 发送请求给后端，并传递请求参数
          deliverHomework(requestData)
            .then(response => {
              console.log(response.data.message);
              // 根据 API 返回的响应，进行相应的处理
              // 可以给用户显示作业提交成功的消息
              this.$message.success('作业发布成功');
              // 其他操作
            })
          this.$message('submit!')
        } else {
          this.$message.error('请正确填写表单信息');
          return false;
        }
      });
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
//上传作业按钮
.button-container3 .inner-element {
  margin: 10px;
  /* 设置间距为10px，根据需要调整间距大小 */
}

.button-container3 {
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


