<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :sapn="3" class="left">
        <router-link to="/">
          <img
            src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
            alt="美团"
          />
        </router-link>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="searchWord"
            placeholder="搜索商家或地点"
            @focus="focusInput"
            @blur="blurInput"
            @input="onInput"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="item in hotPlaceList" :key="item">
              <router-link :to="{ name: 'goods', params: { name: item } }">{{
                item
              }}</router-link>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="item in searchList" :key="item">
              <router-link :to="{ name: 'goods', params: { name: item } }">{{
                item
              }}</router-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <router-link
            v-for="item in suggestList"
            :key="item"
            :to="{ name: 'goods', params: { name: item } }"
            >{{ item }}</router-link
          >
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      searchWord: '',
      isFocus: false,
      hotPlaceList: [],
      searchList: [],
      suggestList: [],
    }
  },
  created () {
    api.searchHotWords().then(res => {
      this.hotPlaceList = res.data.data;
      this.suggestList = res.data.data;
    });

  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.searchWord;
    },
    isSearchList () {
      return this.isFocus && this.searchWord;
    }
  },
  methods: {
    focusInput () {
      this.isFocus = true;
    },
    blurInput () {
      var self = this;
      setTimeout(function () {
        self.isFocus = false;
      }, 200)
    },
    onInput () {
      api.getSearchList.then(res => {
        this.searchList = res.data.data.list.filter((item, index) => {
          return item.indexOf(this.searchWord) > -1;
          console.log(res)
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/public/header/index.scss";
@import "@/assets/css/public/header/search.scss";
</style>