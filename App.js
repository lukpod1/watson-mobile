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
    try {
      // const response = await api.post('/conversation/', {
      //   message: '',
      //   context: ''
      // })
      let response = await MessageRequest("");

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
        image: 'https://guiaarturnogueira.com.br/wp-content/uploads/2016/02/verona.jpg',
      };
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    } catch (error) {
      alert(error)
    }


  }

  getMessage = async (text) => {
    try {
      let response = await MessageRequest(text, this.state.context)

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
    } catch (error) {
      alert(error)
    }
  }

}

const styles = StyleSheet.create({
});


