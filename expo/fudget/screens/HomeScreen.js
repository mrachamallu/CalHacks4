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

  keyExtractor = (topic, index) => topic.id;

  loadPage = () => {
    fetch('test.json')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              budgets: data.topics
            });
          })
          .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });

    Keyboard.dismiss()
  }

  renderBudget = ({topic}) => {
    return <BudgetPart 
      type = {topic.type}
      budget = {topic.budget}
      moneySpent = {topic.moneySpent}
      moneyLeft = {topic.moneyLeft}
      percentage = {topic.percentage}
      />
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Load" onPress={this.loadPage} color='#000000'/>
        <FlatList
          data={this.state.budgets}
          keyExtractor={this.keyExtractor}
          renderBudget={this.renderBudget}
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

