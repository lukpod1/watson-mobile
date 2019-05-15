MessageRequest = async (input, context = {}) => {

    console.log(input)
    let body = {
        input: {
            "text": input
        },
        context: context
    };

    const resp = await (await fetch('http://10.50.113.93:3000/conversation/', {
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