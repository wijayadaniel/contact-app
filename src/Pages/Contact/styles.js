import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingVertical: 20,
  },
  flex: {flex: 1},
  row: {flexDirection: 'row', paddingVertical: scale(4)},
  cardListContainer: {
    borderRadius: scale(8),
    marginHorizontal: scale(12),
    marginVertical: scale(4),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 4,
  },
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: 'pink',
    padding: scale(4),
    marginVertical: scale(2),
    marginHorizontal: scale(16),
  },
  title: {
    fontSize: moderateScale(20, 0.5),
    justifyContent: 'center',
    textAlignVertical: 'center',
    height: scale(40),
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  ageText: {fontSize: 14, paddingVertical: scale(2), marginLeft: scale(4)},
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0f6ab4',
    position: 'absolute',
    bottom: scale(20),
    right: scale(12),
    alignItems: 'center',
  },
  hiddenContainer: {
    marginLeft: moderateScale(84),
    paddingBottom: scale(8),
  },
  buttonActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: scale(220),
    paddingLeft: scale(2),
  },
  floatingText: {fontSize: moderateScale(38), color: '#fff'},

  // container: {flex: 1, backgroundColor: 'white'},
  detailContainer: {
    flex: 1,
    alignItems: 'stretch',
    marginVertical: moderateScale(16),
    marginHorizontal: moderateScale(30),
  },
  inputContainer: {
    borderWidth: 1.5,
    paddingHorizontal: moderateScale(8),
    backgroundColor: '#fff',
    borderColor: '#0f6ab4',
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  labelContainer: {
    color: 'black',
    fontSize: scale(14),
  },
  labelContent: {
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(4),
  },
  inputContent: {
    color: 'black',
    paddingHorizontal: moderateScale(12),
  },
  photoContainer: {
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: scale(16),
  },
  avatarDetail: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: scale(100),
    alignSelf: 'center',
  },
  cameraIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
