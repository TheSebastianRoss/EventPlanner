import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';


export default function ListItem(props) {
    let {item, index} = props;

    if(item.link === null) {
      return (
          <Pressable style={styles.container}>
            <Text style={styles.name}>{item.name}</Text>
            {
              (item.subtitle)?
                (<Text style={styles.subtitle}>
                  {item.subtitle.toUpperCase()}
                </Text>)
              :
                ("")
            }
            
          </Pressable>
      );
    } else {
      return (
        <Link href={`/${item.link}`} asChild>
          <Pressable style={styles.container}>
            <Text style={styles.name}>{item.name}</Text>
            {
              (item.subtitle)?
                (<Text style={styles.subtitle}>
                  {item.subtitle.toUpperCase()}
                </Text>)
              :
                ("")
            }
            
          </Pressable>
        </Link>
      );
    }
}

const styles = StyleSheet.create({
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
        fontWeight: '500',
    },
    subtitle: {
        color: 'dimgray'
    }
});