import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BookingEntity } from '../entities/BookingEntity';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackMain } from '../components/Navigation';

type ListScreenNavigationProp = StackNavigationProp<StackMain, 'List'>;

export default function ListScreen() {
  const [bookings, setBookings] = useState<BookingEntity[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<ListScreenNavigationProp>();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:3000/bookings')
      .then((response) => setBookings(response.data))
      .catch((error) => console.log(error));
  };

  const handleAddPress = () => {
    navigation.navigate('Add');
  };

  const handleEditPress = (booking: BookingEntity) => {
    navigation.navigate('Edit', { booking });
  };

  const handleDeletePress = (booking: BookingEntity) => {
    navigation.navigate('Delete', { booking });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
    setRefreshing(false);
  };

  const renderBooking = ({ item }: { item: BookingEntity }) => {
    return (
      <TouchableOpacity onPress={() => handleEditPress(item)}>
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDeletePress(item)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>List Screen</Text>
      <TouchableOpacity onPress={handleAddPress}>
        <Text>Add Booking</Text>
      </TouchableOpacity>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        // keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
