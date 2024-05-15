import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';


export default function SplitComponent(props) {
    let {item, index} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{item.left}</Text>
            <Text style={styles.main}>{item.right}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        gap: 5,
        marginHorizontal: 2,
        marginVertical: 10,

        display: "flex",
        flexDirection: "row",

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
    layoutRow: {
        display: "flex",
        flexDirection: "row"
    },
    main: {
        fontSize: 20,
        fontWeight: '500',
        width: "50%",
        textAlignVertical: "center"
    },
    label: {
        color: 'dimgray',
        width: "50%",
        textAlignVertical: "center"
    }
});