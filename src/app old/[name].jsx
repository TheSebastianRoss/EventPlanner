import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import staffPositions from '../../assets/data/staff.json';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function StaffPositionDetailsScreen() {
    const params = useLocalSearchParams();
    const [areDetailsExpanded, setAreDetailsExpanded] = useState(false);
    const staffPosition = staffPositions.find(item => item.Name == params.name);

    if(!staffPosition) {
        return (
            <Text>Staff position not found</Text>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: staffPosition.Name }} />

            <View style={styles.panel}>
                <Text style={styles.staffPositionName}>{staffPosition.Name}</Text>
                <View style={styles.StaffPositionSubtitle}>
                    <Text style={styles.subValue}>Type: {staffPosition.Type.toUpperCase()}</Text>
                    <Text style={styles.subValue}>Cost: {staffPosition.Cost} {staffPosition.Cost_Units.toUpperCase()}</Text>
                    <Text style={styles.subValue}>Equipment: {staffPosition.Equipment[0].Name.toUpperCase()}</Text>
                    <Text style={styles.subValue}>Equipment Cost: {staffPosition.Equipment[0].Cost} {staffPosition.Equipment[0].Cost_Units.toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.panel}>
                <Text style={styles.subValue} numberOfLines={areDetailsExpanded? 0: 3}>
                    {staffPosition.Details}
                </Text>
                <Text onPress={() => setAreDetailsExpanded(!areDetailsExpanded)} style={styles.seeMore}>
                    {areDetailsExpanded? "See Less": "See More"}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    },
    staffPositionContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        gap: 5,
        margin : 2,

        // shadow
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2
    },
    staffPositionName: {
        fontSize: 20,
        fontWeight: '500',
    },
    StaffPositionSubtitle: {
        color: 'dimgray'
    },
    seeMore: {
        alignSelf: 'center',
        padding: 10,
        fontWeight: '600',
        color: 'gray'
    }
});