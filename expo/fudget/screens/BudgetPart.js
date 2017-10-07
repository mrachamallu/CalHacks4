import React, { Component } from 'react';
import { 
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';

export default class BudgetPart extends Component {

  state = {
    
  }
  render() {

      budget = this.props.budget;
      type = this.props.type;
    moneySpent = this.props.moneySpent;
    moneyLeft = this.props.moneyLeft;
    percentage = this.props.percentage;
    return (
      <TouchableHighlight underlayColor="#999999"
        onPress={() => {
          
        }}
      >
        <View style={styles.listItem}>
          <Text>
          {(type) ? (<Text style={styles.description}>{type}</Text>) : (<Text style={styles.description}>Hello</Text>)}
          </Text>
        </View>
      </TouchableHighlight>
    ); 
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 30,
    borderBottomColor: '#7f8c8d',
    borderBottomWidth: 1,

  },
  description: {
    color: "#333333",
    fontSize: 16
  }
});