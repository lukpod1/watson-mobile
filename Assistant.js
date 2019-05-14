import base64 from 'react-native-base64'
// 
// Watson Assistant API documentation:
// https://console.bluemix.net/apidocs/assistant

MessageRequest = async(input, context = {}) => {

    let body = {
        alternate_intents: true,
        input: {
            'text': input
        }
    };
    if (context) {
        body.context = context;
    }
    return fetch('http://192.168.1.5:3000/conversation/', {
        method: 'POST',
        headers: {
            // Authorization: 'Basic ' + base64.encode("apikey:KjcI6wFW-v2MtmHAxuLY5sRdS0_OqMwNG3849n5Ws77y"),
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