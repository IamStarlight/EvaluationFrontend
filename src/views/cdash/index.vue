<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">课程号是 : {{ id }}</div>
    <div class="dashboard-text">课程名是 : {{ cname }}</div>
    <div class="dashboard-text">任课老师是 : {{ teacher }}</div>
    <div class="dashboard-text">课程简介是 : {{ cintroduction }}</div>
    <button @click="change">返回课程列表</button>
    <!-- <div class="components-container board">
      <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
      <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
      <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />
    </div> -->
  </div>
</template>
0、

<script>
import { mapGetters } from 'vuex'
// import Kanban from '@/components/Kanban'


export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'id',
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
