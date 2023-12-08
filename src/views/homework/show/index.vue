<template>
  <div class="body">
    <div class="left-content1">
      <h1>{{ cname }}课</h1>
    </div>
    <div class='left-content2'>
      <h1> l 课程作业</h1>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="作业号" width="100">
          <template slot-scope="scope">
            {{ scope.row.wid }}
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
            <span>{{ scope.row.endTime }}</span>
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
                plain @click="change(scope.row.wid, scope.row.tname, scope.row.date, scope.row.bool, scope.row.status)">
                {{ scope.row.status === 'A' ? '提交' : (scope.row.status === 'B' || scope.row.status === 'D' ? '已提交' :
                  (scope.row.status == 'C' ? '未提交' : '未发布')) }}
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
            {{ scope.row.totalGrade }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="申诉" width="120">
          <template slot-scope="scope">
            <span>
              <el-button
                :type="(scope.row.read == '是' && scope.row.appeal == false) ? 'success' : (scope.row.read == '是') ? 'warning' : 'info'"
                plain @click="change1(scope.row.wid, scope.row.tname, scope.row.date, scope.row.read, scope.row.appeal)">
                {{ scope.row.read != '是' ? '不可申诉' : (scope.row.appeal == true ? '已申诉' : "申诉") }}
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="互评" width="120">
          <template slot-scope="scope">
            <span>
              <el-button
                :type="(scope.row.evaStatus == 'A') ? 'success' : (scope.row.evaStatus === 'B' || scope.row.evaStatus === 'D' ? 'warning' : 'info')"
                plain
                @click="jump(scope.row.wid, scope.row.title, scope.row.end_time, scope.row.evaStatus, scope.row.status)">
                {{
                  scope.row.evaStatus === 'A' ? '互评' : (scope.row.evaStatus === 'B' || scope.row.evaStatus === 'D' ?
                    '已完成' :
                    (scope.row.evaStatus == 'C' ? '未发布' : '已截止')) }}
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提交作业信息" :visible.sync="dialogVisible" :width="3000">
      <div class="split-container">
        <div class="split-line"></div>
        <div class="content left-content">
          <div class="left-header">
            <h2>作业内容</h2>
          </div>
          <div class="left-body">
            <VueMarkdown :source="this.now" v-highlight></VueMarkdown>
            <a :href="this.now1">{{ this.now1 }}</a>
          </div>
        </div>
        <div class="content right-content">
          <div class="left-header">
            <PieChart></PieChart>
            <h2>教师反馈</h2>
          </div>
          <div class="left-body">
            <VueMarkdown :source="comment" v-highlight></VueMarkdown>
          </div>
        </div>
      </div>
      <el-button type="info" @click="dialogVisible = false">关闭窗口</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getAllhomework, getdetailmy, getoutcome } from '@/api/course'
