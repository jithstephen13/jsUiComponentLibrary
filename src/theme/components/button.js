import colors from '../foundations/colors';

const commonButtonStyle = {
  bg: 'secondary.500',
  color: 'white',
  borderRadius: '8px',
  padding: '12px 40px',
  height: 'max-content',
  border: `1px solid ${colors.secondary[500]}`,
  boxShadow: `0px 9px 21px -14px ${colors.gray[300]}`
};

export default {
  baseStyle: {
    fontSize: '16px'
  },
  variants: {
    secondary: {
      ...commonButtonStyle
    },
    secondary_outline: {
      ...commonButtonStyle,
      bg: 'white',
      color: 'secondary.500',
      _hover: 'secondary.500',
      _active: 'secondary.500'
    },
    primary: {
      ...commonButtonStyle,
      bg: 'primary.500',
      border: `1px solid ${colors.primary[300]}`
    },
    primary_outline: {
      ...commonButtonStyle,
      bg: 'white',
      color: 'primary.500',
      _hover: 'primary.500',
      _active: 'primary.500',
      border: `1px solid ${colors.primary[300]}`
    }
  }
};
