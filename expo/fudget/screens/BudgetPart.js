import React, { Component } from 'react';
import { 
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';

export default class BudgetPart extends Component {

  state = {
    
  }
  render() {
    type = this.props.type;
    budget = this.props.budget;
    moneySpent = this.props.moneySpent;
    moneyLeft = this.props.moneyLeft;
    percentage = this.props.percentage;
    
    return (
      <TouchableWithoutFeedback 
        onPress={() => {
          
        }}
      >
        <View style={styles.listItem}>
          {type} {budget} {moneySpent} {moneyLeft} {percentage}
        </View>
      </TouchableWithoutFeedback>
    ); 
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 30,
    borderBottomColor: '#7f8c8d',
    borderBottomWidth: 1
  },
});