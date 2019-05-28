import React, { Component } from 'react';
// importação do gifted chat que ajuda não criando de interface de chat
import { GiftedChat } from 'react-native-gifted-chat';
// importação do arquivo Assistant
import { MessageRequest } from './Assistant';

export default class App extends Component {
  // construtor com a
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      context: null,
    }
  }

  // o metodo componentDidMount é executado quando o component do React Native é iniciado
  componentDidMount() {
    this.initalMessage();
  }

  // o metodo render vai renderizar o component GiftedChat
  render() {
    return (
      <GiftedChat
        placeholder="Send your message to Watson..."
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        multiline={false}
        user={{
          _id: '1',
          name: 'E U'
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
