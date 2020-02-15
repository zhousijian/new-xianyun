<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm></OrderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>

<script>
//
import OrderForm from "@/components/air/orderForm";
export default {
    data () {
        return {
            
        }
    },
  components: {
    OrderForm
  },
  mounted () {
    //   console.log(this.$route.query);
    this.$axios({
        url : `/airs/${this.$route.query.id}`,
        params : { seat_xid : this.$route.query.seat_xid}
    }).then(res=>{
        // console.log(res);
        
    })
      
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