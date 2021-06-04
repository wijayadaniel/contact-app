import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  getContactDetail,
  postContact,
  updateContact,
} from '../../Services/contact';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import ActionButton from '../../Components/atom/ActionButton';
import Loading from '../../Components/atom/Loading';
import {styles} from './styles';

const ContactDetail = ({route, navigation}) => {
  const [detail, setDetail] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const {type, contactId} = route.params;

  useEffect(() => {
    if (contactId === null) {
      setIsLoading(false);
    } else {
      getContactDetail(contactId).then(response => {
        setDetail(response.data);
        setIsLoading(false);
      });
    }
  }, [contactId]);

  const selectPhotoTapped = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        Toast.show(
          'Image size: ' + (image.size / 1024 / 1024).toFixed(2) + 'Mb',
          Toast.LONG,
        );
        if (image.size > 5242880) {
          Toast.show('file size greater than 5MB', 10);
        } else {
          setDetail({...detail, photo: image.path});
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const saveData = () => {
    if (type === 'edit') {
      updateContact(contactId, detail)
        .then(response => {
          setIsLoading(false);
          Toast.show(response.message, Toast.LONG);
        })
        .catch(err => {
          setIsLoading(false);
          Toast.show(err);
        });
    } else {
      postContact(detail).then(response => {
        setIsLoading(false);
        Toast.show(response.message, Toast.LONG);
        navigation.pop();
      });
    }
  };

  const {firstName, lastName, age, photo} = detail;
  if (isLoading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.detailContainer}>
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => (type !== 'info' ? selectPhotoTapped() : null)}>
          <View style={{justifyContent: 'flex-end'}}>
            <Image
              source={
                photo
                  ? {uri: photo}
                  : require('../../Assets/profile_unknown.png')
              }
              style={styles.avatarDetail}
            />
            {type === 'edit' || type === 'create' ? (
              <Image
                source={require('../../Assets/icon_navbar_camera.png')}
                style={styles.cameraIcon}
              />
            ) : null}
          </View>
        </TouchableOpacity>
        <FloatingLabelInput
          label="First Name"
          value={firstName}
          staticLabel
          editable={type !== 'info' ? true : false}
          containerStyles={styles.inputContainer}
          customLabelStyles={styles.labelContainer}
          labelStyles={styles.labelContent}
          inputStyles={styles.inputContent}
          onChangeText={value => setDetail({...detail, firstName: value})}
        />
        <FloatingLabelInput
          label="Last Name"
          value={lastName}
          editable={type !== 'info' ? true : false}
          containerStyles={styles.inputContainer}
          customLabelStyles={styles.labelContainer}
          labelStyles={styles.labelContent}
          inputStyles={styles.inputContent}
          onChangeText={value => setDetail({...detail, lastName: value})}
        />
        <FloatingLabelInput
          label="Age"
          value={age.toString()}
          keyboardType="numeric"
          editable={type !== 'info' ? true : false}
          containerStyles={styles.inputContainer}
          customLabelStyles={styles.labelContainer}
          labelStyles={styles.labelContent}
          inputStyles={styles.inputContent}
          onChangeText={value => setDetail({...detail, age: value})}
        />
        {type !== 'info' ? (
          <View style={{alignItems: 'flex-end'}}>
            <ActionButton
              buttonText={'Save'}
              customStyles={{paddingVertical: 12, paddingHorizontal: 36}}
              onPress={() => {
                setIsLoading(true);
                saveData();
              }}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetail;
