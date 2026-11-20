# Yes Chef!

A platform for generating recipes with selected ingredients with the help of AI. Keep in mind that this is a local development project. Hence, it requires a local AI API key.

## Prerequests

You are required to have a Google AI Studio account (https://aistudio.google.com). If you already have a Google acount, this should automatically direct you to the platform.

```
1. Clone the repository.
2. Copy the example environment file:
   `cp .env.example .env`
3. Once you sign-in and login to Google AI Studio, go to Dashboard by clicking the Dashboard button on mid-left side.
4. The menu should show you a free tier key. Copy this key.
5. Open `.env` that you created on step 2 and replace `<YOUR_API_KEY>` in `VITE_HUGGING_FACE_API_KEY` with your token.
```

## Getting Started

Install the dependencies and run the project

```
npm install
npm run dev
```

Once you see `Local:   http://localhost:5173/`, please go ahead and click on the link or open it on your preferred browser.
