import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import plans from '../../../../assets/data/plans.json';
import SplitComponent from '../../../components/SplitComponent.jsx';
import ListItem from '../../../components/ListItem.jsx';
import { Stack } from 'expo-router';
import { useState } from 'react';

function isValidNumber(n){
    return typeof n == 'number' && !isNaN(n) && isFinite(n);
}

export default function PlanDetailsScreen() {
    const params = useLocalSearchParams();
    const [areDetailsExpanded, setAreDetailsExpanded] = useState(false);
    const plan = plans.find(item => (item.id == `${params.plan}`));
    const budget_category = plan.budget_categories.find(item => (item.name == `${params.budget_category}`));

    if(!plan) {
        return (
            <Text>Budget category {budget_category.name} not found</Text>
        );
    }

    const menuList = budget_category.transactions || [
        {
            "name": "No transactions yet..."
        }
    ];
    menuList.forEach( function(a) {
        a.subtitle = (isValidNumber(a.amount))? `$${a.amount.toFixed(2)}`: "";
        a.link = null;
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
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Stack.Screen options={{ title: "Budget Category" }} />

                <View style={styles.panel}>
                    <Text style={styles.name}>{plan.name}</Text>
                    <Text style={styles.name}>{budget_category.name}</Text>
                    <SplitComponent item={{left: "Remaining Budget", right: `$${remainingBudget.toFixed(2)}`}}/>
                    <View style={styles.subtitle}>
                        <Text style={styles.subValue}>Initial Funds: ${plan.initial_funds.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
            <View contentContainerStyle={styles.container}>
                <FlatList
                data={menuList}
                contentContainerStyle={{ gap: 5 }}
                keyExtractor={(item, index) => `${index} ${item.name}`}
                renderItem={ ({ item }) => <ListItem item={item} />}
                />
            </View>
        </View>
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