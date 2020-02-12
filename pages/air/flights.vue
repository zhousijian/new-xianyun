<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <!-- <div></div> -->
        <FlightsHead></FlightsHead>

        <!-- 航班信息 -->
        <!-- <div></div> -->
        <FlightsItem v-for="(item,index) in onePageFlightInfo" :key="index" :data="item"></FlightsItem>

        <!-- element-ui分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// import moment from "moment";
import FlightsHead from "@/components/air/flightsHead";
import FlightsItem from "@/components/air/flightsItem";

export default {
  data() {
    return {
      // 搜索到的所有航班信息
      searchFlights: {},
      // 当前的页数
      pageIndex: 1,
      // 每页的航班信息条数
      pageSize: 5,
      // 航班信息的总条数
      total: 10
    };
  },
  components: {
    FlightsHead,
    FlightsItem
  },
  mounted() {
    // console.log(this.$route.query);
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      this.total = res.data.total;
      this.searchFlights = res.data;
    });
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
    }
  },
  computed: {
    onePageFlightInfo() {
      // 判断searchFlights有没有值
      if (!this.searchFlights.flights) {
        // 没有值返回一个空数组
        return [];
      }
      let arr = this.searchFlights.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>