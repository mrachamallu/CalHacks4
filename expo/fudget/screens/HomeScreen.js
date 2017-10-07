import React, { Component } from 'react';
import Expo from 'expo';
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
    budgets: []
  }

  keyExtractor = (item, index) => item.id;

  loadPage = () => {
    var customData = require("./test.json")

            this.setState({
              budgets: customData.topics
            });

  }

  renderBudget = ({item}) => {
    return <BudgetPart

        budget = {item.budget} 
        type = {item.type}
        moneySpent = {item.moneySpent}
        moneyLeft = {item.moneyLeft}
        percentage = {item.percentage}
    />
      
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Load" onPress={this.loadPage} color='#000000'/>
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
});

