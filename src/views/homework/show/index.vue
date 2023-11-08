<template>
  <div class="app-container">
    <div class='form'>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="作业名" width="500">
          <template slot-scope="scope">
            {{ scope.row.hid }}
          </template>
        </el-table-column>
        <el-table-column label="发布人">
          <template slot-scope="scope">
            {{ scope.row.tname }}
          </template>
        </el-table-column>
        <el-table-column label="提交截止日期" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="提交作业" width="120">
          <template slot-scope="scope">
            <span>
              <el-button
                :type="scope.row.states === 'A' ? 'success' : (scope.row.states === 'B' ? (scope.row.bool === 'T' ? 'warning' : 'info') : 'info')"
                plain @click="change(scope.row.hid, scope.row.tname, scope.row.date, scope.row.bool, scope.row.states)">
                {{ scope.row.states === 'A' ? '提交' : (scope.row.states === 'B' ? '已提交' : '未提交') }}
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
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, getAll } from '@/api/course'
import store from '@/store'
import vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid'
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
        tname: "ada",
        date: "12.2.2",
        states: "A",
        score: "11",
        bool: "B",
        read: "T"
      }],
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '' // 添加searchKeyword属性
    }
  },
  created () {
    // this.fetchData()
  },

  methods: {
    fetchData () {
      this.listLoading = true
      getAll().then(response => {
        this.list = Array.from(response.data)
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },

    change (cid, cname, tid, bool, states) {
      if (states == "A")
      {
        this.$router.push({ path: '/example/submit' })
      } else if (states == 'B' && bool == "T")
      {
        this.$router.push({ path: '/example/submit' })
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
