import {request} from './base';

const contactUri = '/contact';

export const getContactList = async () => {
  const res = await request.get(contactUri);
  const {
    data: {data, message},
  } = res;
  console.log('tambahin loading ato placeholder loader', message);

  let contactList = [];
  let aCode = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    let currChar = String.fromCharCode(aCode + i);
    let obj = {
      title: currChar,
    };

    let currContacts = data.filter(item => {
      return item.firstName[0].toUpperCase() === currChar;
    });

    if (currContacts.length > 0) {
      currContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
      obj.data = currContacts;
      contactList.push(obj);
    }
  }
  console.log('*******', contactList);
  // console.log(' ------', contactList);

  return contactList;
};

export const getContactDetail = async id => {
  const res = await request.get(contactUri + '/' + id);
  return res.data;
};

export const postContact = async data => {
  const payload = {...data};
  delete payload.id;

  const res = await request.post(contactUri, payload);

  return res.data;
};

export const deleteContact = async id => {
  const res = await request.delete(contactUri + '/' + id);
  console.log('res.', res.data);
  return res.data;
};

export const updateContact = async (id, body) => {
  const payload = {...body};
  // payload.age.parseInt()
  delete payload.id;
  const res = await request.put(contactUri + '/' + id, payload);
  return res.data;
};
