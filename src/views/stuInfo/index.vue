<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container">
        <el-input v-model="search" placeholder="输入学号搜索学生" style="width: 200px;"></el-input>
        <el-button type="primary" @click="searchStudent">搜索</el-button>
        <el-button @click="getList">取消筛选</el-button>
      </div>
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="学号" width="250px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="info" @click="detail(row.id)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchcourseList, } from '@/api/course'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'

export default {
  name: 'PersonTable',
  components: { Pagination },
  directives: { waves },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'cid',
      'cname',
      'teacher',
      'cintroduction'
    ])
  },
  data () {
    return {
      search: '', // 学号搜索框绑定值
      tableKey: 0,
      list: [{
        id: '',
        name: 'hyx',
        password: '2222',
        email: 'hjhjhj@hhh.com',
        permission: ''
      }],
      listQuery: {
        title: '',
        importance: ''
      },
      total: 0,
      listLoading: false,
      importanceOptions: [1, 2, 3],
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      downloadLoading: false
    }
  },
  created () {
    this.listLoading = true
    this.getList()
  },
  methods: {
    searchStudent() {
      const searchId = this.search.trim();
      if (!searchId) {
        this.getList(); // 若搜索框为空则恢复原表格数据
        return;
      }
      const filteredList = this.list.filter(item => item.id.toString() === searchId);
      this.list = filteredList;
    },
    getList () {
      this.listLoading = true
      const a = { cid: this.cid }
      fetchcourseList(a).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    detail(){

    },
    resetTemp () {
      this.temp = {
        name: '',
        password: '',
        email: '',
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handlereturn () {
      this.$router.push({ path: '/admin/cmanage' })
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp')
        {
          return parseTime(v[j])
        } else
        {
          return v[j]
        }
      }))
    },
  }
}
</script>
