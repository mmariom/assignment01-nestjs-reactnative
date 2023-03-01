import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { BookingEntity } from '../entities/BookingEntity';

export default function AddScreen() {
  const [name, setName] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const navigation: any = useNavigation();


  const handleSave = async () => {
    const newBooking: BookingEntity = {
      name,
      numberOfPeople: parseInt(numberOfPeople),
      date,
      phone,
      email,
      comment,
    };

    try {
      await axios.post('http://localhost:3000/bookings', newBooking);
      navigation.navigate('List');
      console.log(date);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Add new booking:</Text>
      <TextInput placeholder="Name" onChangeText={(text) => setName(text)} value={name} />
      <TextInput
        placeholder="Number of people"
        onChangeText={(text) => setNumberOfPeople(text)}
        value={numberOfPeople}
      />
      <TextInput placeholder="Date (10-05-2012)" onChangeText={(text) => setDate(text)} value={date} />
      <TextInput placeholder="Phone" onChangeText={(text) => setPhone(text)} value={phone} />
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
      <TextInput placeholder="Comment" onChangeText={(text) => setComment(text)} value={comment} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
