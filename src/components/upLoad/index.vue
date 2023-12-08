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

