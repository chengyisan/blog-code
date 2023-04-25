<template>
</template>
<script>
export default {
  props: ['slot-key'],
  mounted() {
    this.$page.lastUpdated = '2023/04/12 下午2:00:00'
  }
}
</script>