<template>
  <div class="ada">
    <div class="left-content1">
      <div class="left-content">
        <h1> l 互评准则</h1>
        <h1 class='hom-user'>公平公正，一丝不苟</h1>
      </div>
      <el-card class="box-card-component" style="margin-left:8px;">
        <!-- <div slot="header" class="box-card-header">
          <img src="../../../assets/background/aa.jpg">
        </div> -->
        <div style="position:relative;">
          <!-- <pan-thumb :image="avatar" class="panThumb" /> -->
          <mallki class-name="mallki-text" :text="name" />
          <div style="padding-top:35px;" class="progress-item">
            <span>互评进度</span>
            <el-progress :percentage=this.percentage />
          </div>
        </div>
      </el-card>
    </div>
    <div class='left-content2'>
      <div class='form'>
        <h1> l 互评列表</h1>
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
                  @click="change(scope.row.be_eva_sid, scope.row.is_eva)">
                  {{ scope.row.is_eva == true ? '已批改' : '未批改' }}
                </el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getmhomework, getmhomework1 } from '@/api/course'
import store from '@/store'
import vue from 'vue'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
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
  components: { PanThumb, Mallki },
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
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '', // 添加searchKeyword属性
      percentage: 70
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
        let all1 = this.list.length
        console.log(all1)
        let count = 0
        for (let i = 0; i < this.list.length; i++)
        {

          if (this.list[i]["is_eva"] == true)
          {
            count = count + 1
            console.log(count)
          }



        }
        this.percentage = count / all1 * 100

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
  /* transform: translate(50%, 50%); */
}

h1 {
  /* 设置字体样式为 Arial，如果 Arial 不可用，则使用 sans-serif 作为备用字体 */
  font-family: 'Arial', sans-serif;
  /* 设置字体大小为 24 像素 */
  font-size: 24px;
  /* 设置字体颜色为蓝色 */
  color: black;
}

.ada {
  display: flex;
  height: 100%;
  /* justify-content: center;
  align-items: center; */
}

.lizi {
  position: absolute;
}

.hom-user {
  font-size: 20px;
  color: #888;
  margin-bottom: 10px;
}

.left-content {
  min-width: 200px;
  padding: 10px;
  background-color: white;

}

.left-content1 {
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 10px;
}

.left-content2 {
  padding: 20px;
  width: 80%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  min-height: 720px;
  border-radius: 10px;
}

.left-content3 {
  padding: 20px;
  background-color: rgb(198, 222, 243);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 10px;
}

.left-content4 {
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 10px;
}


.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;

    ::v-deep .pan-info {
      box-shadow: none !important;
    }
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
