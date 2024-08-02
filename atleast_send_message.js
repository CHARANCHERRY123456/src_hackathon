import twilio from 'twilio'
const accountSid = 'your_account_sid'; // Your Account SID from www.twilio.com/console
const authToken = 'your_auth_token'; // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Node.js',
    to: '+918520811855', // Text this number
    from: '+0987654321', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error('Error sending SMS:', error));
