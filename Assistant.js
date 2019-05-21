// Watson Assistant API documentation:
// https://console.bluemix.net/apidocs/assistant

MessageRequest = (input, context = {}) => {

    let body = {
        input: {
            'text': input,
            'context': context
        }
    };
    if (context) {
        body.context = context;
    }
    return fetch('https://watsonserver.herokuapp.com/conversation', {
        method: 'POST',
        headers: {            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body.input)
    })
        .then((response) => response.json())
        .then((responseJson) => {
           
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

}

module.exports = {
    MessageRequest 
}