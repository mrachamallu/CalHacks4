import React, { Component } from 'react';
import Expo from 'expo';
import * as Progress from 'react-native-progress';
import {
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  Button, 
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image, 
  Keyboard,
  Platform,
} from 'react-native';

import BudgetPart from './BudgetPart'

export default class App extends Component {
  state = {
    budgets: [],
    maxBudget: 1.0,
    moneySpent: 0.0,
    progPercent: 0.0,
    remaining: 1.0,
  }
  loadPage = () => {
    var data = require("./test.json")
    this.setState({
      budgets: data.topics
    });
    this.setState({
      maxBudget: data.totalBudget
    });
    this.setState({
      moneySpent: data.totalSpent
    });

    this.setState({
      progPercent: data.totalPercent
    });
    this.setState({
      remaining: data.remainder
    });
    alert(this.state.remaining);
  }
  keyExtractor = (item, index) => item.id;
  

  renderBudget = ({item}) => {
    return <BudgetPart

        budget = {item.budget} 
        type = {item.type}
        moneySpent = {item.moneySpent}
        moneyLeft = {item.moneyLeft}
        percentage = {item.percentage}
    />
      
  }
  componentWillMount() {
    this.loadPage();
  }

  render() {
    return (
      <View style={styles.container}>
        <Progress.Pie progress={this.state.progPercent} size={100} style={styles.pieChart}/>
        <View style={styles.remainderStyle}>
        {(this.state.moneySpent <= this.state.maxBudget) ? (<Text>$ {this.state.remaining} left!</Text>) : (<Text>${this.state.remaining} over!</Text>)}
        </View>
        {/*<Button title="Load" onPress={this.loadPage} color='#000000'/>*/}
        <FlatList
          data={this.state.budgets}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderBudget}
          style={styles.list}
        />
        
      </View>
    );
  }
}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%'
  },
  pieChart: {
    padding: 25,
  },
  remainderStyle: {
    fontSize: 16,
  },
});

