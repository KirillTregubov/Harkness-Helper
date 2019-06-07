<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,900&display=swap');

// Mixins
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

@mixin destructive {
  --destructive050: hsl(360, 100%, 97%);
  --destructive100: hsl(360, 82%, 89%);
  --destructive200: hsl(360, 77%, 78%);
  --destructive300: hsl(360, 71%, 66%);
  --destructive400: hsl(360, 64%, 55%);
  --destructive500: hsl(360, 67%, 44%);
  --destructive600: hsl(360, 72%, 38%);
  --destructive700: hsl(360, 79%, 32%);
  --destructive800: hsl(360, 85%, 25%);
  --destructive900: hsl(360, 92%, 20%);
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
  @include destructive;
  --bg-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23149199' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  // Typography
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-normal: 400;
  --font-bold: 500;
  --font-black: 900;
  --text-base: 1rem;
  --text-sm: 0.85rem;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;

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
  font-family: 'Roboto', var(--font-stack);
  color: var(--primary900);
  background-color: var(--neutral100);
}

body > * {
  box-sizing: border-box;
  transition: all 0.3s ease-in-out, width 0, height 0;
}

svg {
  .primary {
    fill: var(--neutral200);
  }

  .secondary {
    fill: var(--neutral700);
  }
}

a, li, label, .title, .subtitle, #authentication h3 {
  user-select: none;
}

a.button {
  display: inline-block;
  padding: 0.5rem 1rem 0.5rem 0.8rem;
  box-shadow: var(--shadow-deep-sm);
  background: var(--neutral050);
  color: var(--neutral900);
  border-radius: var(--border-radius);
  text-decoration: none;
  margin: 0.25rem;
  margin-left: 0;
  user-select: none;

  svg {
    margin-right: 0.3rem;
    position: relative;
    top: 0.25em;
    margin-top: -0.35em;
    width: 1.25rem;
    height: 1.25rem;

    .primary {
      fill: var(--neutral200);
    }

    .secondary {
      fill: var(--neutral900);
    }
  }

  &:hover, &:active {
    background-color: var(--neutral200);
    box-shadow: var(--shadow-inset);

    .primary {
      fill: var(--neutral300);
    }

    .secondary {
      fill: var(--neutral900);
    }
  }

  &.primary {
    color: var(--neutral050);
    background-color: var(--neutral800);

    .primary {
      fill: var(--neutral050);
    }

    .secondary {
      fill: var(--neutral800);
    }

    &:hover, &:active {
      background-color: var(--neutral900);

      .secondary {
        fill: var(--neutral900);
      }
    }
  }

  &.destructive {
    color: var(--neutral050);
    background-color: var(--destructive500);

    .primary {
      fill: var(--destructive100);
    }

    .secondary {
      fill: var(--destructive300);
    }

    &:hover, &:active {
      background-color: var(--destructive600);
    }
  }
}

#loading {
  background-image: var(--bg-image);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes loader {
    to {
      opacity: 1;
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
      background: var(--primary800);
      border-radius: 50%;
      animation: loader 0.8s infinite alternate;
      opacity: 0.1;
    }

    > div {
      margin: 0 5px;
      animation-delay: 0.25s;
    }

    &:after {
      animation-delay: 0.5s;
    }
  }
}

