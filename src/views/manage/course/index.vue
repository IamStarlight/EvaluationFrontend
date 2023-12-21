<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="课程号" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
        @click="handleDownload">
        Export
      </el-button> -->
    </div>
    <div class='left-content2'>
      <h1> l 课程管理</h1>
      <el-table :key="tableKey" v-loading="listLoading" :data="pagedList" border fit highlight-current-row
        style="width: 100%;">
        <el-table-column label="课程号" width="110px">
          <template slot-scope="{row}">
            <span class="link-type" @click="handleUpdate(row)">{{ row.cid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名" width="300px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任课老师" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.tname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程简介" align="center">
          <template slot-scope="{row}">
            <span>{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学生数目" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.class_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="custom-pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize" :total="total" layout="sizes, prev, pager, next, jumper">
          <!-- 自定义每页显示大小样式 -->
          <span slot="sizes" class="custom-sizes">
            每页显示：
            <el-select v-model="pageSize" @change="handleSizeChange">
              <el-option label="10" value="10"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="50" value="50"></el-option>
              <el-option label="100" value="100"></el-option>
            </el-select>
          </span>
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="课程名" prop="cname">
          <el-input v-model="temp.cname" />
        </el-form-item>
        <el-form-item label="老师" prop="tid">
          <el-input v-model="temp.tid" />
        </el-form-item>
        <el-form-item label="课程简介" prop="content">
          <el-input v-model="temp.content" />
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
import { fetchList, fetchListid, createinfo, updateinfo, deleteinfo } from '@/api/course'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PersonTable',
  components: { Pagination },
  directives: { waves },
  data () {
    return {
      pagedList: [], // 当前页显示的数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条目数
      total: 0, // 总条目数
      tableKey: 0,
      list: [{
        cid: '12345',
        cname: '22',
        tid: '2222',
        tname: '',
        content: '222',
        class_number: ''
      }],
      listQuery: {
        title: '',
        importance: ''
      },
      total: 0,
      listLoading: false,
      importanceOptions: [1, 2, 3],
      temp: {
        cname: '22',
        tid: '2222',
        content: '222',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        cname: [{ required: true, message: '需要输入课程名', trigger: 'change' }],
        cid: [{ required: true, message: '需要输入课程号', trigger: 'blur' }],
        tid: [{ required: true, message: '需要输入任课老师', trigger: 'blur' },
        ],
        content: [{ required: false, message: '需要输入邮箱', trigger: 'change' }],
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
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
      fetchList().then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        this.total = this.list.length;
        this.handleCurrentChange(this.currentPage);
      })
    },
    handleCurrentChange (val) {
      // 用户改变当前页码时触发的方法
      this.currentPage = val;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedList = this.list.slice(startIndex, endIndex > this.list.length ? this.list.length : endIndex);
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
        //按课程号搜索
        this.listLoading = true
        const a = { cid: this.listQuery.title }
        fetchListid(a).then(response => {
          this.list = response.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
          this.total = this.list.length;
          this.handleCurrentChange(this.currentPage);
        })
      }
    },
    resetTemp () {
      this.temp = {
        cname: '',
        tid: '',
        content: '',
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
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid)
        {
          console.log(this.temp)
          createinfo(this.temp).then(() => {
            this.list.unshift(this.temp)
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
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp.cid)
      this.$store.dispatch("course/setchangeid",
        this.temp.cid
      );
      this.$store.dispatch("course/setchangecname",
        this.temp.cname
      );
      this.$store.dispatch("course/setchangeteacher",
        this.temp.tid
      );
      this.$store.dispatch("course/setchangeintro",
        this.temp.content
      );
      this.$router.push({ path: '/admin/update' })
    },
    handleDelete (row, index) {
      this.temp = Object.assign({}, row)
      const a = { cid: this.temp.cid }
      deleteinfo(this.temp).then(() => {
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
.custom-pagination {
  margin-top: 20px;
  text-align: center;
}

.custom-pagination .el-pagination {
  display: inline-block;
}

.custom-pagination .el-pagination .el-pagination-button {
  border-color: #409EFF;
  color: #409EFF;
}

.custom-pagination .el-pagination .el-pagination-button.is-current {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #fff;
}

/* 自定义每页显示大小样式 */
.custom-sizes {
  margin-right: 10px;
}

.left-content2 {
  padding: 20px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  min-height: 720px;
  border-radius: 10px;
}

h1 {
  /* 设置字体样式为 Arial，如果 Arial 不可用，则使用 sans-serif 作为备用字体 */
  font-family: 'Arial', sans-serif;
  /* 设置字体大小为 24 像素 */
  font-size: 24px;
  /* 设置字体颜色为蓝色 */
  color: black;
}
</style>
