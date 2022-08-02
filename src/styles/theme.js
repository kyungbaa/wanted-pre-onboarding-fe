const theme = {
  black: '#000000',
  white: '#FFFFFF',
  lightGrey: '#B0B0B0',
  middleGrey: '#717171',
  deepGrey: '#222222',
  hoverGrey: '#DBDBDB',
  flexMixin: (align = 'center', justify = 'center') => `
  display:flex;
  align-items:${align};
  justify-content:${justify};
  `,
  text: '#494949',
  grey: '#f3f3f3',
  whiteGrey: '#F8F8F8',
  keyColor: '#FFAD1D',
  pointColor: '#F69D3E',
  red: '#e3352c',
};

export default theme;
