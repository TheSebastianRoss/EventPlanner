import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';


export default function StaffListItem(props) {
    let {item, index} = props;
    return (
      <Link href={`/${item.Name}`} asChild>
        <Pressable style={styles.staffPositionContainer}>
          <Text style={styles.staffPositionName}>{item.Name}</Text>
          <Text style={styles.StaffPositionSubtitle}>
            {item.Type.toUpperCase()} | {item.Cost} {item.Cost_Units.toUpperCase()}
          </Text>
        </Pressable>
      </Link>
    );
}

const styles = StyleSheet.create({
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
    }
});