import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  SectionList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import ActionButton from '../../Components/atom/ActionButton';
import {deleteContact, getContactList} from '../../Services/contact';
import Loading from '../../Components/atom/Loading';
import {styles} from './styles';

const Contact = ({navigation}) => {
  const [contactList, setContactList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      setSelectedId(null);
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = () => {
    getContactList().then(response => {
      setIsLoading(false);
      setContactList(response);
    });
  };

  const buttonAction = (id, type, title) => {
    const header = type === 'create' ? 'Create New Contact' : title;
    navigation.navigate('ContactDetail', {
      type: type,
      contactId: id,
      headerTitle: header,
    });
  };

  const deleteData = () => {
    deleteContact(selectedId)
      .then(response => {
        if (response.status === 202) {
          setSelectedId(null);
          Toast.show('Contact deleted successfully');
          fetchData();
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        Toast.show(err.message);
        console.log('err on delete', err.message);
      });
  };

  const ConfirmAlert = () =>
    Alert.alert('', 'Are you sure to delete this contact?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setIsLoading(true);
          deleteData();
        },
      },
    ]);

  const Item = ({item, onPress, show}) => (
    <View style={styles.cardListContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={
                item.photo
                  ? {uri: item.photo}
                  : require('../../Assets/profile_unknown.png')
              }
              style={styles.avatar}
            />
          </View>
          <View style={{flex: 3, flexDirection: 'column'}}>
            <Text style={styles.title}>
              {item.firstName + ' ' + item.lastName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {show ? (
        <View style={styles.hiddenContainer}>
          <Text style={styles.ageText}>Age: {item.age}</Text>
          <View style={styles.buttonActionContainer}>
            <ActionButton
              buttonText={'Edit'}
              onPress={() =>
                buttonAction(
                  item.id,
                  'edit',
                  item.firstName + ' ' + item.lastName,
                )
              }
            />
            <ActionButton buttonText={'Delete'} onPress={ConfirmAlert} />
            <ActionButton
              buttonText={'Info'}
              onPress={() =>
                buttonAction(
                  item.id,
                  'info',
                  item.firstName + ' ' + item.lastName,
                )
              }
            />
          </View>
        </View>
      ) : null}
    </View>
  );

  const renderItem = ({item}) => {
    const showItem = item.id === selectedId ? true : false;

    return (
      <Item
        item={item}
        onPress={() => {
          item.id === selectedId ? setSelectedId(null) : setSelectedId(item.id);
        }}
        show={showItem}
      />
    );
  };
  if (isLoading) return <Loading />;
  return (
    <View style={styles.flex}>
      <SectionList
        sections={contactList}
        renderItem={renderItem}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        keyExtractor={item => item.index}
      />
      <TouchableOpacity
        onPress={() => buttonAction(null, 'create')}
        style={styles.floatingButton}>
        <Text style={styles.floatingText}> + </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contact;
