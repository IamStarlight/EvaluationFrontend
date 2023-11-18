<template>
  <div class="app-container">
    <div class='form'>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="作业号" width="100">
          <template slot-scope="scope">
            {{ scope.row.hid }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="作业名">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="发布人" width="100">
          {{ this.teacher }}
        </el-table-column>
        <el-table-column label="提交截止日期" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="created_at" label="提交作业" width="120">
          <template slot-scope="scope">
            <span>
              <el-button :type="'success'" plain
                @click="change(scope.row.hid, scope.row.tname, scope.row.date, scope.row.bool, scope.row.states)">提交
              </el-button>
            </span>
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="created_at" label="提交作业" width="120">
          <template slot-scope="scope">
            <span>
              <el-button
                :type="(scope.row.status == 'A') ? 'success' : (scope.row.status === 'B' || scope.row.status === 'D' ? 'warning' : 'info')"
                plain @click="change(scope.row.hid, scope.row.tname, scope.row.date, scope.row.bool, scope.row.status)">
                {{ scope.row.status === 'A' ? '提交' : (scope.row.status === 'B' || scope.row.status === 'D' ? '已提交' :
                  (scope.row.status == 'C' ? '未提交' : '不可提交')) }}
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="批阅任务" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.read }}
          </template>
        </el-table-column>
        <el-table-column label="成绩" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.score }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="申诉" width="120">
          <template slot-scope="scope">
            <span>
              <el-button :type="(scope.row.read == '是') ? 'success' : 'info'" plain
                @click="change1(scope.row.hid, scope.row.tname, scope.row.date, scope.row.read, scope.row.status)">
                {{ scope.row.read == '是' ? '申诉' : '不可申诉' }}
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="互评" width="120">
          <template slot-scope="scope">
            <span>
              <el-button plain
                @click="jump(scope.row.hid, scope.row.tname, scope.row.end_time, scope.row.bool, scope.row.status)">互评
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提交作业信息" :visible.sync="dialogVisible">
      <el-button type="info" @click="dialogVisible = false">关闭窗口</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getAllhomework } from '@/api/course'
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
      'homeworkid'
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
  data () {
    return {
      list: [{
        hid: "1",
        title: "第一次作业",
        end_time: currentTime,
        status: "A",//A是可以提交未提交,B是已经提交了,C是已截止未提交，D是截止提交了，E是不可以提交
        score: "11",//成绩
        read: "否",//是否批阅
        bool: "A",//A是可以完成未完成,B是已经完成,C是已截止未完成，D是截止完成了，E是不可以互评
      }],
      dialogVisible: false,
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '' // 添加searchKeyword属性
    }
  },
  created () {
    //this.fetchData()
  },

  methods: {
    fetchData () {
      this.listLoading = true
      const a = { sid: this.sid, cid: this.cid }
      getAllhomework(a).then(response => {
        this.list.title = response.data["title"]
        this.list.hid = response.data["wid"]
        this.list.end_time = response.data["endTime"]
        // this.list.status = response.data["status"]
        // this.list.score = response.data["title"]
        // this.list.read = response.data["title"]
        // this.list.bool = response.data["title"]
        this.listLoading = false
      })
    },

    change (hid, cname, tid, bool, states) {
      if (states == 'A')
      {
        this.$store.dispatch("course/setchangehomeworkid",
          hid
        );
        this.$router.push({ path: '/example/submit' })
        console.log(this.homeworkid)
      } else if (states == 'B')
      {
        this.$store.dispatch("course/setchangehomeworkid",
          hid
        );
        this.$router.push({ path: '/example/record' })
      } else if (states == 'D')
      {
        this.$store.dispatch("course/setchangehomeworkid",
          hid
        );
        this.dialogVisible = true
      }
    },
    change1 (hid, cname, tid, read, states) {
      if (read == "是")
      {
        this.$store.dispatch("course/setchangehomeworkid",
          hid
        );
        this.$router.push({ path: '/evaluation/index2' })
      } else
      {

      }
    },
    jump (hid, cname, tid, bool, states) {
      if (bool == "A")
      {
        this.$store.dispatch("course/setchangehomeworkid",
          hid
        );
        this.$router.push({ path: '/evaluation/index' })
      } else
      {

      }
    },

    search () {
      this.listLoading = true
      if (this.searchKeyword == "")
      {
        this.fetchData()
        return
      }
      getList(this.searchKeyword).then(response => {
        this.list = Array.from(response.data)
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
  /* transform: translate(50%, 50%); */
}

.lizi {
  position: absolute;
}
</style>
