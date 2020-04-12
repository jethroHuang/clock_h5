<template>
  <svg class="icon" :style="{
    'width': this.iconWidth,
    'height': this.iconHeight,
    'fill': this.iconColor
  }">
    <use :xlink:href="iconClass"></use>
  </svg>
</template>

<script>
  export default {
    name: "icon",
    props: {
      iconName: {
        type: String,
        required: true
      },
      iconWidth: {
        type: String,
        default: '1rem'
      },
      iconHeight: {
        type: String,
        default: '1rem'
      },
      iconColor: {
        type: String,
        default: 'currentColor'
      }
    },
    computed: {
      iconClass() {
        return '#'+this.iconName
      }
    }
  }
</script>

<style>
  .icon {
    vertical-align: -0.15em;
    overflow: hidden;
  }
</style>