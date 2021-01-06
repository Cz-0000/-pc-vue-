<template>
  <div class="page-changeCity">
    <el-row><province /></el-row>
    <el-row><hot title="热门城市:" :list="hotList" /></el-row>
    <el-row><hot title="最近访问:" :list="rencentList" /></el-row>
    <el-row><category /></el-row>
  </div>
</template>

<script>
import Province from '../components/changeCity/province'
import Hot from '../components/changeCity/hot'
import Category from '../components/changeCity/category'
import api from '@/api/index.js'

export default {
  data () {
    return {
      hotList: [],
      rencentList: ['深圳', '武汉', '西安', '成都']
    }
  },
  created () {
    api.getHotCity().then(res => {
      this.hotList = res.data.data;
    });
    api.getRecentCity().then(res => {
      this.rencentList = res.data.data;
    })
  },
  components: {
    Province,
    Hot,
    Category
  }
}
</script>