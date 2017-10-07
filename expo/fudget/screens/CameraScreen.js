import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class App extends React.Component {
  state = {
    imageUri: null,
    label: null,
  }

  render() {
    let imageView = null;
    if (this.state.imageUri) {
      imageView = (
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: this.state.imageUri }}
        />
      );
    }

    let labelView = null;
    if (this.state.label) {
      labelView = (
        <Text style={{ margin: 5 }}>
          {this.state.label}
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        {imageView}
        {labelView}
        <TouchableOpacity
          style={{ margin: 5, padding: 5, backgroundColor: '#ddd' }}
          onPress={this._pickImage}>
          <Text>take a picture!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _pickImage = async () => {
    const {
      cancelled,
      uri,
      base64,
    } = await Expo.ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!cancelled) {
      this.setState({
        imageUri: uri,
        label: '(loading...)',
      });
    }

    const body = {
      requests:[
        {
          image:{
            content: base64,
          },
          features:[
            {
              type: 'TEXT_DETECTION',
              maxResults: 100,
            }
          ]
        },
      ],
    };

    const key = 'AIzaSyCScDq8xvUnb1x4JDyt9zRHawD-imeyzuE';
    const response_vis = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parsed_vis = await response_vis.json();
    this.setState({
      label: parsed_vis.responses[0].textAnnotations[0].description,
    });

    // // send to custom api
    // const res_db = await fetch('http://localhost:3000/receipts', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(parsed_vision),
    // });
    // const parsed_db = await res_db.json();
    // if(!res_db.fail){
    //   // go to budget page
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

