import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListItem from '../components/ListItem.jsx';
import { Stack } from 'expo-router';

// https://www.youtube.com/watch?v=3cD5UFWsNOA
// https://www.youtube.com/watch?v=x7KE4JD-Q9A

export default function App() {
  const menuList = [
    {
      "name": "Start New Plan",
      "link": "new-plan",
      "subtitle": ""
    },
    {
      "name": "Open Existing Plan",
      "link": "open-plan",
      "subtitle": ""
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Event Planner' }} />

      <FlatList
        data={menuList}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => `${index} ${item.name}`}
        renderItem={ ({ item }) => <ListItem item={item} />}
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
