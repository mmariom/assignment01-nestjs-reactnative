import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackMain } from '../components/Navigation';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { BookingEntity } from '../entities/BookingEntity';
import axios from 'axios';

type EditScreenRouteProp = RouteProp<StackMain, 'Edit'>;

type EditScreenProps = {
  route: EditScreenRouteProp;
  navigation: any; // define the navigation prop type as 'any'
};

export default function EditScreen({ route, navigation }: EditScreenProps) {
  const booking: BookingEntity = route.params.booking;
  const [name, setName] = useState(booking.name);
  const [numberOfPeople, setNumberOfPeople] = useState(
    booking.numberOfPeople.toString()
  );
  const [date, setDate] = useState(booking.date.toString());
  const [phone, setPhone] = useState(booking.phone);
  const [email, setEmail] = useState(booking.email);
  const [comment, setComment] = useState(booking.comment);

  const handleSave = async () => {
    try {
      const editedBooking = new BookingEntity(
        name,
        Number(numberOfPeople),
        date,
        phone,
        email,
        comment,
        booking.id
      );

      // Make an HTTP PUT request to update the booking
      await axios.put(`http://localhost:3000/bookings/${booking.id}`, editedBooking);

      console.log(booking.id);
      console.log();

      // N  avigate back to the ListScreen with the edited booking
      navigation.navigate('List', { editedBooking });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>id</Text>
      <Text>{booking.id}</Text>


      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Number of People</Text>
      <TextInput
        value={numberOfPeople}
        onChangeText={setNumberOfPeople}
        keyboardType="numeric"
      />
      <Text>Date</Text>
      <TextInput value={date} onChangeText={setDate} />
      <Text>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Comment</Text>
      <TextInput value={comment} onChangeText={setComment} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
