import colors from '../../theme/foundations/colors';

const component = {};
const style = {
  '.center': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    paddingTop: '20px !important'
  },
  '.p-20': {
    paddingRight: '20px'
  },
  '.rows': {
    color: 'gray.400'
  },
  '#rowsPerPage': {
    background: 'white'
  },
  '.mr-5': {
    marginRight: '5px'
  },
  '.prevBtn, .NxtBtn, .indexBtn': {
    borderRadius: '5px',
    marginRight: '5px',
    border: `1px solid ${colors.tertiary[500]}`,
    background: 'colors.white',
    color: 'tertiary.500',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0px 10px 0px 10px'
  },
  '.activePrevBtn, .activeIndexBtn, .activeNxtBtn': {
    borderRadius: '5px',
    marginRight: '5px',
    border: `1px solid ${colors.blue[200]}`,
    background: 'tertiary.500',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0px 10px 0px 10px'
  },
  '.flex': {
    display: 'flex'
  }

};

export default { component, style };
