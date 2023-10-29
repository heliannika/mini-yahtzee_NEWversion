import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { DataTable } from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from '../constants/Game';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../style/style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)); // Sorting scores
                setScores(tmpScores);
            }
        }
        catch(e) {
            console.log('Read error: ' + e);
        }
    }

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear();
            setScores([]);
        }
        catch(e) {
            console.log('Clear error: ' + e);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);


    return (
        <>
            <Header />
            <View style={styles.home}>
                <MaterialIcons name="sports-esports" size={100} color="lightpink"/>
                { scores.length === 0 ?
                    <Text>Scoreboard is empty</Text>
                    :
                    scores.map((player, index) => (
                        index < NBR_OF_SCOREBOARD_ROWS &&
                        <DataTable.Row style={styles.dataTable} key={player.key}>
                            <DataTable.Cell><Text style={styles.dataTableText}>{index + 1}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.dataTableText}>{player.name}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.dataTableText}>{player.date}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.dataTableText}>{player.time}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.dataTableText}>{player.points}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))   
                }
            </View>
            <View style={styles.home}>
                <Pressable style={styles.clearButton}
                    onPress={() => clearScoreboard()}>
                        <Text style={styles.clearText}>Clear scoreboard</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}