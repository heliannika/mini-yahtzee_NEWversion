import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: 'lightblue',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'sans-serif-thin'
  },
  author: {
    color: 'lightblue',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'sans-serif-thin'
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    backgroundColor: 'lightblue',
    width: 70,
    paddingLeft: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'sans-serif-thin',
    color: 'white'
  },
  home: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  nameboardText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 25,
    color: 'lightblue'
  },
  nameInput: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 200,
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'lightpink',
    color: 'white',
  },
  rulesTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    marginBottom: 5,
  },
  playButton: {
    backgroundColor: 'lightblue',
    width: 70,
    height: 35,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'lightpink',
    padding: 4,
    paddingLeft: 10,
    marginTop: 5
  },
  playButtonText: {
    color: 'white',
    fontFamily: 'sans-serif-thin',
    fontSize: 20
  },
  gameboardText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 15,
    color: 'lightblue',
    fontWeight: 'bold',
    marginTop: 5
  },
  playerText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 35,
    color: 'lightpink',
    fontWeight: 'bold',
  },
  pointsText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 20,
    color: 'lightblue',
    fontWeight: 'bold',
    marginTop: 30
  },
  points: {
    fontFamily: 'sans-serif-thin',
    fontSize: 15,
    color: 'lightblue',
    fontWeight: 'bold',
    marginTop: 30,
  },
  throwButton: {
    backgroundColor: 'lightpink',
    width: 100,
    borderColor: 'lightblue',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 5,
    paddingBottom: 5,
    marginTop: 10,
    height: 40
  },
  buttonText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  gameStatus: {
    fontFamily: 'sans-serif-thin',
    fontSize: 25,
    color: 'lightpink',
    fontWeight: 'bold',
    padding: 10,
  },
  dataTable: {
    backgroundColor: 'lightblue',
    width: 350,
    borderWidth: 2,
    borderColor: 'lightpink',
    borderRadius: 15
  },
  dataTableText: {
    color: 'white',
    fontSize: 11
  },
  clearButton: {
    backgroundColor: 'lightpink',
    width: 150,
    borderColor: 'lightblue',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 4,
    marginTop: 10,
    height: 40,
    paddingTop: 5
  },
  clearText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  }
});