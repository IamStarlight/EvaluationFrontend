<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" type="primary" @click=" dialogVisible = true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload :multiple="true" :http-request="httpRequest" :before-upload="beforeUpload" class="editor-slide-upload"
        :limit="1" list-type="picture-card">
        <el-button size="small" type="primary">
          Click upload
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        Confirm
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { getpdf, getAllhomework } from '@/api/course'
import { mapGetters } from 'vuex'
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
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    httpRequest (option) {
      this.fileList.push(option)
    },
    handleExceed () {
      this.$message({ type: 'error', message: '最多支持1个附件上传' })
    },
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },

    handleSubmit () {
      if (this.fileList.length === 0)
      {
        this.$alert("请选择图片再进行上传操作");
        return;
      }
      // 使用form表单的数据格式
      const paramsData = new FormData()
      // 将上传文件数组依次添加到参数paramsData中
      this.fileList.forEach((x) => {
        paramsData.append('file', x.file)
      });
      // 将输入表单数据添加到params表单中
      paramsData.append('cid', this.cid)
      paramsData.append('wid', this.homeworkid)
      getpdf(paramsData).then(response => {
        this.$message({
          message: "提交成功",
          type: "success"
        })
        this.$router.push({ path: '/example/table' })
      }).catch(() => {
        this.$message({
          message: "导入失败",
          type: "error"
        })
      })
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++)
      {
        if (this.listObj[objKeyArr[i]].uid === uid)
        {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++)
      {
        if (this.listObj[objKeyArr[i]].uid === uid)
        {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