import store from '@/store'
import vue from 'vue'
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import PieChart from './components/PieChart'
const currentTime = parseTime(Date.now(), '{y}-{m}-{d} {h}:{i}')
export default {
  components: {
    PieChart,
    VueMarkdown,
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid',
      'cname',
      'teacher',
      'cid',
      'homeworkid',
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
      list: [{
        wid: "",
        title: "",
        endTime: currentTime,
        status: "B",//A是可以提交未提交,B是已经提交了,C是已截止未提交，D是截止提交了，E是不可以提交
        totalGrade: "11",//成绩
        read: "是",//是否批阅
        bool: "A",//A是可以完成未完成,B是已经完成,C是已截止未完成，D是截止完成了，E是不可以互评
        eva: "A",
      }],
      dialogVisible: false,
      beg: true,
      listLoading: false,
      i: 0,
      searchKeyword: '', // 添加searchKeyword属性
      now: "",
      now1: "",
      comment: ""
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.listLoading = true
      const a = { cid: this.cid }
      getAllhomework(a).then(response => {
        this.list = Array.from(response.data)
        for (let i = 0; i < this.list.length; i++)
        {
          if (this.list[i]["read"] == true) { this.list[i]["read"] = "是" }
          else { this.list[i]["read"] = "否" }

          if (this.list[i]["totalGrade"] == null) { this.list[i]["totalGrade"] = "\\" }
          if (this.list[i]["endTime"] == null) { this.list[i]["endTime"] = "\\" }


          if (this.list[i]["evaStatus"] == "已发布互评") { this.list[i]["evaStatus"] = "A" }
          else if (this.list[i]["evaStatus"] == "未发布互评") { this.list[i]["evaStatus"] = "C" }
          else if (this.list[i]["evaStatus"] == "互评已截止") { this.list[i]["evaStatus"] = "R" }


        }
        for (let i = 0; i < this.list.length; i++)
        {
          if (this.list[i]["status"] == "草稿") { this.list[i]["status"] = "E" }
          else if (this.list[i]["status"] == "已发布" && this.list[i]["submit"] == true) { this.list[i]["status"] = "B" }
          else if (this.list[i]["status"] == "已发布" && this.list[i]["submit"] == false) { this.list[i]["status"] = "A" }
          else if (this.list[i]["status"] == "已截止" && this.list[i]["submit"] == false) { this.list[i]["status"] = "C" }
          else if (this.list[i]["status"] == "已截止" && this.list[i]["submit"] == true) { this.list[i]["status"] = "D" }


        }

        // this.list.title = Array.from(response.data, ({ title }) => title)
        // this.list.hid = Array.from(response.data, ({ wid }) => wid)
        // this.list.end_time = Array.from(response.data, ({ endTime }) => endTime)
        // this.list.status = response.data["status"]
        // this.list.score = response.data["title"]
        // this.list.read = response.data["title"]
        // this.list.bool = response.data["title"]
        this.listLoading = false
      })
    },

    fetchData1 (b) {
      const a = { sid: this.sid, wid: b, cid: this.cid }
      getdetailmy(a).then(response => {
        //console.log(response.data["title"])
        this.now = response.data[0]["details"]
        this.now1 = response.data[0]["url"]
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
        const a = { sid: this.sid, wid: hid, cid: this.cid }
        getdetailmy(a).then(response => {
          //console.log(response.data["title"])
          this.now = response.data[0]["details"]
          this.now1 = response.data[0]["url"]
        })
        const b = { sid: this.sid, wid: hid, cid: this.cid }
        getoutcome(b).then(response => {
          //console.log(response.data["title"])
          this.comment = response.data[0]["details"]
        })
        this.dialogVisible = true

      }
    },
    change1 (hid, cname, tid, read, states) {
      if (read == "是" && states == false)
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

        this.$store.dispatch("course/setchangehomeworkname",
          cname
        );
        console.log(cname)
        console.log(this.homeworkname)
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
.body {
  justify-content: space-between;
  height: auto;
  background-color: rgb(211, 240, 203);
  /* 左右排列 */
}

.form {
  position: relative;
  /* transform: translate(50%, 50%); */
}

.lizi {
  position: absolute;
}

.split-container {
  display: flex;
  align-items: stretch;
  /* Make children stretch vertically */
}

.left-content,
.right-content {
  flex: 1;
  /* Make both sides take equal width */
  padding: 20px;
  text-align: center;
}

.left-content2 {
  padding: 20px;
  width: 90%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 40px;
  margin-right: 20px;
  margin-top: 20px;
  min-height: 720px;
  border-radius: 10px;
}

.split-line {
  width: 1px;
  background-color: black;
  height: 100%;
  margin: 0 10px;
  /* Adjust the margin based on your design */
}

.left-header {
  margin-bottom: 10px;
  text-align: left;
}

.left-header h2 {
  font-size: 18px;
  margin: 0;
  text-align: left;
}

.left-body p {
  margin: 0;

}

.left-body a {
  margin: 0;

}

h1 {
  /* 设置字体样式为 Arial，如果 Arial 不可用，则使用 sans-serif 作为备用字体 */
  font-family: 'Arial', sans-serif;
  /* 设置字体大小为 24 像素 */
  font-size: 24px;
  /* 设置字体颜色为蓝色 */
  color: black;
}

.left-content1 {
  padding: 20px;
  /* background-color: #c0f9b6; */
  background-color: rgb(253, 248, 166);
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
