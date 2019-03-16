<template>
  <div
    v-if="toastStatus"
    @click="close"
  >{{toastTip}}</div>
</template>

<script type="text/ecmascript-6">
export default {
	data() {
		return {
			toastStatus: false,
			toastTip:
				'',
		};
	},
	methods: {
		close() {
			this.toastStatus = false;
		},
	},
};
</script>

<style lang="scss">
</style>
