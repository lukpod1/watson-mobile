//  Método principal da aplicação, este que faz a comunicação entre o App mobile e o servidor, onde está hospedado o backend em NodeJs.
//  Funciona da seguinte maneira: Quando o método é chamado, ele recebe o input do usuário, ou seja, a mensagem, após converter essa
// mensagem para JSON, faz a requisição para o servidor com o método POST, recebendo a mensagem de resposta, a qual é exibida na tela.
MessageRequest = async (input, context = {}) => {

    const resp = (await fetch('https://watsonserver.herokuapp.com/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: input,
            context: context
        })
    })).json()
    return resp
}

module.exports = {
    MessageRequest
}