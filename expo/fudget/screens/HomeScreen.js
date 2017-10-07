import Expo from 'expo';
import React from 'react';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class App extends React.Component {
  state = {
    data: null,
    items: null,
    budget: null
  }

  render() {
    var budgets = [];
    if(this.state.items != null){
      for (var i = 0; i < this.state.items.length; i++) {
        budgets.push(
          <View>
            <Progress.Bar progress={(this.state.budget-this.state.items[i].price)/this.state.budget} width={300} />
            <Text>this.state.items[i].itemName</Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ margin: 5, padding: 5, backgroundColor: '#ddd' }}
          onPress={this._getData}>
          <Text>Refresh</Text>
          {this.state.data}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 5, padding: 5, backgroundColor: '#ddd' }}
          onPress={this._openWeekly}>
          {budgets}
        </TouchableOpacity>
      </View>
    );
  }
}

_openWeekly = function(){
  // redirect to weekly
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

