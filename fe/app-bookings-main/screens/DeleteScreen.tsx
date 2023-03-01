import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackMain } from '../components/Navigation';
import React from 'react';
import axios from 'axios';

import { View, Text, Button } from 'react-native';
import { BookingEntity } from '../entities/BookingEntity';

type DeleteScreenRouteProp = RouteProp<StackMain, 'Delete'>;

type DeleteScreenProps = {
  route: DeleteScreenRouteProp;
};

export default function DeleteScreen({ route }: DeleteScreenProps) {
  const navigation:any = useNavigation();
  const booking: BookingEntity = route.params.booking;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/bookings/${booking.id}`);
      navigation.navigate('List', { deletedBookingId: booking.id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>Are you sure you want to delete {booking.name}?</Text>
      <Button title="Delete" onPress={handleDelete} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
}
