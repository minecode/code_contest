import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html, body, #root {
        height: 100%;
		padding: 0;
		margin: 0;
    }
    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

	h1, h2 {
		color: var(--white)
	}

	.light {
		--primary: #f1f1f1;
		--secondary: #e1e1e1;
		--tertiary: #d1d1d1;
		--quaternary: #74777a;
		--quinary: #d1d1d1;
		--senary: #393d42;
		--white: #36393f;
		--gray: #2f3136;
		--chat_input: rgb(32,34,37);
		--symbol: #292b2f;
		--notification: #f84a4b;
		--discord: #5d80d6;
		--mention_detail: #f9a839;
		--mention_message: #413f3f;
		--link: #6e86d6;
		--rocketseat: #6633cc;
		--green: #149414;
	}

	.dark {
		--primary: #36393f;
        --secondary: #2f3136;
        --tertiary: rgb(32,34,37);
        --quaternary: #292b2f;
        --quinary: #393d42;
        --senary: #828386;
        --white: #fff;
        --gray: #8a8c90;
        --chat_input: rgb(64,68,75);
        --symbol: #74777a;
        --notification: #f84a4b;
        --discord: #6e86d6;
        --mention_detail: #f9a839;
        --mention_message: #413f3f;
        --link: #5d80d6;
        --rocketseat: #6633cc;
        --green: #149414;
	}
`
