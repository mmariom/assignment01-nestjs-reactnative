import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookingEntity } from "../entities/BookingEntity";
import EditScreen from "../screens/EditScreen";
import ListScreen from "../screens/ListScreen";
import AddScreen from "../screens/AddScreen";
import DeleteScreen from "../screens/DeleteScreen";

export type StackMain = {
  List: undefined;
  Add: undefined;
  Edit: { booking: BookingEntity };
  Delete: { booking: BookingEntity };
};

const Stack = createNativeStackNavigator<StackMain>();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Delete" component={DeleteScreen} />
    </Stack.Navigator>
  );
}
