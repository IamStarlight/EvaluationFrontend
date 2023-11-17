<template>
  <div class="ada">
    <div class='form'>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="id" width="100">
          <template slot-scope="scope">
            {{ scope.row.hid }}
          </template>
        </el-table-column>
        <el-table-column label="发布人">
          {{ this.teacher }}
        </el-table-column>
        <el-table-column label="作业名">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="互评截止日期" width="300" align="center">
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
        <el-table-column align="center" prop="created_at" label="互评作业" width="200">
          <template slot-scope="scope">
            <span>
              <el-button
                :type="(scope.row.status == 'A') ? 'success' : (scope.row.status === 'B' ? (scope.row.bool === 'T' ? 'warning' : 'info') : 'info')"
                plain @click="change(scope.row.sid, scope.row.status)">
                {{ scope.row.status === 'A' ? '批改' : (scope.row.status === 'B' ? '已批改' : '未批改') }}
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getmhomework } from '@/api/course'
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
  data () {
    return {
      list: [{
        hid: "1",//学生的作业号
        title: "第一次作业",//该作业名
        end_time: currentTime,//该作业的截止日期
        status: "A",//A是批改，B是已批改
        sid: "21212121"
      }],
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
      const a = { sid: this.sid, cid: this.cid, wid: this.homeworkid }
      getmhomework(a).then(response => {
        this.list.title = response.data["title"]
        this.list.hid = response.data["wid"]
        this.list.end_time = response.data["endTime"]
        this.list.sid = response.data["sid"]
        this.listLoading = false
      })
    },

    change (sid, status) {
      if (status == "A")
      {
        this.$store.dispatch("course/setchangeexchangeid",
          sid
        );
        this.$router.push({ path: '/evaluation/index1' })
        console.log(this.exchangeid)
      } else
      {
        console.log("no in")
      }
    },
    // jump (hid, cname, tid, bool, states) {
    //   if (bool == "T")
    //   {
    //     this.$store.dispatch("course/sethomeworkid",
    //       hid
    //     );
    //     this.$router.push({ path: '/evaluation/index' })
    //   } else
    //   {

    //   }
    // },

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
</style>
