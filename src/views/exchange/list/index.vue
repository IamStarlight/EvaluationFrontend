<template>
  <div class="ada">
    <div class='form'>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="id" width="100">
          <template slot-scope="scope">
            {{ scope.row.sname }}
          </template>
        </el-table-column>
        <el-table-column label="发布人">
          {{ this.teacher }}
        </el-table-column>
        <el-table-column label="作业名">
          {{ this.homeworkname }}
        </el-table-column>
        <el-table-column label="互评截止日期" width="300" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.details }}</span>
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
              <el-button :type="(scope.row.is_eva == true) ? 'success' : 'info'" plain
                @click="change(scope.row.be_eva_sid, scope.row.status)">
                {{ scope.row.status === true ? '已批改' : '未批改' }}
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getmhomework, getmhomework1 } from '@/api/course'
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
      'exchangeid',
      'homeworkname'
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
      list: [
      ],
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '' // 添加searchKeyword属性
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.listLoading = true
      const a = { cid: this.cid, wid: this.homeworkid }
      getmhomework(a).then(response => {
        this.list = Array.from(response.data)
        console.log(this.list)
        let ada = ""
        getmhomework1(a).then(response => {
          ada = response.data
          console.log(ada)
          for (let i = 0; i < this.list.length; i++)
          {
            this.list[i]["details"] = ada
            this.list[i]["sname"] = i
            console.log(this.list)
          }
        })

        this.listLoading = false
      })
    },

    change (sid, status) {
      if (1)
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
