<template>
  <div class="ada">
    <div class='form'>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column label="课程号">
          {{ this.cid }}
        </el-table-column>
        <el-table-column label="作业名">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="申诉结果" width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <span>
              <el-button type="primary" size="mini" plain @click="search(scope.row.wid)">查看详情
              </el-button>
              <el-button type="danger" size="mini" @click="cancle(scope.row.wid)">撤销申诉
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="申诉信息" :visible.sync="dialogVisible" style="width:auto">
      <div class="split-container">
        <div class="split-line"></div>
        <div class="content left-content">
          <div class="left-header">
            <h2>申诉理由</h2>
          </div>
          <div class="left-body">
            <VueMarkdown :source="reason" v-highlight></VueMarkdown>
          </div>
        </div>
        <div class="content right-content">
          <div class="left-header">
            <h2>教师反馈</h2>
          </div>
          <div class="left-body">
            <VueMarkdown :source="outcome" v-highlight></VueMarkdown>
          </div>
        </div>
      </div>
      <el-button type="info" @click="dialogVisible = false">关闭窗口</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getreason, getoutcome, getappeal, getcancle } from '@/api/course'
import VueMarkdown from 'vue-markdown'
import store from '@/store'
import vue from 'vue'
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
      'homeworkid',
      'exchangeid'
    ])
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    VueMarkdown, // 注入组件
  },
  data () {
    return {
      list: [],
      dialogVisible: false,
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '', // 添加searchKeyword属性
      reason: "ssss",
      outcome: "sssss",
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.listLoading = true
      const a = { cid: this.cid }
      getappeal(a).then(response => {
        this.list = Array.from(response.data)
      })
      this.listLoading = false
    },

    cancle (b) {
      const a = { sid: this.sid, cid: this.cid, wid: b }
      getcancle(a).then(response => {
        this.$message({
          message: '删除成功',
          type: 'sucess'
        })
      })
    },

    search (b) {

      const a = { sid: this.sid, cid: this.cid, wid: b }
      getreason(a).then(response => {
        this.reason = response.data[0]["appeal_reason"]
        this.outcome = response.data[0]["appeal_reply"]
      })
      // const c = { sid: this.sid, cid: this.cid, wid: b }
      // getoutcome(a).then(response => {
      //   this.outcome = response.data[0]["appeal_reason"]
      // })
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
  margin-top: 100px;
  width: 1100px;
  /* transform: translate(50%, 50%); */
}

.ada {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lizi {
  position: absolute;
}

.split-container {
  display: flex;
  align-items: stretch;
  /* Make children stretch vertically */
}

.left-content,
.right-content {
  flex: 1;
  /* Make both sides take equal width */
  padding: 20px;
  text-align: center;
}

.split-line {
  width: 1px;
  background-color: black;
  height: 100%;
  margin: 0 10px;
  /* Adjust the margin based on your design */
}

.left-header {
  margin-bottom: 10px;
}

.left-header h2 {
  font-size: 18px;
  margin: 0;
}

.left-body p {
  margin: 0;
}
</style>
