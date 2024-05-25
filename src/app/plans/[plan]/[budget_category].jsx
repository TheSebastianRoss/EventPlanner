import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import utils from '../../utils.jsx';
import plans from '../../../../assets/data/plans.json';
import SplitComponent from '../../../components/SplitComponent.jsx';
import ListItem from '../../../components/ListItem.jsx';
import { Stack } from 'expo-router';
import { useState } from 'react';

function isValidNumber(n) {
    return typeof n == 'number' && !isNaN(n) && isFinite(n);
}

function deepClone(o) {
    return JSON.parse(JSON.stringify(o));
}

export default function PlanDetailsScreen() {
    const params = useLocalSearchParams();
    const [areDetailsExpanded, setAreDetailsExpanded] = useState(false);
    const plan = plans.find(item => (item.id == `${params.plan}`));
    const budget_category = plan.budget_categories.find(item => (item.name == `${params.budget_category}`));

    if(!plan || !budget_category) {
        return (
            <Text>Budget category {params.budget_category} not found in plan {params.plan}</Text>
        );
    }

    let menuList = [
        {
            "name": "No transactions yet..."
        }
    ];
    menuList = utils.deepClone(budget_category.transactions) || menuList;
    menuList.forEach( function(a) {
        a.subtitle = (utils.isValidNumber(a.amount))? `$${a.amount.toFixed(2)}`: "";
        a.link = null;
    });
    menuList.unshift({
        "name": "Allocate Funds",
        "subtitle": "",
        "link": `plans/${plan.id}/${budget_category.name}/allocateFunds`
    });
    menuList.push({
        "name": "Add Transaction",
        "subtitle": "",
        "link": `plans/${plan.id}/${budget_category.name}/addTransaction`
    });

    let remainingBudget = parseInt(budget_category.fund_allocation);

    if(budget_category.fund_allocation === "auto") {
        remainingBudget = plan.initial_funds;
    
        for(let i = 0; i < plan.budget_categories.length; i++) {
            if(!utils.isValidNumber(parseInt(plan.budget_categories[i].fund_allocation))) {
                continue;
            }

            remainingBudget -= plan.budget_categories[i].fund_allocation;
        }
    }

    for(let i = 0; i < budget_category.transactions.length; i++) {
        let amount = budget_category.transactions[i].amount;
        if(utils.isValidNumber(amount)) {
            remainingBudget += amount;
        }
    }

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Stack.Screen options={{ title: "Budget Category" }} />

                <View style={styles.panel}>
                    <Text style={styles.name}>{plan.name}</Text>
                    <Text style={styles.name}>{budget_category.name}</Text>
                    <SplitComponent item={{left: "Remaining Allocation", right: `$${remainingBudget.toFixed(2)}`}}/>
                    <View style={styles.subtitle}>
                        <Text style={styles.subValue}>Total Allocation: {utils.isValidNumber(parseInt(budget_category.fund_allocation))? `$${parseInt(budget_category.fund_allocation).toFixed(2)}`: budget_category.fund_allocation}</Text>
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