<template>
  <div class="dashboard-container">
    <div class="dashboard-text">课程号是 : {{ cid }}</div>
    <div class="dashboard-text">课程名是 : {{ cname }}</div>
    <div class="dashboard-text">任课老师是 : {{ teacher }}</div>
    <div class="dashboard-text">课程简介是 : {{ cintroduction }}</div>
    <button @click="change">返回课程列表</button>
  </div>
</template>
0、

<script>
import { mapGetters } from 'vuex'
//import Kanban from '@/components/Kanban'


export default {
  name: 'Dashboard',
  // components: {
  //   Kanban
  // },
  // data () {
  //   return {
  //     group: 'mission',
  //     list1: [
  //       { name: 'Mission', id: 1 },
  //       { name: 'Mission', id: 2 },
  //       { name: 'Mission', id: 3 },
  //       { name: 'Mission', id: 4 }
  //     ],
  //     list2: [
  //       { name: 'Mission', id: 5 },
  //       { name: 'Mission', id: 6 },
  //       { name: 'Mission', id: 7 }
  //     ],
  //     list3: [
  //       { name: 'Mission', id: 8 },
  //       { name: 'Mission', id: 9 },
  //       { name: 'Mission', id: 10 }
  //     ]
  //   }
  // },
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
  methods: {
    change () {
      this.$router.push({ path: '/dashboard' })
      if (this.roles == 4)
      {
        this.$store.dispatch("user/setchangerole",
          ['3']
        );
      } else
      {
        this.$store.dispatch("user/setchangerole",
          ['1']
        );
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
