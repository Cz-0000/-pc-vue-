<template>
  <div>
    <span class="name">按省份选择:</span>
    <m-select
      title="省份"
      className="province"
      :list="provinceList"
      :value="province"
      @change_active="changeProvinceActive"
      @change="changeProvince"
      :showWrapperActive="provinceActive"
    />
    <m-select
      title="城市"
      className="city"
      :list="cityList"
      :value="city"
      :disabled="cityDisabled"
      @change_active="changeCityActive"
      @change="changeCity"
      :showWrapperActive="cityActive"
    />
    <span>直接搜索:</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option
        v-for="item in searchList"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import MSelect from './select'
import api from '@/api/index.js'
export default {
  data () {
    return {
      searchWord: '',
      searchList: ['北京', '上海', '广州', '深圳', '武汉', '西安', '成都'],
      loading: false,
      provinceList: [],
      cityList: [],
      province: '省份',
      city: '城市',
      provinceActive: false,
      cityActive: false,
      cityDisabled: true,
    }
  },
  components: {
    MSelect
  },
  created () {
    api.getProvinceList().then(res => {
      this.provinceList = res.data.data.map((item) => {
        item.name = item.provinceName;
        return item;
      });
      // console.log(this.provinceList)
    })
  },
  methods: {
    changeProvinceActive (flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive (flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    remoteMethod (val) {
      // console.log(val)
    },
    changeProvince (item) {
      this.province = item.name;
      this.cityDisabled = false;
      this.cityList = item.cityInfoList;
    },
    changeCity (item) {
      this.city = item;
      this.$store.dispatch('setPosition', item);
      this.$router.push({ name: 'Index' })
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>