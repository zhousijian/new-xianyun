<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from}-${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.text"
            :value="item.size"
            v-for="(item,index) in airSizeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <!-- 渲染空的字符串，只需要监听功能 -->
    <span>{{filterData}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { text: "大", size: "L" },
        { text: "中", size: "M" },
        { text: "小", size: "S" }
      ] //机型大小列表
    };
  },
  computed: {
    // 过滤筛选条件
    filterData() {
      let arr = this.data.flights.filter(v => {
        // 假设当前的数据都是符合条件
        let valid = true;
        // 找出不符合条件

        // 起飞机场
        if (this.airport != "" && this.airport != v.org_airport_name) {
          valid = false;
        }
        // 航班公司
        if (this.company != "" && this.company != v.airline_name) {
          valid = false;
        }
        //出发时间
        // console.log(this.flightTimes);
        // 时间范围
        let scopedHour = this.flightTimes.split("-");
        // 开始时间的时位
        let startHour = v.dep_time.split(":")[0];
        if (
          Number(scopedHour[0]) > Number(startHour) ||
          Number(startHour) >= Number(scopedHour[1])
        ) {
          valid = false;
        }
        // 机型大小
        if (this.airSize != "" && this.airSize != v.plane_size) {
          valid = false;
        }
        return valid;
      });
      this.$emit("filterDate", arr);
      return "";
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      //   // filter筛选出满足条件的返回一个新的数组
      //   let arr = this.data.flights.filter(v => {
      //     return v.org_airport_name === value;
      //   });
      //   // 子传父，把筛选满足条件的新数组传给flights.vue组件，渲染
      //   this.$emit("filterDate", arr);
      //   // console.log(arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //   //   console.log(value);
      //   let arr = this.data.flights.filter(v => {
      //     // 时间范围
      //     let scopeHour = value.split("-");
      //     // console.log(scopeHour);
      //     // 开始时间
      //     let startHour = v.dep_time.split(":")[0];
      //     // console.log(Number(scopeHour[1]));
      //     return (
      //       Number(scopeHour[0]) <= Number(startHour) &&
      //       Number(startHour) < Number(scopeHour[1])
      //     );
      //   });
      //   // 子传父，把筛选满足条件的新数组传给flights.vue组件，渲染
      //   this.$emit("filterDate", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //   // console.log(value);
      //   let arr = this.data.flights.filter(v => {
      //     return v.airline_name == value;
      //   });
      //   // console.log(arr);
      //   // 子传父，把筛选满足条件的新数组传给flights.vue组件，渲染
      //   this.$emit("filterDate", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      //   // console.log(value);
      //   // filter筛选出满足条件的返回一个新的数组
      //   let arr = this.data.flights.filter(v => {
      //     return v.plane_size === value;
      //   });
      //   // 子传父，把筛选满足条件的新数组传给flights.vue组件，渲染
      //   this.$emit("filterDate", arr);
      //   // console.log(arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间
      this.company = ""; // 航空公司
      this.airSize = ""; // 机型大小
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>