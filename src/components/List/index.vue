<template>
  <div>
    <div class="list-item" v-for="(item, index) in list" :key="index" @click="toggleChildren(index)">
      <div class="item-name">
        <span>{{ item.name }}</span>
      </div>
      <div v-if="item.showChildren" class="children-item">
        <list :list="item.children"></list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  methods: {
    toggleChildren (index) {
      // 切换子项的显示状态
      // this.$set(this.list, index, {
      //   ...this.list[index],
      //   showChildren: !this.list[index].showChildren,
      // });
      // console.log('哈哈哈哈');
    },
  },
};
</script>

<style scoped>
/* 根容器样式 */
.div {
  padding: 10px;
}

/* 列表项样式 */
.list-item {
  margin-bottom: 5px;
  cursor: pointer;
  /* 添加手型光标，表示可点击 */
}

/* 项名称样式 */
.item-name {
  font-size: 16px;

}

/* 子项样式 */
.children-item {
  margin-left: 20px;
}
</style>
