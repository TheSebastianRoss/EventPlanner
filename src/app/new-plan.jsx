import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListItem from '../components/ListItem.jsx';
import { Stack } from 'expo-router';

// https://www.youtube.com/watch?v=3cD5UFWsNOA
// https://www.youtube.com/watch?v=x7KE4JD-Q9A

export default function NewPlanScreen() {
  const menuList = [
    {
      "name": "From Scratch",
      "link": "create-plan",
      "subtitle": "Start with an empty plan"
    },
    {
      "name": "Import via NFC",
      "link": "import-plan",
      "subtitle": "Import a coworker's plan"
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Start New Plan' }} />

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
