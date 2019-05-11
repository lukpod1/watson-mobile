import base64 from 'react-native-base64'

// Watson Assistant API documentation:
// https://console.bluemix.net/apidocs/assistant
MessageRequest = (input, context = {}) => {
    let body = {
        alternate_intents: true,
        input: {
            'text': input
        }
    };
    if (context) {
        body.context = context;
    }
    return fetch('https://serverwatsonchatbot.herokuapp.com/conversation/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((responseJson) => {

            // console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

}

module.exports = {
    MessageRequest
}