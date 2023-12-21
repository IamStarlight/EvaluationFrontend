<template>
  <div class="body">
    <div class="ada">
      <div class="left-content1">
        <h1>l 互动提醒</h1>
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="toggleChildren(index)">
          <div class="item-name">
            <span>{{ item.name }}</span>
          </div>
          <div v-if="item.showChildren" class="children-item">
            <list :list="item.children"></list>
          </div>
        </div>
      </div>
      <!--      filter换成搜索功能-->
      <!--      <div class="filter">-->
      <!--        <el-form class="search-form" inline>-->
      <!--          <el-form-item label="课程搜索">-->
      <!--            <el-input v-model="searchKeyword" placeholder="输入课程名" style="width: 300px;"></el-input>-->
      <!--          </el-form-item>-->
      <!--          <el-form-item>-->
      <!--            <el-button type="primary" @click="search">搜索</el-button>-->
      <!--          </el-form-item>-->
      <!--        </el-form>-->
      <!--      </div>-->
      <!--      <div class="info_list">-->
      <!--        <h1>TODO</h1>-->
      <!--        <el-card class="box-card" style="height: 100%">-->
      <!--          <p class="box-author">您有{{1}}个作业待发布</p>-->
      <!--          <p class="box-author">您有{{ 2 }}份作业待批改</p>-->
      <!--          <p class="box-author">您有{{3 }}个申诉待处理</p>-->
      <!--        </el-card>-->

      <!--      </div>-->
      <!--      以下是课程列表-->
      <div class="left-content2">
        <h1>l 课程列表</h1>
        <el-row v-for="course in courses" :key="course.cid" class="course-item">
          <el-col :span="24" class="course-item-box">
            <el-row>
              <!-- x-number">有{{course.class_number}}位学生已加入课程</p>
                        </div>
                       <div class="author">
                          <p class="box-             这里需要一个图片，模仿mis上面的-->
              <el-col :span="12" class="course-item-left"><img src="../../assets/course/img.png" alt=""></el-col>
              <el-col :span="12" class="course-item-right">
                <div class="course-title">
                  <p class="box-title">{{ course.cname }}</p>
                  <p class="boauthor">{{ course.name }}</p>
                  <!--                        <p class="lession">共xxx课时</p>-->
                </div>
                <el-row class="course-content">
                  <el-col :span="12"><i class="el-icon-caret-right"></i>课程简介：{{ course.content }}</el-col>
                </el-row>
                <div class="enter">
                  <el-button class="change" type="primary" plain
                    @click="change(course.cid, course.cname, course.name, course.content)">进入
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import { getTList } from "@/api/Tcourse";
import { mapGetters } from 'vuex'

export default {
  name: "Courses",
  data () {
    return {
      list: [{
        name: "",
        showChildren: false,
        children: []
      }],
      momo: [],
      // courses:[{
      //   cid:'1',
      //   cname:'数据结构',
      //   name:'lsy',
      //   content:'123123'
      // }],
      courses: [],
      listLoading: true,
      current_page: 1,
      filter_price: false,
      searchKeyword: ''
    }
  },
  components: {
  },
  created () {
    this.fetchData();
  },
  mounted () {
    // this.getList();
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  methods: {
    //获取处理申诉的信息
    fetchhomenotice () {
      //接口改一下就好
      gethomenotice().then(response => {
        this.momo = response.data
        console.log(new Set(this.momo).size)
        let number = 0
        for (let i = 0; i < new Set(this.momo).size; i++)
        {
          number = this.momo[i].cnt + number
          this.list[0].children.push({ name: this.momo[i].cname + "---" + "有" + number + "个未交作业", showChildren: false });
        }
        this.list[0].name = "您有" + new Set(this.momo).size + "个未交作业"//获取有未交作业的课程的数量
      })
    },
    toggleChildren (index) {

      if (index === 0)
      {
        console.log(this.list)
        this.$set(this.list, index, {
          ...this.list[index],
          showChildren: !this.list[index].showChildren,
        });
      } else if (index > 0 && index - 1 < this.momo.length)
      {
        const cid = this.momo[index - 1].cid;
        const resultArray = this.courses.filter(item => item.cid === cid);
        console.log("在");
        console.log(resultArray);
      } else
      {
        console.warn("Invalid index:", index);
      }

    },
    fetchData () {
      this.listLoading = true
      getTList().then(response => {
        this.courses = response.data
        console.log(response.data.cid)
        this.listLoading = false
      })
    },

    change (cid, cname, name, content) {
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
        cid
      );
      this.$store.dispatch("course/setchangecname",
        cname
      );
      // this.$store.dispatch("course/setchangecname",
      //   student
      // );
      this.$store.dispatch("course/setchangeteacher",
        name
      );
      this.$store.dispatch("course/setchangeintro",
        content
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
      getTList(this.searchKeyword).then(response => {
        this.courses = Array.from(response.data)
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
  background-color: rgb(243, 246, 243);
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
