import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import plans from '../../../assets/data/plans.json';
import SplitComponent from '../../components/SplitComponent.jsx';
import ListItem from '../../components/ListItem.jsx';
import { Stack } from 'expo-router';
import { useState } from 'react';

function isValidNumber(n){
    return typeof n == 'number' && !isNaN(n) && isFinite(n);
}

export default function PlanDetailsScreen() {
    const params = useLocalSearchParams();
    const [areDetailsExpanded, setAreDetailsExpanded] = useState(false);
    const plan = plans.find(item => (item.link == `plans/${params.plan}`));

    if(!plan) {
        return (
            <Text>Event {plan} not found</Text>
        );
    }

    const menuList = plan.budget_categories || [
        {
            "name": "Unallocated",
            "fund_allocation": "auto",
            "transactions": []
        }
    ];
    menuList.forEach( function(a) {
        a.subtitle = (isValidNumber(a.fund_allocation))? a.fund_allocation: "";
        a.link = `plans/${plan.id}/${a.name}`;
    });

    let remainingBudget = plan.initial_funds;

    for(let i = 0; i < plan.budget_categories.length; i++) {
        for(let j = 0; j < plan.budget_categories[i].transactions.length; j++) {
            let amount = plan.budget_categories[i].transactions[j].amount;
            if(typeof amount == "number") {
                remainingBudget += amount;
            }
        }
    }

    return (
        <View contentContainerStyle={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <Stack.Screen options={{ title: "Plan" }} />

                <View style={styles.panel}>
                    <Text style={styles.name}>{plan.name}</Text>
                    <SplitComponent item={{left: "Remaining Budget", right: `$${remainingBudget.toFixed(2)}`}}/>
                    <View style={styles.subtitle}>
                        <Text style={styles.subValue}>Initial Funds: ${plan.initial_funds.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
            <View contentContainerStyle={styles.panel}>
                <FlatList
                data={menuList}
                contentContainerStyle={{ gap: 5 }}
                keyExtractor={(item, index) => `${index} ${item.name}`}
                renderItem={ ({ item }) => <ListItem item={item} />}
                scrollEnabled={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      // 
      flex: 1,
      padding: 10
    },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    },
    container: {
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
    name: {
        fontSize: 20,
        fontWeight: '500'
    },
    subtitle: {
        color: 'dimgray'
    },
    seeMore: {
        alignSelf: 'center',
        padding: 10,
        fontWeight: '600',
        color: 'gray'
    }
});