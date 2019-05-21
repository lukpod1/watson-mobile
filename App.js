import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { MessageRequest } from './Assistant';

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
    }))
    console.log(message[0].text)

    this.getMessage(message[0].text)

    console.log(message[0].text)

  }

  initalMessage = async () => {
    try {
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
  }

  getMessage = async (text) => {
    console.log(text)

    let response = await MessageRequest(text, this.state.context)

    console.log(response)

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
