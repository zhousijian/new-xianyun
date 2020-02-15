<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- <div></div> -->
        <FlightsFilters :data="backupsearchFlights" @filterDate="filterDate"></FlightsFilters>

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
        <FlightsAside></FlightsAside>
      </div>
    </el-row>
  </section>
</template>

<script>
// import moment from "moment";
// 航班详情页头部
import FlightsHead from "@/components/air/flightsHead";
// 航班详情页的每一项信息
import FlightsItem from "@/components/air/flightsItem";
// 过滤条件选择部分
import FlightsFilters from "@/components/air/flightsFilters";
// 航班详情页得右侧历史查询部分
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      // 搜索到的所有航班信息
      searchFlights: {
        info: {},
        flights: [],
        options: {}
      },
      // 备份一份搜索到的所有航班信息
      backupsearchFlights: {
        info: {},
        flights: [],
        options: {}
      },
      // 当前的页数
      pageIndex: 1,
      // 每页的航班信息条数
      pageSize: 5,
      // 航班信息的总条数
      total: 10
    };
  },
  // 在当前路由改变，但是该组件被复用时调用(组件内调用导航守卫)
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(to);
    // console.log(from);
    // console.log(next);
    // this.$axios({
    //   url: "/airs",
    //   params: to.query
    // }).then(res => {
    //   // console.log(res);
    //   // 修改总条数
    //   this.total = res.data.total;
    //   // 总数据
    //   this.searchFlights = res.data;
    //   // 备份总数据
    //   this.backupsearchFlights = { ...res.data };
    // });
    // 请求机票列表数据
    this.getData(to.query);
    this.pageIndex = 1;
    next();
  },
  components: {
    FlightsHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    // 请求机票列表数据
    this.getData(this.$route.query);
  },
  methods: {
    // 封装请求机票列表数据
    getData(params) {
      // 请求机票列表数据
      // console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        params
      }).then(res => {
        // console.log(res);
        // 修改总条数
        this.total = res.data.total;
        // 总数据
        this.searchFlights = res.data;
        // 备份总数据
        this.backupsearchFlights = { ...res.data };
      });
    },
    // 切换条数时候触发的事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    // 切换页数时候触发的事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
    },
    // 从flightsFilters.vue筛选回来的数据
    filterDate(arr) {
      // console.log(arr);
      this.searchFlights.flights = arr;
      this.total = arr.length;
    }
  },
  computed: {
    // 切割之后返回的数组（当前页面要展示的数组）
    // 计算属性函数内部引用实例（this）的属性一旦发生了变化，函数会重新执行返回新的值
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