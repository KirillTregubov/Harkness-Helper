<template>
  <!-- <body id="app"> -->
  <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
  </div>-->
  <router-view/>
  <!-- </body> -->
</template>

<style lang="scss">
// Mixins
@mixin coolNeutral {
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

@mixin tealPrimary {
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
}

/* Reset Styles */
html,
body,
ul,
ol {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  a {
    text-decoration: none;
    color: inherit;
  }
}

/* Variables */
:root {
  // Colours
  @include tealPrimary;
  @include coolNeutral;

  // Typography
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-light: 100;
  --font-normal: 400;
  --font-bold: 600;
  --font-black: 800;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  // --font-size-text

  // Misc Layouts
  --border-radius: 0.5rem;
  --shadow-inset: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  --shadow-sm: 0 4px 6px hsla(0, 0%, 0%, 0.1);
  --shadow-md: 0 5px 15px hsla(0, 0%, 0%, 0.2);
  --shadow-lg: 0 10px 24px hsla(0, 0%, 0%, 0.2);
  --shadow-xl: 0 15px 35px hsla(0, 0%, 0%, 0.2);
  --shadow-deep: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-deep-sm: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
  --shadow-deep-md: 0 10px 20px rgba(0, 0, 0, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.1);
  --shadow-deep-lg: 0 15px 25px rgba(0, 0, 0, 0.15),
    0 5px 10px rgba(0, 0, 0, 0.05);
  --shadow-deep-xl: 0 20px 40px rgba(0, 0, 0, 0.2);

  // Set Defaults
  font-family: var(--font-stack);
  color: var(--primary900);
  background-color: var(--neutral100);
}

* {
  box-sizing: border-box;
}

svg {
  .primary {
    fill: var(--neutral200);
  }

  .secondary {
    fill: var(--neutral700);
  }
}

a.button {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: #fff;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: #5778f3;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
}

#loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -16px, 0);
    }
  }

  .loader {
    > div,
    &:before,
    &:after {
      content: " ";
      display: inline-block;
      width: 13px;
      height: 13px;
      background: var(--primary400);
      border-radius: 50%;
      animation: loader 0.6s infinite alternate;
    }

    > div {
      margin: 0 5px;
      animation-delay: 0.2s;
    }

    &:after {
      animation-delay: 0.4s;
    }
  }
}

// #app {
//   font-family: var(--font-stack);
//   // text-align: center;
//   color: var(--neutral900);
// }

// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: var(--primary900);
//     &.router-link-exact-active {
//       color: var(--primary500);
//     }
//   }
// }
</style>
