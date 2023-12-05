<template>
    <button
      class="btn"
      :class="[`btn__${variant}`, `btn__${size}`, `btn__${variant}`, `btn__${variant}--${disabled}`, `btn__${variant}--${hoverEffect}`]"
      :disabled="disabled"
    >
      <div>
        <slot />
      </div>
    </button>
  </template>
  
  <script setup lang="ts">
  withDefaults(defineProps<{
    variant?: 'primary' | 'secondary' | 'text' | 'ternary' | 'outline' | 'no-outline' | 'icon' | 'custom' | 'delete'
    size?: 'sm' | 'lg' | 'icon' | 'mini' | 'none'
    disabled?: boolean
    hoverEffect?: boolean
  }>(), {
    variant: 'primary',
    size: 'sm',
    disabled: false,
  });
  
  </script>
  
  <style lang="scss" scoped>
  .btn {
      border-radius: 50px;
      border: 1px solid transparent;
      cursor: pointer;
      line-height: 16px;
      font-size: 12px;
      font-weight: 500;
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
      transition: all .3s ease-in-out;
  
      &__primary {
        background: linear-gradient(279.56deg, #65B3E4 15%, rgba(120, 161, 187, 0) 500%);
  
        &--disabled {
          opacity: 0.5;
        }
      }
  
      &__custom {
        &--disabled {
          opacity: 0.64;
        }
      }
  
      &__text {
        background: transparent;
        border: none;
        color: linear-gradient(279.56deg, #65B3E4 15%, rgba(120, 161, 187, 0) 500%);
  
        &--disabled {
          opacity: 0.64;
        }
      }
  
      &__no-outline {
        background: white;
        color: linear-gradient(279.56deg, #65B3E4 15%, rgba(120, 161, 187, 0) 500%);
        &--disabled {
          opacity: 0.64;
        }
        &__hoverEffect {
          background-color: linear-gradient(279.56deg, #65B3E4 15%, rgba(120, 161, 187, 0) 500%);
          border: 1px solid #F6F7F3;
          color: #F6F7F3;
        }
      }
  
      &__outline {
        background: white;
        color: linear-gradient(279.56deg, #65B3E4 15%, rgba(120, 161, 187, 0) 500%);
        border: 1px solid 29%, rgba(120,161,187,1) 100%;
  
        &--disabled {
          opacity: 0.64;
        }
  
        &:hover {
          background-color: #F6F7F3;
        }
      }
  
      &__secondary {
        background: #E0E2D8;
        color: #1C1C1C;
  
        &--disabled {
          opacity: 0.64;
        }
  
        &:hover {
          box-shadow: 0px 4px 8px 0px rgba(246, 246, 246, 0.25);
        }
      }
  
      &__delete {
        background: #D41900;
        color: #fff;
  
        &:hover {
          box-shadow: 0px 4px 8px 0px rgba(246, 246, 246, 0.25);
        }
      }
  
      &__none {
        padding: 0 !important;
      }
  
      &__lg {
        padding: 12px 24px;
      }
  
      &__sm {
        padding: 8px 12px;
      }
      &__mini {
        padding: 4px 8px;
        gap: 0;
      }
      &:disabled {
        background: #ABAEA3;
        color: #FFF;
      }
  }
  </style>
  