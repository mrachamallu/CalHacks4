import Expo from 'expo';
import React from 'react';
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
  Platform
} from 'react-native';

import BudgetPart from './BudgetPart';

export default class App extends React.Component {
  state = {
      categories: [],
  }

  loadMonth = () => {
    fetch("test.json")
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              categories: data.topics
            });
          });
    Keyboard.dismiss()
  }

  renderBudget({topic}) {
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
      <View>
        <Button title="Search" onPress={this.loadMonth} />
        {/*<ProgressCircle
            percent={this.state.proportion} use progressbars
            radius={30}
            borderWidth={8}
            color="#000"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{"$30"}</Text>
        </ProgressCircle>*/}
      </View>

      <FlatList
        data={this.state.categories}
        renderItem={this.renderBudget}
        style={styles.list}
      />
      </View>
    );
  }

  _getData = async () => {
    const req_data = await fetch('https://fudget-finance.herokuapp.com/items', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const res_data = await req_data.json();
    this.setState({
      data: JSON.stringify(res_data),
      items: res_data.items,
      budget: res_data.budget,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  list: {
    width: '100%'
  },
});

