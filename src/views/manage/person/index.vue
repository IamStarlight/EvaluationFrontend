<template>
  <div class="app-container">
    <div class="filter-container">
<!--      <el-input v-model="listQuery.title" placeholder="学号" style="width: 200px;" class="filter-item"-->
<!--        @keyup.enter.native="handleFilter" />-->
      <el-select v-model="listQuery.importance" placeholder="等级" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
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
      <el-table-column label="职位" width="80px">
        <template>
          <span>{{ this.nowpermission }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handlepassword(row)">
            Reset
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="职位" prop="permission">
          <el-select v-model="temp.permission" class="filter-item" placeholder="Please select">
            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
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


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
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
import { fetchList, fetchListpermission, fetchListid, fetchListall, createinfo, updateinfo, deleteinfo, reset } from '@/api/user'
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PersonTable',
  components: { Pagination },
  directives: { waves },
  data () {
    return {
      tableKey: 0,
      list: [{
        id: '',
        name: 'hyx',
        password: '2222',
        email: 'hjhjhj@hhh.com'
      }],
      listQuery: {
        title: '',
        importance: ''
      },
      total: 0,
      listLoading: false,
      importanceOptions: [1, 2, 3],
      nowpermission: '3',
      temp: {
        id: '',
        name: 'hyx',
        password: '2222',
        email: 'hjhjhj@hhh.com',
        permission: ''
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
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
        email: [{ required: true, message: '需要输入邮箱', trigger: 'change' },
        { pattern: "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", message: '邮箱格式错误', trigger: 'blur' }],
      },
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid'
    ]),
  },
  created () {
    this.listLoading = true
    this.getList()
  },
  methods: {
    changeType (a) {
      if (typeof a === 'object')
      {
        const b = [a]
      } else
      {

      }
      return b
    },
    getList () {
      this.listLoading = true
      const a = { permission: this.nowpermission }
      fetchList(a).then(response => {
        if (1 == 2)
        {
          console.log("aaaa")
          this.list = [response.data]
        } else if (response.data == null)
        {
          this.list = ''
        } else
        {
          this.list = response.data
        }
        console.log(this.list)
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
      if (this.listQuery.importance === '' && this.listQuery.title === '')
      {

      } else if (this.listQuery.importance != '' && this.listQuery.title === '')
      {
        //按等级搜索
        if (this.listQuery.importance != '1' || this.listQuery.importance != '2' || this.listQuery.importance != '3')
        {
          this.nowpermission = this.listQuery.importance
        }
        this.listLoading = true
        const a = { permission: this.listQuery.importance }
        fetchList(a).then(response => {
          if (1 == 2)
          {
            this.list = [response.data]
          } else if (response.data == null)
          {
            this.list = ''
          } else
          {
            this.list = response.data
          }
          console.log(this.list)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.importance === '' && this.listQuery.title != '')
      {
        //按学号搜索
        //console.log(this.listQuery.title)
        this.listLoading = true
        const a = { id: this.listQuery.title, permission: "" }
        fetchListid(a).then(response => {
          if (typeof response.data === 'object')
          {
            this.list = [response.data]
          } else
          {
            this.list = response.data
          }
          if (response.data.permission == 'ROLE_ADMIN')
          {
            this.nowpermission = '1'
          } else if (response.data.permission == 'ROLE_TEACHER')
          {
            this.nowpermission = '2'
          } else
          {
            this.nowpermission = '3'
          }
          console.log(response.data)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })

      } else
      {
        //两个一起搜索
        this.listLoading = true
        if (this.listQuery.importance != '1' || this.listQuery.importance != '2' || this.listQuery.importance != '3')
        {
          this.nowpermission = this.listQuery.importance
        }
        const a = { id: this.listQuery.title, permission: this.listQuery.importance }
        fetchListall(a).then(response => {
          if (typeof response.data === 'object')
          {
            this.list = [response.data]
          } else if (response.data == null)
          {
            this.list = ''
          } else
          {
            this.list = response.data
          }
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
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid)
        {
          console.log(this.temp)
          this.temp.password = "123"
          createinfo(this.temp).then(() => {
            // this.list.unshift(this.temp)
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
      this.dialogStatus = 'update'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid)
        {
          console.log(this.temp)
          const a = { id: this.temp.id, name: this.temp.name, permission: this.nowpermission, email: this.temp.email }
          updateinfo(a).then(() => {
            this.dialogFormVisible1 = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
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
      const a = parseInt(this.temp.id)
      const b = { id: a, permission: this.nowpermission }
      // if (this.temp.id == this.sid){

      // }else{
      deleteinfo(b).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.listLoading = true
        this.getList()
      })

    },
    handlepassword (row, index) {
      this.temp = Object.assign({}, row)
      console.log(typeof parseInt(this.temp.id))
      const b = { id: parseInt(this.temp.id), newpwd: "123" }
      reset(b).then(() => {
        this.$notify({
          title: 'Success',
          message: 'reset Successfully',
          type: 'success',
          duration: 2000
        })
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
