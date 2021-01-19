<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle" :style="{ backgroundImage: `url(${config[type].img})` }"></div>
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="actions">
        <button class="back-home" @click="handleToHome">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script>
import types from './type'

export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data() {
    return {
      config: types
    }
  },
  methods: {
    handleToHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
  .exception {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 500px;

    .imgBlock {
      flex: 0 0 62.5%;
      width: 62.5%;
      padding-right: 152px;
      zoom: 1;

      &::before,
      &::after {
        content: ' ';
        display: table;
      }

      &::after {
        clear: both;
        height: 0;
        font-size: 0;
        visibility: hidden;
      }
    }

    .imgEle {
      float: right;
      width: 100%;
      max-width: 430px;
      height: 360px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: contain;
    }

    .content {
      flex: auto;

      .desc {
        margin-bottom: 16px;
        font-size: 20px;
        line-height: 28px;
      }

      .actions {
        .back-home {
          height: 32px;
          color: rgba(0, 0, 0, 0.65);
          background-color: #fff;
          border: 1px solid #d9d9d9;
          padding: 0 15px;
        }

        button:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
</style>
