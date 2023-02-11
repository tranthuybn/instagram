module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  future: {
    removeDeprecatedGapUtilities: true
  },
  theme: {
    fill: (theme) => ({
      red: theme("colors.red.primary"),
      white: theme("colors.white")
    }),
    extend: {
      backgroundImage: {
        "phone-slide": "url('https://static.cdninstagram.com/rsrc.php/v3/yr/r/fzBXVxs22bH.png')"
      },
      height: {
        "600px": "600px",
        86: "86%"
      },
      screens: {
        "md-extra": "780px"
      },
      boxShadow: {
        "3xl": "0 0 20px 5px rgba(0, 0, 0, 0.09)"
      },
      maxWidth: {
        812: "812px"
      },
      maxHeight: {
        550: "34rem",
        640: "40rem",
        80: "80%"
      }
    },
    colors: {
      white: "#fff",
      blue: {
        medium: "#0095F6"
      },
      black: {
        light: "#262626",
        faded: "rgba(0,0,0,0.3)"
      },
      gray: {
        base: "#616161",
        background: "#FAFAFA",
        primary: "#dbdbdb",
        second: "#EFEFEF"
      },
      red: {
        primary: "#ed4956"
      },
      transparent: "transparent"
    }
  },
  variants: {
    display: ["group-hover"]
  }
};
