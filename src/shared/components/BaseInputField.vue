<template>
    <div
      class="BaseInputField"
      :class="{ onerror: onerror !== '', disabled: disabled === true }"
      :style="{ width }"
    >
      <div
        class="BaseInputField_header"
        :style="{ 'max-width': `calc(${width} - 16px)` }"
        :title="`${header}`"
      >
        {{ header }}
        <span v-if="required" class="required">* </span>
      </div>
  
      <div class="BaseInputField_input-container">
        <!--  -->
        <input
          v-bind="$attrs"
          autocomplete="off"
          class="BaseInputField_text"
          :class="{
            'padding-right': hasSlot('icon-right'),
            'padding-left': hasSlot('icon-left'),
          }"
          :disabled="disabled"
          :max="max"
          :maxlength="maxlength"
          :min="min"
          :placeholder="placeholder"
          :readonly="readonly"
          :style="{ height, padding, inputFocus }"
          :type="type"
          :value="state.inputValue"
          @input="updateInput"
          @keyup.enter="keyupEnter()"
        >
        <div v-if="hasSlot('icon-left')" class="BaseInputField_icon-left">
          <slot name="icon-left" />
        </div>
  
        <div v-if="hasSlot('icon-right')" class="BaseInputField_icon-right">
          <slot name="icon-right" />
        </div>
      </div>
  
      <div v-if="onerror" class="BaseInputField_error">
        {{ onerror }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineComponent, onMounted, watch, type PropType, useSlots, reactive, computed } from 'vue';
  
  const props = defineProps({
    header: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    icon: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '341px',
    },
    height: {
      type: String,
      default: '48px',
    },
    padding: {
      type: String,
      default: '14px 16px',
    },
    modelValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: '',
    },
    onerror: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
    mask: {
      type: String as PropType<'money' | 'single-date' | 'range-date'>,
      default: '',
    },
    withTime: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 99999999999,
    },
    allowZero: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits([
    'update:modelValue',
    'input',
    'keyupEnter',
  ]);
  
  const state = reactive({
    inputValue: '',
    unmaskedValue: '',
  });
  
  const slots = useSlots();
  
  function hasSlot(name: string) {
    return !!slots[name];
  }
  
  const inputFocus = computed(() => {
    return props.focus ? { border: 'none' } : { border: '2px solid #4b970f' };
  });
  
  watch(() => props.modelValue, () => {
    if (state.inputValue !== props.modelValue)
      state.inputValue = props.modelValue as string;
  });
  
  watch(() => state.inputValue, (_val) => {
    if (state.inputValue && state.inputValue[0] === '0' && state.inputValue[1]) {
      const newStr = state.inputValue.split('');
      if (!props.allowZero)
        state.inputValue = newStr.splice(1, newStr.length - 1).join('');
      emit('update:modelValue', state.inputValue);
    }
  
    if (props.max) {
      state.inputValue = +state.inputValue < props.max ? state.inputValue : props.max.toString();
      emit('update:modelValue', state.inputValue);
    }
  });
  
  function updateInput(value: Event) {
    const inputVal = (value.target as HTMLInputElement).value;
  
    let updatedModelValue = inputVal;
  
    emit('update:modelValue', updatedModelValue);
  }
  
  function keyupEnter() {
    emit('keyupEnter');
  }
  
  onMounted(() => {
    if (props.modelValue)
      state.inputValue = props.modelValue as string;
  });
  </script>
  
  <script lang="ts">
  defineComponent({
    inheritAttrs: false,
  });
  </script>
  
  <style lang="scss" scoped>
  
  input[type="text"], input[type="number"] {
    border: 1px solid #E0E2D8;
  }
  
  input[type="text"]:focus, input[type="number"]:focus {
    outline-style: solid;
    outline-color: #E0E2D8;
    border: 1px solid #E0E2D8 !important;
  }
  input[type="number"] {
      text-align: left;
  }
  
  input::placeholder {
    color: #ABAEA3;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    text-align: start;
  }
  .BaseInputField {
    position: relative;
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;
  
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  
    &.onerror {
      .BaseInputField_header {
        color: #d41900;
      }
  
      .BaseInputField_text {
        border: 2px solid #d41900;
      }
    }
  
    &_header {
      margin-left: 8px;
      position: absolute;
      z-index: 2;
      padding: 0 8px;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.02em;
      color: #1c1c1c;
      background: #ffffff;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  
    &_input-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .numeration {
      position: absolute;
      top: 22px;
      left: 12px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #1C1C1C;
    }
  
    &_icon-right, &_icon-left {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(calc(-50% + 4px));
    }
  
    .padding-right {
      padding-right: 40px !important;
    }
  
    .padding-left {
      padding-left: 40px !important;
    }
  
    &_icon-left {
      left: 10px;
    }
  
    // &_icon-right {
    //   right: 10px;
    // }
  
    &_text {
      margin-top: 8px;
      padding: 14px 16px;
      width: inherit;
      height: 48px;
      border-radius: 50px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      border:  1px solid #E0E2D8;
      line-height: 20px;
    }
  
    &_error {
      margin-top: 4px;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.02em;
      color: #d51900;
    }
  }
  .disabled {
    .BaseInputField {
      &_header {
        color: #878882;
      }
    }
  }
  input:disabled {
        border: 1px solid #878882 !important;
        color: #878882;
        background: #fff;
  }
  </style>
  