import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          default: {
            "50": "#e3e2e2",
            "100": "#bdb9ba",
            "200": "#969192",
            "300": "#6f686a",
            "400": "#494042",
            "500": "#22171a",
            "600": "#1c1315",
            "700": "#160f11",
            "800": "#100b0c",
            "900": "#0a0708",
            "foreground": "#fff",
            "DEFAULT": "#22171a"
          },
          primary: {
            "50": "#feefe7",
            "100": "#fcdac6",
            "200": "#fac4a4",
            "300": "#f9ae83",
            "400": "#f79861",
            "500": "#f58240",
            "600": "#ca6b35",
            "700": "#9f552a",
            "800": "#743e1e",
            "900": "#4a2713",
            "foreground": "#000",
            "DEFAULT": "#f58240"
          },
          secondary: {
            "50": "#f3e8ea",
            "100": "#e3c7cb",
            "200": "#d2a6ad",
            "300": "#c2858f",
            "400": "#b16471",
            "500": "#a14353",
            "600": "#853744",
            "700": "#692c36",
            "800": "#4c2027",
            "900": "#301419",
            "foreground": "#fff",
            "DEFAULT": "#a14353"
          },
          content1: {
            "DEFAULT": "#faf4f6",
            "foreground": "#000"
          },
          content2: {
            "DEFAULT": "#f2e3e6",
            "foreground": "#000"
          },
          content3: {
            "DEFAULT": "#ead2d6",
            "foreground": "#000"
          },
          content4: {
            "DEFAULT": "#e2c0c7",
            "foreground": "#000"
          }
        }
      },
      dark: {
        colors: {
          default: {
            "50": "#302d2e",
            "100": "#615b5c",
            "200": "#91888a",
            "300": "#c2b6b8",
            "400": "#f2e3e6",
            "500": "#f5e9eb",
            "600": "#f7eef0",
            "700": "#faf4f5",
            "800": "#fcf9fa",
            "900": "#ffffff",
            "foreground": "#000",
            "DEFAULT": "#f2e3e6"
          },
          primary: {
            "50": "#4a2713",
            "100": "#743e1e",
            "200": "#9f552a",
            "300": "#ca6b35",
            "400": "#f58240",
            "500": "#f79861",
            "600": "#f9ae83",
            "700": "#fac4a4",
            "800": "#fcdac6",
            "900": "#feefe7",
            "foreground": "#000",
            "DEFAULT": "#f58240"
          },
          secondary: {
            "50": "#301419",
            "100": "#4c2027",
            "200": "#692c36",
            "300": "#853744",
            "400": "#a14353",
            "500": "#b16471",
            "600": "#c2858f",
            "700": "#d2a6ad",
            "800": "#e3c7cb",
            "900": "#f3e8ea",
            "foreground": "#fff",
            "DEFAULT": "#a14353"
          },
          content1: {
            "DEFAULT": "#130d0e",
            "foreground": "#fff"
          },
          content2: {
            "DEFAULT": "#22171a",
            "foreground": "#fff"
          },
          content3: {
            "DEFAULT": "#312126",
            "foreground": "#fff"
          },
          content4: {
            "DEFAULT": "#402c31",
            "foreground": "#fff"
          }
        }
      }
    }
  })],
}
