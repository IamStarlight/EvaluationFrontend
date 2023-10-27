<template>
  <div class="app-container">
    <div class='form'>
      <el-form class="search-form" inline>
        <el-form-item label="课程搜索">
          <el-input v-model="searchKeyword" placeholder="输入课程名" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="课程号" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="课程名">
          <template slot-scope="scope">
            {{ scope.row.course }}
          </template>
        </el-table-column>
        <el-table-column label="任课老师" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.teacher }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程简介" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.introduction }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="进入课程" width="120">
          <template slot-scope="scope">
            <span><el-button type="primary" plain
                @click="change(scope.row.id, scope.row.course, scope.row.teacher, scope.row.introduction)">进入</el-button></span>
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
      list: [
        {
          id: '1',
          course: '实训1',
          teacher: '刘荧',
          introduction: '哈哈哈哈哈哈哈哈'
        },
        {
          id: '2',
          course: '实训2',
          teacher: '刘荧2',
          introduction: '哈哈哈哈哈哈哈哈2'
        }
      ],
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
      getAll(this.sid).then(response => {
        this.list = Array.from(response.data)
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },

    change (id, cname, teacher, intro) {
      if (this.roles == 3)
      {
        this.$store.dispatch("user/setchangerole",
          ['4']
        );
      } else
      {
        this.$store.dispatch("user/setchangerole",
          ['5']
        );

      }
      this.$store.dispatch("course/setchangeid",
        id
      );
      this.$store.dispatch("course/setchangecname",
        cname
      );
      this.$store.dispatch("course/setchangeteacher",
        teacher
      );
      this.$store.dispatch("course/setchangeintro",
        intro
      );
      this.$router.push({ path: '/cdash/show' })
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
