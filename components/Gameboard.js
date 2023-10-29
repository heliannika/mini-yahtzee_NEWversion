import { useEffect, useState } from "react";
import { Pressable, Text, View, Alert } from "react-native";
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from "../constants/Game";
import styles from '../style/style';
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Scoreboard from '../components/Scoreboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

let board = [];
let addBonus = true

export default Gameboard = ({navigation, route}) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    // Ovatko nopat ovat kiinnitetty
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    // Noppien silmäluvut
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    // Onko silmäluvulle valittu pisteet
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    // Kerätyt pisteet
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    //const [isDisabled, setIsDisabled] = useState(false);
    let dices = [...selectedDices];
    // Tulostaulun pisteet
    const [scores, setScores] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [bonusPointsStatus, setBonusPointsStatus] = useState('');
    const [throwDices18times, setThrowDices18times] = useState(0);
    const [thrown18times, setThrown18times] = useState(false);

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();

    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                    key={"dice" + dice}
                    onPress={() => selectDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key={"dice" + dice}
                        size={50}
                        color={getDiceColor(dice)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                    <Text style={styles.points} key={"pointsRow" + spot}>
                        {getSpotTotal(spot)}
                    </Text>
            </Col>
        )
    }

    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                    key={"buttonsRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}
                    >

                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                        >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        else {
            setStatus('You have to throw dices first.')
        }
    }


    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                points[i] = nbrOfDices * (i + 1);
            }
            else {
                setStatus('You already selected points for ' +  (i + 1));
                return points[i];
            }
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            undoDiceSelection();

            return points[i];
        }
        else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points');
        }
    }

    // Unselecting dices during the game.

    const undoDiceSelection = () => {
        dices.fill(false);
        setSelectedDices(dices);
    }

    const savePlayerPoints = async() => {
        const newKey = scores.length + 1;
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: date + '.' + month + '.' + year,
            time: hours + ':' + min,
            points: totalPoints
        }
        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        }
        catch(e) {
            console.log('Saver error: ' + e);
        }
    }

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }
        }
        catch (e) {
            console.log('Read error: ' + e);
        }
    }

    const throwDices = () => {
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('Select your points before the next throw');
            // checkBonusPoints();
            return 1;
        }
        else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false);
            diceSpots.fill(0);
            dicePointsTotal.fill(0);
        }

        let spots = [...diceSpots];

        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }

        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
    }

    // Alerting the player about the game ending.

    const gameOverAlert = () =>
    Alert.alert('Game over! You got ' + totalPoints + ' points.', 'Start a new game by throwing dices!', [
        {
            text: 'Go to scoreboard',
            onPress: () => navigation.navigate('Scoreboard'),
        },
        {
            text: 'Play again',
        },
    ]);

    // Function for the new game.

    const newGame = () => {
        board = [];
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setBonusPointsStatus('');
        diceSpots.fill(0);
        addBonus = true;
    }
    

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "deeppink" : "lightpink";
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "deeppink" : "lightpink";
    }

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    // Addition for total points & checking if the player got bonus points

    useEffect(() => {

        let sum = 0;

        for (let i of dicePointsTotal) {
            sum = sum + i;

            if (sum >= 63 && addBonus == true) {
                bonussum = sum + 50;
                setBonusPointsStatus('You got bonus points (+50p)!');
                addBonus = false;
                sum = bonussum;
            }
            else if (addBonus == false) {
                setBonusPointsStatus('You got bonus points (+50p)!');
                bonussum;
                sum = bonussum;
            }
        }

        setTotalPoints(sum);
    })

    /* Starting the game again after points are selected for every number and saving player points. */

   useEffect(() => {
        if (selectedDicePoints.every((val) => val === true)) {
            setThrown18times(true);
        }

        if (thrown18times === true) {
            savePlayerPoints();
            gameOverAlert();
            newGame();
            setThrowDices18times(0);
            setDiceSpots(new Array(NBR_OF_DICES).fill(0));
            setThrown18times(false);
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
    })

    return (
        <>
            <Header />
            <View style={styles.home}>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text style={styles.gameboardText}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gameStatus}>{status}</Text>
                <Pressable style={styles.throwButton}
                    onPress={() => throwDices()}
                    >
                        <Text style={styles.buttonText}>THROW
                        <MaterialCommunityIcons name="dice-multiple-outline" size={20} color="lightblue" /></Text>
                </Pressable>
                <Container fluid>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container fluid>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text style={styles.pointsText}>Points total: {totalPoints}</Text>
                <Text style={styles.gameboardText}>{bonusPointsStatus}</Text>
                <Text style={styles.playerText}>Player: {playerName}</Text>
                <SimpleLineIcons name="game-controller" size={120} color="lightpink" />
            </View>
            <Footer />
        </>
    )
}