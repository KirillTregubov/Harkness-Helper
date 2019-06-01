<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
/* Reset Styles */
html,
body,
ul,
ol {
  margin: 0;
  padding: 0;
}

@mixin coolneutral {
  --neutral050: hsl(216, 33%, 97%);
  --neutral100: hsl(214, 15%, 91%);
  --neutral200: hsl(210, 16%, 82%);
  --neutral300: hsl(211, 13%, 65%);
  --neutral400: hsl(211, 10%, 53%);
  --neutral500: hsl(211, 12%, 43%);
  --neutral600: hsl(209, 14%, 37%);
  --neutral700: hsl(209, 18%, 30%);
  --neutral800: hsl(209, 20%, 25%);
  --neutral900: hsl(210, 24%, 16%);
}

/* Variables */
:root {
  // Colours
  --primary050: hsl(186, 100%, 94%);
  --primary100: hsl(185, 94%, 87%);
  --primary200: hsl(184, 80%, 74%);
  --primary300: hsl(184, 65%, 59%);
  --primary400: hsl(185, 57%, 50%);
  --primary500: hsl(185, 62%, 45%);
  --primary600: hsl(184, 77%, 34%);
  --primary700: hsl(185, 81%, 29%);
  --primary800: hsl(185, 84%, 25%);
  --primary900: hsl(184, 91%, 17%);
  @include coolneutral;
  // Typography
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  // --font-size-text
  

  // background-color: var(--neutral050);
  // color: var(--primary600);
}

#app {
  font-family: var(--font-stack);
  text-align: center;
  color: var(--neutral900);
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: var(--primary900);
    &.router-link-exact-active {
      color: var(--primary500);
    }
  }
}
</style>
