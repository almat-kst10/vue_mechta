<template>
    <div class="LoadingModel" :class="{ hidden: !isLoading }">
      <div class="background_shadow" :class="{ fullblind: isBlindLoading }" />
      <div class="animation_container">
        <LoadingIcon
          class="logo"
        />
        <div class="circle_container">
          <div class="edge_container n1">
            <div class="edge n1" />
          </div>
          <div
            v-for="i in 19"
            :key="i"
            class="edge_container"
            :class="`n${i + 2}`"
          >
            <div class="edge" :class="`num${i + 2}`" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { useGlobalLoading } from 'shared/composables/useLoadingState';
  
  const { isLoading, isBlindLoading } = useGlobalLoading();
  </script>
  
  <style lang="scss" scoped>
  $break-small: 500px;
  $break-medium: 800px;
  $break-large: 1200px;
  .LoadingModel {
      &.hidden {
          display: none;
      }
      .background_shadow {
          position: fixed;
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 9998;
          background: rgba(255, 255, 255, 0.64);
          &.fullblind {
              background: #FFFFFF;
          }
      }
      .animation_container {
          z-index: 9999;
          position: fixed;
          top: 50vh;
          left: 50vw;
          transform: translate(-50%, -50%);
          padding: 14px;
          .logo {
              opacity: 1;
              width: 100px;
              height: 100px;
          }
          .circle_container {
              position: absolute;
              left: 50%;
              top: 0;
              transform: translateX(calc(-50% - 5px));
              .edge_container {
                  position: absolute;
                  width: 10px;
                  height: 128px;
                  .edge {
                      position: absolute;
                      animation: change 2s infinite linear;
                  }
                  @keyframes change {
                      0% {
                          width: 10px;
                          height: 10px;
                          border-radius: 5px;
                          background: #4B970F;
                          transform: translateY(-50%);
                      }
                      4.9% {
                          width: 10px;
                          height: 10px;
                          border-radius: 5px;
                          background: #4B970F;
                          transform: translateY(-50%);
                      }
                      5% {
                          width: 8px;
                          height: 8px;
                          border-radius: 4px;
                          background: #4B970F;
                          transform: translateY(-50%);
                      }
                      10% {
                          width: 5px;
                          height: 5px;
                          border-radius: 2.5px;
                          background: #4B970F;
                          transform: translateY(-50%);
                      }
                      75% {
                          opacity: 0;
                      }
                      100% {
                          width: 10px;
                          height: 2px;
                          border-radius: 2px;
                          background: #4B970F;
                          opacity: 0;
                      }
                  }
                  .num1 {
                      animation-delay: 0s;
                  }
                  .num2 {
                      animation-delay: 0.1s;
                  }
                  .num3 {
                      animation-delay: 0.2s;
                  }
                  .num4 {
                      animation-delay: 0.3s;
                  }
                  .num5 {
                      animation-delay: 0.4s;
                  }
                  .num6 {
                      animation-delay: 0.5s;
                  }
                  .num7 {
                      animation-delay: 0.6s;
                  }
                  .num8 {
                      animation-delay: 0.7s;
                  }
                  .num9 {
                      animation-delay: 0.8s;
                  }
                  .num10 {
                      animation-delay: 0.9s;
                  }
                  .num11 {
                      animation-delay: 1s;
                  }
                  .num12 {
                      animation-delay: 1.1s;
                  }
                  .num13 {
                      animation-delay: 1.2s;
                  }
                  .num14 {
                      animation-delay: 1.3s;
                  }
                  .num15 {
                      animation-delay: 1.4s;
                  }
                  .num16 {
                      animation-delay: 1.5s;
                  }
                  .num17 {
                      animation-delay: 1.6s;
                  }
                  .num18 {
                      animation-delay: 1.7s;
                  }
                  .num19 {
                      animation-delay: 1.8s;
                  }
                  .num20 {
                      animation-delay: 1.9s;
                  }
              }
              .n1 {
                  transform: rotate(0deg);
              }
              .n2 {
                  transform: rotate(18deg);
              }
              .n3 {
                  transform: rotate(36deg);
              }
              .n4 {
                  transform: rotate(54deg);
              }
              .n5 {
                  transform: rotate(72deg);
              }
              .n6 {
                  transform: rotate(90deg);
              }
              .n7 {
                  transform: rotate(108deg);
              }
              .n8 {
                  transform: rotate(126deg);
              }
              .n9 {
                  transform: rotate(144deg);
              }
              .n10 {
                  transform: rotate(162deg);
              }
              .n11 {
                  transform: rotate(180deg);
              }
              .n12 {
                  transform: rotate(198deg);
              }
              .n13 {
                  transform: rotate(216deg);
              }
              .n14 {
                  transform: rotate(234deg);
              }
              .n15 {
                  transform: rotate(252deg);
              }
              .n16 {
                  transform: rotate(270deg);
              }
              .n17 {
                  transform: rotate(288deg);
              }
              .n18 {
                  transform: rotate(306deg);
              }
              .n19 {
                  transform: rotate(324deg);
              }
              .n20 {
                  transform: rotate(342deg);
              }
          }
  
      }
  }
  </style>
  