<template>
    <div
      ref="IconWrapper"
      class="Icon_Container"
      @mouseenter="onhoverIcon"
    >
      <div
        ref="IconContainer"
        class="icon"
        v-bind="$attrs"
        :style="{ transform: `rotate(${rotate}deg)` }"
        v-html="src"
      />
      <div
        v-if="tooltip"
        ref="TooltipText"
        class="tooltiptext"
      >
        {{ tooltip }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseIcon',
    inheritAttrs: false,
    props: {
      src: {
        type: String,
        default: '',
      },
      width: {
        type: Number,
        default: 24,
      },
      height: {
        type: Number,
        default: 24,
      },
      rotate: {
        type: Number,
        default: undefined,
      },
      active: {
        type: Boolean,
        default: false,
      },
      standardColor: {
        type: String,
        default: '#1C1C1C',
      },
      strokeColor: {
        type: String,
        default: '',
      },
      activeColor: {
        type: String,
        default: '#4B970F',
      },
      tooltip: {
        type: String,
        default: '',
      },
    },
    watch: {
      active() {
        this.onchangeActive();
      },
      width() {
        this.changeDimentions();
      },
      height() {
        this.changeDimentions();
      },
      strokeColor() {
        this.onchangeStrokeColor();
      },
    },
    mounted() {
      this.changeDimentions();
      this.onchangeStrokeColor();
      if (this.active)
        this.setColor(this.activeColor);
    },
    methods: {
      onchangeActive() {
        this.setColor(this.active ? this.activeColor : this.standardColor);
      },
      onchangeStrokeColor() {
        if (this.strokeColor)
          this.setColor(this.strokeColor);
      },
      setColor(color: string) {
        if (this.$refs.IconContainer) {
          const paths = [...((this.$refs.IconContainer) as HTMLElement).getElementsByTagName('svg')[0].children];
          for (const path of paths) {
            if (path.getAttribute('fill') !== null)
              path.setAttribute('fill', color);
  
            if (path.getAttribute('stroke') !== null)
              path.setAttribute('stroke', color);
          }
        }
      },
      changeDimentions() {
        if (this.width !== 0 && this.height !== 0) {
          if (this.$refs.IconContainer) {
            const icon = (this.$refs.IconContainer as HTMLElement).getElementsByTagName('svg')[0];
            if (icon) {
              icon.setAttribute('width', this.width.toString());
              icon.setAttribute('height', this.height.toString());
            }
          }
        }
      },
      onhoverIcon() {
        const tooltip = this.$refs.TooltipText as HTMLElement;
        const wrapper = this.$refs.IconWrapper as HTMLElement;
        if (tooltip && wrapper) {
          const w = tooltip.offsetWidth;
          const h = tooltip.offsetHeight;
          const rect = wrapper.getBoundingClientRect();
          const top = window.innerHeight - rect.bottom > h + 8
            ? (rect.bottom + 4)
            : (rect.top - h - 4);
          const left = window.innerWidth - rect.left > w + 8
            ? rect.left + 4
            : (rect.right - w - 4);
          tooltip.style.top = `${Math.round(top)}px`;
          tooltip.style.left = `${Math.round(left)}px`;
        }
      },
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .Icon_Container{
      position: relative;
      width: fit-content;
      height: fit-content;
      transition: all 0.3s ease;
      .icon {
          transition: all 0.3s ease;
          display: flex;
          width: fit-content;
          height: fit-content;
          &:hover{
              cursor: pointer;
          }
      }
      &:hover {
          .tooltiptext {
              visibility: visible;
              opacity: 0.9;
          }
      }
      .tooltiptext {
          position: fixed;
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          width: fit-content;
          padding: 6px 8px;
          border-radius: 6px;
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          white-space: nowrap;
          color: #FFFFFF;
          background-color: rgba(51, 50, 50, 0.8);
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
          transition: visibility 0.3s linear, opacity 0.3s linear;
      }
  
  }
  </style>
  