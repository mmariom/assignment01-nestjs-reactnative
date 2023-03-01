import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BookingEntity } from '../entities/BookingEntity'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { StackMain } from './Navigation';

type bookingScreenProp = StackNavigationProp<StackMain, 'Edit'>;

interface Props {
  booking: BookingEntity;
}

export default function Booking({ booking }: Props) {
  const navigation = useNavigation<bookingScreenProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Edit", { booking })}>
      <Text>{booking.name} {booking.phone}</Text>
    </TouchableOpacity>
  )
}
