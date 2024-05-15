import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import staff from '../../assets/data/staff.json';
import StaffListItem from '../components/StaffListItem.jsx';
import { Stack } from 'expo-router';

// https://www.youtube.com/watch?v=3cD5UFWsNOA
// https://www.youtube.com/watch?v=x7KE4JD-Q9A

export default function App() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Staff Positions' }} />

      <FlatList
        data={staff}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => `${index} ${item.Name}`}
        renderItem={ ({ item }) => <StaffListItem item={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10
  }
});
