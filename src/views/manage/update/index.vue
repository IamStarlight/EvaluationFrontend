<template>
  <div class="app-container">
    <div class="left-content">
      <div class="dashboard-text">课程资料</div>
      <div class="dashboard-text">课程号: {{ cid }}</div>
      <div class="dashboard-text">课程名: {{ cname }}</div>
      <div class="dashboard-text">课程简介 : {{ cintroduction }}</div>
    </div>
    <div class="filter-container">
      <!--      <el-input v-model="listQuery.title" placeholder="学号" style="width: 200px;" class="filter-item"-->
      <!--        @keyup.enter.native="handleFilter" />-->
      <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button> -->
      <div class="left-content1">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handleCreate">
          Add
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
          @click="handlereturn">
          返回课程列表
        </el-button>
      </div>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
        @click="handleDownload">
        Export
      </el-button> -->
    </div>
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="学号" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="学号" prop="id">
          <el-input v-model="temp.id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchcourseList, createcourseinfo, deletecourseinfo } from '@/api/course'
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
      temp: {
        id: '',
        name: 'hyx',
        password: '2222',
        email: 'hjhjhj@hhh.com',
        permission: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      rules: {
        permission: [{ required: true, message: '需要选择职位', trigger: 'change' }],
        name: [{ required: true, message: '需要输入姓名', trigger: 'change' }],
        id: [{ required: true, message: '需要输入学号', trigger: 'blur' },
        { min: 8, max: 8, message: "需要8位字符", trigger: "change" }],
        password: [{ required: true, message: '需要输入密码', trigger: 'blur' },
        ],
        email: [{ required: false, message: '需要输入邮箱', trigger: 'change' },
        { pattern: "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", message: '邮箱格式错误', trigger: 'blur' }],
      },
      downloadLoading: false
    }
  },
  created () {
    this.listLoading = true
    this.getList()
  },
  methods: {
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
    handleModifyStatus (row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleFilter () {
      if (this.listQuery.title === '')
      {

      } else
      {
        //按等级搜索
        this.listLoading = true
        fetchList(this.listQuery.title).then(response => {
          this.list = response.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
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
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid)
        {
          // this.temp = Object.assign({}, row)
          const a = parseInt(this.temp.id)
          const b = { sid: a, cid: this.cid }
          createcourseinfo(b).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
          this.listLoading = true
          setTimeout(() => {
            this.getList();
          }, 1000);
        }
      })
    },
    handleDelete (row, index) {
      this.temp = Object.assign({}, row)
      const a = this.temp.id
      const b = { sid: a, cid: this.cid }
      deletecourseinfo(b).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.listLoading = true
        setTimeout(() => {
          this.getList();
        }, 100);
      })
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
<style>
.dashboard-text {
  font-family: "Your Desired Font", sans-serif;
  /* 替换 "Your Desired Font" 为您选择的字体名称 */
  font-size: 16px;
  /* 替换为您希望的字体大小 */
  font-weight: bold;
  /* 替换为您希望的字体粗细 */
  color: #333;
  /* 替换为您希望的字体颜色 */
  margin-bottom: 10px;
  /* 可选，根据需要设置底部边距 */
}

.left-content {
  padding: 20px;
  /* background-color: #c0f9b6; */
  background-color: rgb(231, 231, 228);
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;

  width: 50%;
}

.left-content1 {
  padding: 20px;

}
</style>