<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location-outline" />
      {{ $store.state.position.name }}
      <router-link class="changeCity" :to="{ name: 'changeCity' }"
        >切换城市</router-link
      >
      <a href="#" v-for="near in nearCity" :key="near.id"> {{ near.name }} </a>
    </div>
    <div class="m-user">
      <router-link class="login" :to="{ name: 'login' }">{{
        $store.state.userName ? $store.state.userName : "立即登录"
      }}</router-link>
      <router-link
        v-if="!$store.state.userName"
        class="register"
        :to="{ name: 'register' }"
        >注册</router-link
      >
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      nearCity: []
    }
  },
  watch: {
    "$store.state.position": function () {
      this.nearCity = this.$store.state.position.nearCity;
    }
  },
  created () {
    api.getCurPosition().then((res) => {
      this.$store.dispatch('setPosition', res.data.data.name);
      this.nearCity = res.data.data.nearCity;

    })
  }
}
</script>
