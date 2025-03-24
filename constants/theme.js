const COLORS = {
    primary: "#ffd900",
    secondary: "#e09e22",
    light: "#fffd96",
    light2: "#daded3",
    dark: "#1c1c18",
    dark2: "#151711",

    cream: "#ebe4a4",
    paleLeaf: "#bceba4",

    white:"#FFFFFF",
    black:"#000000",
    gray: "#999999"
};
  
const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
};
  
const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};
  
const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 5,
    },
};
export const darkTheme = {
    backgroundColor: '#1c1d21',
    textColor: '#FFFFFF',
    containerStyle: {
      backgroundColor: '#2e2e2e',
      textColor: '#FFFFFF'
    },
    subContainerStyle: {
      backgroundColor: '#4d4c4c',
      textColor: '#FFFFFF'
    },
};

export const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  containerStyle: {
    backgroundColor: '#2e2e2e',
    textColor: '#FFFFFF'
  },
  subContainerStyle: {
    backgroundColor: '#4d4c4c',
    textColor: '#FFFFFF'
  },
};
  
  export { COLORS, FONT, SIZES, SHADOWS };
  