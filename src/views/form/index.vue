<template>
  <div class="courses">
    <div class="main">
<!--      filter换成搜索功能-->
      <div class="filter">
        <el-form class="search-form" inline>
          <el-form-item label="课程搜索">
            <el-input v-model="searchKeyword" placeholder="输入课程名" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

<!--      以下是课程列表-->

      <div class="courses_list">
        <el-row v-for="course in courses" :key="course.id" class="course-item">
          <el-col :span="24" class="course-item-box">
             <el-row>
            <!--              这里需要一个图片，模仿mis上面的-->
                <el-col :span="12" class="course-item-left"><img src="src/assets/course.png" alt=""></el-col>
                   <el-col :span="12" class="course-item-right">
                      <div class="course-title">
                         <p class="box-title">{{ course.name }}</p>
                         <p class="box-number">有{{course.students}}位学生已加入课程</p>
                      </div>
                     <div class="author">
                        <p class="box-author">{{course.teacher}}</p>
<!--                        <p class="lession">共xxx课时</p>-->
                    </div>
                    <el-row class="course-content">
                         <el-col :span="12"><i class="el-icon-caret-right"></i>课程简介：{{course.content}}</el-col>
                    </el-row>
                    <div class="enter">
                      <el-button class="change" type="primary" plain
                                 @click="change(course.id, course.name,course.students,course.teacher, course.content)">进入
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
import {getList} from "@/api/Tcourse";
import { mapGetters } from 'vuex'

export default {
  name:"Courses",
  data(){
    return {
      courses: null,
      listLoading: true,
      current_page:1,
      filter_price:false,
      searchKeyword: ''
    }
  },
  components:{
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // this.getList();
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  methods:{
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.courses = response.data.items
        this.listLoading = false
      })
    },

    change (id, name,student,teacher,content) {
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
        name
      );
      this.$store.dispatch("course/setchangecname",
        student
      );
      this.$store.dispatch("course/setchangeteacher",
        teacher
      );
      this.$store.dispatch("course/setchangeintro",
        content
      );
      // this.$router.push({ path: '/cdash/show' })
    },

    search () {
      this.listLoading = true
      if (this.searchKeyword == "")
      {
        this.fetchData()
        return
      }
      getList(this.searchKeyword).then(response => {
        this.courses = Array.from(response.data.items)
        this.listLoading = false
      })
     }
  }
}
</script>


<style scoped>
.courses{
  padding-top: 80px;
}
.main{
  width: 1100px;
  height: auto;
  margin: 0 auto;
  padding-top: 35px;
}
.main .filter{
  width: 100%;
  height: auto;
  margin-bottom: 35px;
  padding: 25px 0px 25px 0px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #f0f0f0;
}
.filter .el-col{
  text-align: center;
  padding: 6px 0px;
  line-height: 16px;
  margin-left: 14px;
  position: relative;
  transition: all .3s ease;
  cursor: pointer;
  color: #4a4a4a;
}
.filter-el-row1{
  padding-bottom: 18px;
  margin-bottom: 17px;
}
.filter .filter-text{
  text-align: right;
  font-size: 16px;
  color: #888;
}
.filter .filter-text2{
}
.filter .filter-el-row1 .current{
  color: #ffc210;
  border: 1px solid #ffc210!important;
  border-radius: 30px;
}
.filter .filter-el-row2 .current{
  color: #ffc210;
}
.filter-price{
  display:inline-block;
  vertical-align: middle;
}
.filter-price .up, .filter-price .down{
  display: block;
  line-height: 8px;
  font-size: 13px;
  margin: -4px;
  color: #d8d8d8;
}
.current .filter-price .active{
  color: #ffc210;
}
.course-item{
  margin-bottom: 35px;
}
.course-item .course-item-box{
  padding: 20px 30px 20px 20px;
}
.course-item{
  box-shadow: 2px 3px 16px rgba(0,0,0,.1);
  transition: all .2s ease;
}
.course-item .course-item-left{
  width: 423px;
  height: 210px;
  margin-right: 30px;
}
.course-title{
  overflow: hidden;/* 在父元素中使用可以清除子元素的浮动影响 */
}
.course-title .box-title{
  font-size: 26px;
  color: #333333;
  float: left;
  margin-bottom: 8px;
}
.course-title .box-number{
  font-size: 14px;
  color: #9b9b9b;
  font-family: PingFangSC-Light;
  float: right;
  padding-top: 12px;
}
.course-item-right{
  width: 56.6%;
}
.author{
  font-size: 14px;
  color: #9b9b9b;
  margin-bottom: 14px;
  padding-bottom: 14px;
  overflow: hidden;
}
.author .box-author{
  float:left;
}
.author .lession{
  float: right;
}
.course-content .el-icon-caret-right{
  border: 1px solid #000;
  border-radius: 50%;
  margin-right: 6px;
}
.course-content .el-col{
  font-size: 14px;
  color: #666;
  width: 50%;
  margin-bottom: 15px;
  cursor: pointer;
}
.course-content .el-col:hover{
  color: #ffc210;
}
.course-content .el-col:hover .el-icon-caret-right,.course-content .el-col:hover .free{
  border-color: #ffc210;
  color: #ffc210;
}
.course-content .el-col .free{
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
.enter{
  overflow: hidden;
}
.enter .enter-left{
  float: left;
}
.enter .discount{
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
.enter .enter-left{
  line-height: 22px;
}
.enter .count{
  font-size: 24px;
  color: #fa6240;
}
.enter .old_count{
  font-size: 14px;
  color: #9b9b9b;
  text-decoration: line-through;
  margin-left: 10px;
}
.enter .change{
  float: right;
  width: 120px;
  height: 38px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #fd7b4d;
  background: transparent;/* 透明 */
  color: #fa6240;
  cursor: pointer;
  transition: all .2s ease-in-out;/* css3新版本的样式中支持支持 jQuery里面的动画预设效果 */
  /* all表示当前元素的所有样式  .2s表示改变样式完成的时间  ease-in-out */
}
.enter .change:hover{
  color: #fff;
  background: #ffc210;
  border: 1px solid #ffc210;
}
</style>
