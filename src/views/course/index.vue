<template>
  <div class="body">
    <!-- <div class="image-container">
      <img src="../../assets/background/c1.png" alt="Your Image">
    </div> -->
    <!-- <div class="left-content"> -->
    <!-- <h1>{{ name }} , 欢迎进入课程</h1>
      <p>亲爱的学生，欢迎来到我们的课程列表页面！在这里，你将发现丰富多彩的学习机会，覆盖各种感兴趣的主题。</p>
    </div> -->
    <div class='ada'>
      <div class="left-content1">
        <!-- <el-card class="box-card-component" style="margin-left:8px;">
          <div slot="header" class="box-card-header">
            <img src="../../assets/background/aa.jpg">
          </div>
          <div style="position:relative;">
            <pan-thumb :image="avatar" class="panThumb" />
            <mallki class-name="mallki-text" text="" />
            <div style="padding-top:35px;" class="progress-item">
              <span>学习进度</span>
              <el-progress :percentage="70" />
            </div>
          </div>
        </el-card> -->
        <h1>l 互动提醒</h1>
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="toggleChildren(index)">
          <div class="item-name">
            <span>{{ item.name }}</span>
          </div>
          <div v-if="item.showChildren" class="children-item">
            <list :list="item.children"></list>
          </div>
        </div>
        <div class="list-item" v-for="(item, index) in list1" :key="index" @click="toggleChildren1(index)">
          <div class="item-name">
            <span>{{ item.name }}</span>
          </div>
          <div v-if="item.showChildren" class="children-item">
            <list :list="item.children"></list>
          </div>
        </div>
      </div>
      <div class='left-content2'>
        <h1>l 课程列表</h1>
        <div class='main'>
          <div class="courses_list">
            <el-row v-for="course in courses" :key="course.cid" class="course-item">
              <el-col :span="24" class="course-item-box">
                <el-row>
                  <!--              这里需要一个图片，模仿mis上面的-->
                  <el-col :span="12" class="course-item-left"><img src="../../assets/background/ada.png" alt=""
                      style="max-width: 400px; height:200px;"></el-col>
                  <el-col :span="12" class="course-item-right">
                    <div class="course-title">
                      <p class="box-title">{{ course.cname }}</p>
                    </div>
                    <div class="author">
                      <p class="box-author">{{ course.tname }}</p>
                      <!--                        <p class="lession">共xxx课时</p>-->
                    </div>
                    <el-row class="course-content">
                      <el-col :span="12"><i class="el-icon-caret-right"></i>课程简介：{{ course.content }}</el-col>
                    </el-row>
                    <div class="enter">
                      <el-button class="change" type="primary" plain
                        @click="change(course.cid, course.cname, course.tname, course.content)">进入
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getAll } from '@/api/course'
import store from '@/store'
import vue from 'vue'
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
import List from "@/components/List";

