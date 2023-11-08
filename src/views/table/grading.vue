<template>

  <div class="hom-container1">
    <p>正在批改学号为：{{this.$route.query.sid}} 同学的作业</p>
<!--    <p>正在批改学号为{{this.$router.query.sid}}</p>-->
    <el-button class="btn1" @click="back">返回</el-button>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },
  components: {
  },

  computed: {
    ...mapGetters([
     'sid'
    ])
  },

  methods: {
    back(){
      this.$router.push({ name: 'box' });
    }
  }
}
</script>


