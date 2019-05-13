# ringcentral-personal-chatbot-js

RingCentral personal chatbot framework.

## Quick start

```bash
git clone git@github.com:rc-personal-bot-framework/ringcentral-personal-chatbot-js.git
cd ringcentral-personal-chatbot-js
cp .env.sample .env
# then fill all required fields in .env, you
npm i
npm run ngrok
# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
```

Login to [developer.ringcentral.com](https://developer.ringcentral.com/) and create Web-based App:

- Application Type: Public
- Platform Type: Browser-based
- Carrier: accept the default values
- Permissions Needed: All of them (ReadContacts, ReadMessages, ReadPresence, Contacts, ReadAccounts, SMS, InternalMessages, ReadCallLog, ReadCallRecording, WebhookSubscriptions, Glip)
- OAuth Redirect URI: Using your ngrok HTTPS URL from above, enter in the following value: `https://xxxx.ap.ngrok.io/rc/oauth`.

```bash
# run sample bot
npm start

# start client dev server
npm run c
```

## Todos

- Skills
- Deploy
- FAQ keywords matching

## License

MIT