export default {
  components: { PanThumb, Mallki, List },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sid',
      'teacher'
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
        name: "您有两个未交作业",
        showChildren: false,
        children: [{
          name: "UI设计",
          showChildren: false,
        }, {
          name: "java程序设计",
          showChildren: false,
        }]
      }],
      list1: [{
        name: "您有两个课程通知",
        showChildren: false,
        children: [{
          name: "UI设计",
          showChildren: false,
        }, {
          name: "java程序设计",
          showChildren: false,
        }]
      }],
      courses: [],
      beg: true,
      listLoading: false,
      current_page: 1,
      filter_price: false,
      searchKeyword: '', // 添加searchKeyword属性
      number1: "1",
      number2: "1",
      number3: "1",
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    }
  },
  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.listLoading = true
      getAll().then(response => {
        this.courses = response.data
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },
    //获取未交作业的信息
    fetchhomenotice () {
      this.listLoading = true
      getAll().then(response => {
        this.courses = response.data
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },
    //获取课程通知的的信息
    fetchclassnotice () {
      this.listLoading = true
      getAll().then(response => {
        this.courses = response.data
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },

    fetchData1 () {
      this.listLoading = true
      getAllnotice().then(response => {
        this.courses = response.data
        console.log("Data" + this.list)
        this.listLoading = false
      })
    },

    change (cid, cname, tid, content) {
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
      console.log(tid)
      this.$store.dispatch("course/setchangeid",
        cid
      );
      this.$store.dispatch("course/setchangecname",
        cname
      );
      this.$store.dispatch("course/setchangeteacher",
        tid
      );
      console.log(this.teacher)
      this.$store.dispatch("course/setchangeintro",
        content
      );
      this.$router.push({ path: '/cdash/show' })
    },

    toggleChildren (index) {
      // 切换子项的显示状态
      this.$set(this.list, index, {
        ...this.list[index],
        showChildren: !this.list[index].showChildren,
      });
      console.log(this.list[index].showChildren)
    },
    toggleChildren1 (index) {
      // 切换子项的显示状态
      this.$set(this.list1, index, {
        ...this.list1[index],
        showChildren: !this.list1[index].showChildren,
      });
      console.log(this.list1[index].showChildren)
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

.ada {
  display: flex;
}

.left-content {
  padding: 20px;
  /* background-color: #c0f9b6; */
  background-color: white;
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
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

.left-content1 {
  min-width: 200px;
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

.form {
  position: relative;
  /* transform: translate(50%, 50%); */
}

.lizi {
  position: absolute;
}

.image-container {
  text-align: center;
  /* 图片居中 */
}

.image-container img {
  max-width: 100%;
  /* 图片宽度最大为父容器宽度 */
  width: 100%;
  height: 100px;
  /* 图片高度自适应 */
  margin-bottom: 20px;
}

.courses {
  padding-top: 80px;
}

.main {
  width: auto;
  height: 200px;
  margin: 0 auto;
  padding-top: 0px;
}

.main .filter {
  width: 100%;
  height: auto;
  margin-bottom: 35px;
  padding: 25px 0px 25px 0px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #f0f0f0;
}

.filter .el-col {
  text-align: center;
  padding: 6px 0px;
  line-height: 16px;
  margin-left: 14px;
  position: relative;
  transition: all .3s ease;
  cursor: pointer;
  color: #4a4a4a;
}

.filter-el-row1 {
  padding-bottom: 18px;
  margin-bottom: 17px;
}

.filter .filter-text {
  text-align: right;
  font-size: 16px;
  color: #888;
}

.filter .filter-text2 {}

.filter .filter-el-row1 .current {
  color: #ffc210;
  border: 1px solid #ffc210 !important;
  border-radius: 30px;
}

.filter .filter-el-row2 .current {
  color: #ffc210;
}

.filter-price {
  display: inline-block;
  vertical-align: middle;
}

.filter-price .up,
.filter-price .down {
  display: block;
  line-height: 8px;
  font-size: 13px;
  margin: -4px;
  color: #d8d8d8;
}

.current .filter-price .active {
  color: #ffc210;
}

.course-item {
  margin-bottom: 15px;
}

.course-item .course-item-box {
  padding: 10px 10px 10px 10px;
}

.course-item {
  box-shadow: 2px 3px 16px rgba(0, 0, 0, .1);
  transition: all .2s ease;
}

.course-item .course-item-left {
  width: 423px;
  height: 210px;
  margin-right: 10px;
}

.course-title {
  overflow: hidden;
  /* 在父元素中使用可以清除子元素的浮动影响 */
}

.course-title .box-title {
  font-size: 26px;
  color: #333333;
  float: left;
  margin-bottom: 0px;
}

.course-title .box-number {
  font-size: 14px;
  color: #9b9b9b;
  font-family: PingFangSC-Light;
  float: right;
  padding-top: 12px;
}

.course-item-right {
  width: 300px;
}

.author {
  font-size: 14px;
  color: #9b9b9b;
  margin-bottom: 0px;
  padding-bottom: 0px;
  overflow: hidden;
}

.author .box-author {
  float: left;
  margin-top: 10px
}

.author .lession {
  float: right;
}

.course-content .el-icon-caret-right {
  border: 1px solid #000;
  border-radius: 50%;
  margin-right: 6px;
}

.course-content .el-col {
  font-size: 14px;
  color: #666;
  width: 50%;
  margin-bottom: 15px;
  cursor: pointer;
}

.course-content .el-col:hover {
  color: #ffc210;
}

.course-content .el-col:hover .el-icon-caret-right,
.course-content .el-col:hover .free {
  border-color: #ffc210;
  color: #ffc210;
}

.hom-user {
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
}

.course-content .el-col .free {
  width: 34px;
  height: 20px;
  color: #fd7b4d;
  margin-left: 10px;
  border: 1px solid #fd7b4d;
  border-radius: 2px;
  text-align: center;
  font-size: 13px;
  white-space: nowrap;
}

.enter {
  overflow: hidden;
}

.enter .enter-left {
  float: left;
}

.enter .discount {
  padding: 6px 10px;
  display: inline-block;
  font-size: 16px;
  color: #fff;
  text-align: center;
  margin-right: 8px;
  background: #fa6240;
  border: 1px solid #fa6240;
  border-radius: 10px 0 10px 0;
}

.enter .enter-left {
  line-height: 22px;
}

.enter .count {
  font-size: 24px;
  color: #fa6240;
}

.enter .old_count {
  font-size: 14px;
  color: #9b9b9b;
  text-decoration: line-through;
  margin-left: 10px;
}

.enter .change {
  float: right;
  width: 120px;
  height: 38px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #fd7b4d;
  background: transparent;
  /* 透明 */
  color: #fa6240;
  cursor: pointer;
  transition: all .2s ease-in-out;
  /* css3新版本的样式中支持支持 jQuery里面的动画预设效果 */
  /* all表示当前元素的所有样式  .2s表示改变样式完成的时间  ease-in-out */
}

.enter .change:hover {
  color: #fff;
  background: #ffc210;
  border: 1px solid #ffc210;
}

.hom-container {
  padding: 20px;
  background-color: rgb(255, 255, 200);
  width: auto;
  max-height: 700px;
  /* 设置最大高度 */
  height: auto;
  /* 自适应高度 */
  /* 设置固定宽度 */
  margin: 0px auto 0;
  position: relative;
  /* 居中显示 */
  border-radius: 10px;
  margin-bottom: 20px;
}

.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 200px;
      height: 200px;
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

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.div {
  padding: 10px;
}

/* 列表项样式 */
.list-item {
  margin-bottom: 7px;
  cursor: pointer;
  margin-left: 10px;
  /* 添加手型光标，表示可点击 */
}

/* 项名称样式 */
.item-name {
  font-family: 'Arial', sans-serif;
  margin-bottom: 7px;
  font-size: 16px;

}

/* 子项样式 */
.children-item {
  font-family: 'Arial', sans-serif;
  margin-bottom: 7px;
  font-size: 10px;
  margin-left: 20px;
}
</style>
