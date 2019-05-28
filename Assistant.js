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