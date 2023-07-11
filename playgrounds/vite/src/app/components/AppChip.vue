<template>
  <div class="pux-AppChip">
    <slot />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.pux-AppChip {
    padding: var(--app-m-1) var(--app-m-2);
    background-color: var(--app-background-color-soft);
    border: 1px solid var(--app-border-color);
    border-radius: var(--app-border-radius);
}
</style>
