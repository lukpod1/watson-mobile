import React, { Component } from 'react';

// importação do GiftedChat, bibilioteca UI para react-native que auxilia na criação de chats.
import { GiftedChat } from 'react-native-gifted-chat';

// importação do arquivo Assistant, onde existe o método que vai fazer a comunicação entre 
// o App mobile e o servidor hospedado no heroku.
import { MessageRequest } from './Assistant';

// Declaração da classe principal, esta que vai conter os métodos para as todas as funcionalidades do chat.
export default class App extends Component {
  // Construtor para inicializar os estados messages e context. 
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      context: null,
    }
  }

  // O metodo componentDidMount é executado quando o component do React Native é iniciado.
  componentDidMount() {
    this.initalMessage();
  }

  // O metodo render vai renderizar o component GiftedChat, oriundo da biblioteca importada acima.
  // O componente necessita de alguns paramêtros(props), como o estato "messages", onde as mensagens são guardadas ao enviar.
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

  // Método usado ao enviar uma mensagem, onde vai adicionando cada mensagem no estado. 
  // Dessa forma, o estado será alimentado e poderá ser carregado na tela, exibindo todas as mensagens.
  onSend = (message = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
    console.log(message[0].text)

    this.getMessage(message[0].text)

    console.log(message[0].text)

  }

  // Método usado para gerar a mensagem inicial do chatbot, mandando uma mensagem em branco.
  // Criando um objeto "message", onde há algumas características, tais como o id, gerado um número aleatório
  // o texto, ou seja, a resposta recebida pelo servidor e o "createdAt", momento que a mensagem foi enviada.
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

  // Esse método faz praticamente a mesma coisa do acima, com a diferença de que ao invés
  // de enviar uma mensagem em branco para receber a mensagem inicial, envia a mensagem digitada pelo o usuário,
  // recebendo assim a resposta que o chatbot foi programado para responder.
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
