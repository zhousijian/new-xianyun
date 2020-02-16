<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm></OrderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="$store.state.air.orderDetailInfo"></OrderAside>
      </div>
    </el-row>
  </div>
</template>

<script>
// 引入表单组件
import OrderForm from "@/components/air/orderForm";
// 引入侧边栏的金额计算组件
import OrderAside from "@/components/air/orderAside";
export default {
  data() {
    return {};
  },
  components: {
    OrderForm,
    OrderAside
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>