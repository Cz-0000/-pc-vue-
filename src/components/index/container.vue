<template>
  <div class="m-istyle">
    <dl>
      <dt>{{ nav.title }}</dt>
      <dd
        v-for="(item, oindex) in nav.list"
        :key="oindex"
        :class="{ active: item.tab == kind }"
        :data-type="item.tab"
        @mouseover="over"
      >
        {{ item.text }}
      </dd>
    </dl>
    <ul class="ibody">
      cardList
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      kind: 'all'
    }
  },
  props: ["nav"],

  methods: {
    over (e) {
      this.kind = e.target.getAttribute("data-type")
    }
  },
}

</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>