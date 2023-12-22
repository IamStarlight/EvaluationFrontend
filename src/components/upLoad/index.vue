<template>
  <el-dialog title="附件上传" :visible.sync="visible" width="800px" :close-on-click-modal="false" @close="cancel">
    <div class="upload-file">
      <el-upload
        :action="action"
        :before-upload="handleBeforeUpload"
        :file-list="fileList"
        :limit="3"
        multiple
        :accept="accept"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :on-change="handChange"
        :show-file-list="true"
        :auto-upload="false"
        class="upload-file-uploader"
        ref="upload"
      >
        <!-- 上传按钮 -->
        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" :disabled="fileList.length < 1" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <!-- 上传提示 -->
        <div class="el-upload__tip" slot="tip" v-if="showTip">
          请上传
          <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
          <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
          的文件
        </div>
      </el-upload>

      <!-- 文件列表 -->
      <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
        <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in list">
          <el-link :href="file.url" :underline="false" target="_blank">
            <span class="el-icon-document"> {{ getFileName(file.name) }} </span>
          </el-link>
          <div class="ele-upload-list__item-content-action">
            <el-link :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>
          </div>
        </li>
      </transition-group>
    </div>
  </el-dialog>
</template>


<script>
export default {
  data() {
    return {
      // 已选择文件列表
      fileList: [],
      // 是否显示文件上传弹窗
      visible: false,
      // 可上传的文件类型
      accept: '',
      action: 'action'
    };
  },
  props: {
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 2,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => [".jpg", ".jpeg", ".png", ".doc", ".xls", ".xlsx", ".ppt", ".txt", ".pdf"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 单据id
    billId: {
      type: Number,
      require: true
    },
    // 单据类型
    billType: {
      type: Number,
      required: true
    }
  },
  created() {
    this.fileList = this.list
    // 拼接
    this.fileType.forEach(el => {
      this.accept += el
      this.accept += ','
    })
    this.fileType.slice(0, this.fileList.length - 2)
  },
  methods: {
    // 外部调用这个方法，显示文件上传弹窗
    show() {
      this.visible = true
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf("."));
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`只允许上传3个文件`);
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error("上传失败, 请重试");
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      this.$message.success("上传成功");
      this.cancel()
    },
    /** 文件状态改变时调用 */
    handChange(file, fileList) {
      this.fileList = fileList
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
    },
    // 获取文件名称
    getFileName(name) {
      if (name.lastIndexOf("/") > -1) {
        return name.slice(name.lastIndexOf("/") + 1).toLowerCase();
      } else {
        return "";
      }
    },
    /** 手动提交上传 */
    submitUpload() {
      if (this.fileList.length <= 0) {
        this.msgError('请选择文件上传')
        return false
      }
      const formData = new FormData()
      formData.append("billId", this.billId)
      formData.append("formType", this.billType)
      // 把多个文件放到同一个请求里，这样只会请求一次接口。否则一个文件就会请求一次
      this.fileList.forEach(el => {
        formData.append('file', el.raw)
      })

      uploadFormFile(formData).then(res => {
        if(res.code === 200){
          this.$refs.upload.clearFiles()
          this.msgSuccess("上传成功")
          this.$emit("input", res.data)
        }
      }).catch((err)=>{})
    },
    /** 关闭上传弹框 */
    cancel() {
      this.fileList = []
      this.visible = false
    }
  }

}

</script>
