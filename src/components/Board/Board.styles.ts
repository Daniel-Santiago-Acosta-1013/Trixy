import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495E',
    transition: 'all 0.2s ease',
  },
  filledCell: {
    backgroundColor: '#2C3E50',
  },
  rightBorder: {
    borderRightWidth: 2,
    borderRightColor: '#2C3E50',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#2C3E50',
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  xContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  oContainer: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
});