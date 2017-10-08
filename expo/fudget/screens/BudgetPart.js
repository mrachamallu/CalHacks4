import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
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
    var progressPercent = moneySpent/moneyLeft;
    return (
      <TouchableHighlight underlayColor="#999999"
        onPress={() => {
          
        }}
      >
        <View style={styles.listItem}>
          <Text>
          {(type) ? (<Text style={styles.description}>{type}</Text>) : (null)}
          </Text>
          <Text>
          {(moneySpent && budget) ? (<Text style={styles.moneyDescription}>${moneySpent}/${budget}</Text>) : (null)}
          </Text>
          <Progress.Bar progress={progressPercent} width={250} />
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
    fontSize: 24,
  },
  moneyDescription: {
    color: "#333333",
    fontSize: 16,
  }
});