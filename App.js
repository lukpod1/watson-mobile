/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import api from './services/index';
import { MessageRequest } from './Assistant';
import { axios } from 'axios'
// import WatsonIcon from './WatsonIcon';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      conversationID: null,
      context: null,
    }
  }

  componentDidMount() {
    this.initalMessage();
  }

  render() {
    return (
      <GiftedChat
        placeholder="Send your message to Watson..."
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        multiline={false}
        user={{
          _id: '1',
        }}
      />
    );
  }

  onSend = (message = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }), () => {
      this.getMessage(message[0].text.replace(/[\n\r]+/g, ' '));
    });
  }

  initalMessage = async () => {
    let response = await MessageRequest("");

    // let response = await api.post('/conversation/', {
    //   text: "",
    //   context: ""
    // })

    this.setState({
      context: response.context,
    })

    let message = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: response.output.text.join(' '),
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Watson Assistant',
      },
      image: 'https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/d4IAAOSw-CpX~8b~/$_35.JPG',
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));



  }

  getMessage = async (text) => {
    let response = await MessageRequest(text, this.state.context)

    // let response = await api.get("/conversation/", {
    //   text: text,
    //   context: this.state.context
    // })

    this.setState({
      context: response.context,
    })
    let message = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: response.output.text.join(' '),
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Watson Assistant',
      },
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));



  }

}

const styles = StyleSheet.create({
});


