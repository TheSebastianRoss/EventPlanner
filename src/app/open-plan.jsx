import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListItem from '../components/ListItem.jsx';
import { Stack } from 'expo-router';
import plans from '../../assets/data/plans.json';

// https://www.youtube.com/watch?v=3cD5UFWsNOA
// https://www.youtube.com/watch?v=x7KE4JD-Q9A

export default function OpenPlanScreen() {
  let menuList = plans || [];

  menuList.forEach(function(menuItem) {
    menuItem.link = `plans/${menuItem.id}`;
  });
  
  if(menuList.length < 1) {
    menuList.push({
      "name": "No projects yet...",
      "link": "",
      "subtitle": "Back to menu",
    });
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Open Existing Plan' }} />

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
