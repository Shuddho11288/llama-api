# Using the Llama API

## Introduction
Llama is an API that generates predictions based on given prompts. This document provides guidance on how to use the Llama API.

## Installation
To use the Llama API, you'll need Node.js installed on your system.

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Create a new directory for your project and navigate into it using the terminal.
3. Initialize a new Node.js project using `npm init -y`.
4. Install Llama API package using `npm install git+https://github.com/shuddho11288/llama-api.git`.

## Usage
Follow these steps to use the Llama API:

1. Import the Llama API package into your project.
2. Initialize the `llama` function by calling it with your desired prompt.
3. The function returns a promise with the predictions generated by Llama.

Here's an example code snippet:

```javascript
const { llama } = require('@shuddho11288/llama-api');

// Example usage
llama('Make me a for loop in assembly').then(data=>{
    console.log(data)
})
