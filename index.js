const axios = require('axios');

const llama = async (prompt, stream = false) => {
    const url = 'https://replicate.com/api/models/meta/llama-2-70b-chat/predictions';
    const data = {
        "input": {
            "debug": false,
            "top_p": 1,
            "prompt": prompt,
            "temperature": 0.5,
            "system_prompt": "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
            "max_new_tokens": 500,
            "min_new_tokens": -1,
            "prompt_template": "[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
            "repetition_penalty": 1.15
        },
        "stream": stream
    };

    let response = await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log('Task Created: ', response.data.id);
    let status = '';
    while (status !== 'succeeded') {
        let ndata = await axios.get(`https://replicate.com/api/predictions/${response.data.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        status = ndata.data.status;
        if (status === 'succeeded') {
            return {...ndata.data, final_result: ndata.data.output.join('')};
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking status again
    }
};

module.exports = {llama};
