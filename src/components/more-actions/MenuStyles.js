import colors from '../../theme/foundations/colors';

const component = {};

const style = {
  '.menu-btn + div div': {
    boxShadow: '0px 25px 33px 0px rgba(0, 0, 0, 0.19)',
    padding: '15px',
    borderRadius: '11px',
    outline: 0,
    border: 0
  },
  '.menu-btn + div > div::after': {
    content: "''",
    position: 'absolute',
    width: '22px',
    height: '22px',
    borderRadius: '5px',
    background: colors.white,
    right: '-10px',
    top: '50%',
    transform: 'translateY(-120%) rotate(45deg)',
    zIndex: '0'
  },
  '.menu-btn + div div button': {
    padding: '10px 12px',
    borderRadius: '8px',
    color: colors.gray[800],
    position: 'relative',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '14px',
    transition: 'all 150ms ease-in-out',
    ':hover': {
      background: `${colors.primary[500]} !important`,
      color: colors.white
    },
    ':focus': {
      background: colors.white
    }
  },
  '.menu-btn + div div button:not(:last-of-type):after': {
    content: "''",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '1px',
    left: 0,
    right: 0,
    background: colors.gray[100]
  }
};

export default { component, style };
