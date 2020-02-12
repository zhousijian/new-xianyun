<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form :model="form" :rules="rules" class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市" prop="departCity">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="searchDepartCityBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市" prop="destCity">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="searchDestCityBlur"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间" prop="departDate">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
          :picker-options="banDate"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入时间格式的插件
import moment from "moment";
export default {
  data() {
    return {
      banDate: {
        disabledDate(time) {
          return time.getTime()+3600*1000*24 < Date.now();
        }
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      rules: {
        departCity: [
          { required: true, message: "请输入出发城市", trigger: "click" }
        ],
        destCity: [
          { required: true, message: "请输入到达城市", trigger: "click" }
        ],
        departDate: [
          { required: true, message: "请选择出发时间", trigger: "click" }
        ]
      },
      // 出发城市搜索框请求回来的数据，以便使用
      departCitySearchInfo: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      // console.log(item);
      // console.log(index);
      if (index == 1) {
        this.$alert("抱歉！目前只提供单程航班", "温馨提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // console.log(value);
      if (value == "") {
        this.departCitySearchInfo = [];
        cb([]);
        return;
      }
      this.$store.dispatch("air/searchCity", { name: value }).then(res => {
        // console.log(res);
        this.departCitySearchInfo = res;
        cb(res);
      });
      //   cb([{ value: '1' }, { value: '2' }, { value: '3' }]);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 出发城市搜索框的失焦默认选中第一项
    searchDepartCityBlur() {
      // console.log(this.departCitySearchInfo);
      if (this.departCitySearchInfo.length == 0) {
        return;
      }
      this.form.departCity = this.departCitySearchInfo[0].value;
      this.form.departCode = this.departCitySearchInfo[0].sort;
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (value == "") {
        this.departCitySearchInfo = [];
        cb([]);
        return;
      }
      this.$store.dispatch("air/searchCity", { name: value }).then(res => {
        this.departCitySearchInfo = res;
        cb(res);
      });
      //   cb([{ value: '1' }, { value: '2' }, { value: '3' }]);
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 到达城市搜索框的失焦默认选中第一项
    searchDestCityBlur() {
      if (this.departCitySearchInfo.length == 0) {
        return;
      }
      this.form.destCity = this.departCitySearchInfo[0].value;
      this.form.destCode = this.departCitySearchInfo[0].sort;
    },

    // 如果element-ui没有可以改变时间格式的方法，就需要用到以下的方法修改时间格式
    // 确认选择日期时触发
    handleDate(value) {
      // console.log(value);
      // let searchDate = moment(value).format('YYYY-MM-DD')
      // this.form.departDate = searchDate
      // console.log(searchDate);
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      //   console.log(this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          //   console.log(111);
          //   this.$axios({
          //     url: "/airs",
          //     params: this.form
          //   }).then(res => {
          //     console.log(res);
          // 跳转到 /air/flights，保证该页面url的参数有5个参数
          this.$router.push({
            path: "/air/flights",
            query: this.form
          });
          //   });
        }
        //  else {
        //   this.$message.error("请规范输入信息");
        // }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>