body.focused {
  background-image: var(--bg-image);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep-sm);
    border-radius: var(--border-radius);
    max-width: $width-sm;
    width: 60vw;
    min-width: 300px;
    max-height: 90vh;
    padding: 2rem;
    margin-bottom: 1rem;

    &:not(.harkness){
      overflow: auto;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;

      .back {
        display: flex;
        align-items: center;
        padding: 0.2rem 0.35rem 0.3rem 0.25rem;
        border-radius: var(--border-radius);
        user-select: none;

        &:hover {
          background-color: var(--neutral200);
          box-shadow: var(--shadow-inset);
        }

        svg {
          margin: 0 0.25rem 0 0;

          .primary {
            fill: var(--neutral300);
          }

          .secondary {
            fill: var(--neutral900);
          }
        }

        h2 {
          margin: 0;
          font-size: var(--text-lg);
          font-weight: var(--font-bold);
        }
      }

      h1 {
        margin: 0;
        font-size: var(--text-2xl);
      }
    }

    label {
      display: block;
      color: var(--primary800);
      margin-bottom: 0.25em;
    }

    h5.error {
      display: none;
      color: var(--primary600);
      transition: all 500ms linear;
      animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      margin: 0 0 1rem 0;

      &.active {
        display: block;
      }
    }

    input {
      box-sizing: border-box;
      border: 1px solid #c2c2c2;
      background-color: var(--neutral200);
      box-shadow: 1px 1px 4px #ebebeb;
      border-radius: 3px;
      padding: 0.5rem;
      width: 100%;
      outline: none;
      margin-bottom: 1em;
      line-height: 20px;
      transition: all ease 0.5s;
      font-size: var(--text-md);
      
      &.multiselect__input {
        border: 0px !important;
        box-shadow: none !important;
      }

      &:hover {
        background-color: var(--neutral100) !important;

        &.multiselect__input {
          background-color: var(--neutral200) !important;
        }
      }
    }

    .iconBeside {
      display: flex;
      align-items: center;
      margin-bottom: 1em;

      input {
        margin-bottom: 0;
      }

      svg {
        margin-left: 1rem;
        display: inline-block;
      }
    }
    
    .buttons {
      margin-top: 2rem;
    }
  }
}

body.informational {
  background-image: var(--bg-image);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .container {
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep-sm);
    border-radius: var(--border-radius);
    max-width: $width-sm;
    width: 60vw;
    min-width: 300px;
    max-height: 90vh;
    padding: 2rem;
    margin-bottom: 1rem;
    overflow: auto;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;

      .back {
        display: flex;
        align-items: center;
        padding: 0.2rem 0.35rem 0.3rem 0.25rem;
        border-radius: var(--border-radius);
        user-select: none;

        &:hover {
          background-color: var(--neutral200);
          box-shadow: var(--shadow-inset);
        }

        svg {
          margin: 0 0.25rem 0 0;

          .primary {
            fill: var(--neutral300);
          }

          .secondary {
            fill: var(--neutral900);
          }
        }

        h2 {
          margin: 0;
          font-size: var(--text-lg);
          font-weight: var(--font-bold);
        }
      }

      h1 {
        margin: 0;
        font-size: var(--text-2xl);
      }
    }

    .subtitle {
      text-align: right;

      h2 {
        margin: 0;
        font-size: var(--text-xl);
        font-weight: var(--font-bold);
        color: var(--primary800);
        margin-bottom: 0.5rem;

        &.version {
          font-size: var(--text-lg);
          color: var(--primary700);
        }
      }
    }

    ol {
      list-style: none;
      counter-reset: counter;

      li {
        counter-increment: counter;
        
        &::before {
          content: counter(counter) ". ";
          color: var(--primary700);
          font-weight: var(--font-bold);
        }
      }
    }

    ol, .text {
      margin-bottom: 2.5rem;
    }

    h3 {
      font-weight: var(--font-bold);
      margin-bottom: 1rem;
    }

    .contactContainer {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;

      .contact {
        margin: 0.5rem;

        h4 {
          margin: 0 0 0.5rem 0;
          font-weight: var(--font-bold);
        }

        a {
          color: var(--neutral900);
          padding: 0.1rem 0.5rem 0.25rem 0.5rem;
          margin: -0.5rem;
          text-decoration: none;

          &:hover {
            border-radius: var(--border-radius);
            background-color: var(--neutral200);
          }
        }
      }
    }
  }
}

.multiselect {
  z-index: 100 !important;
  position: relative !important;
  margin-bottom: 1em;
  // background-color: var(--neutral200) !important;
}

.multiselect__tags {
  max-height: 30px !important;
  background-color: var(--neutral200) !important;
  border: 1px solid #c2c2c2 !important;
  box-shadow: 1px 1px 4px #ebebeb !important;
}

.multiselect__content-wrapper {
  overflow: fixed !important;
  position: absolute !important;
  z-index: 100 !important;
  
}

.multiselect__input {
  background-color: var(--neutral200) !important;
  display: inline-block !important;
  border: none !important;
  padding: 0 !important;
  font-size: var(--text-md) !important;
  width: auto !important;
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
