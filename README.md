# Email Sending Service(Email-APP)
A fault-tolerant email sending service built with Express.js. 
It integrates multiple mock email providers, supports retries with exponential backoff, 
provider fallback, idempotency, rate limiting, and status tracking.

## Features
 ✅ Dual email providers with automatic fallback
 🔁 Retry logic with exponential backoff
 🧠 Idempotency to avoid duplicate sends
 ⏱️ Rate limiting to prevent spamming
 📊 Email status tracking
 🔒 Express.js REST API

 ## 📂 Project Structure
 
├── server.js # Main server
├── emailService.js # Core email logic
│ ├── provider  # class
│ └── EmailService # class
  └── RateLimiting # functionality
  └── sendMain() # method
├── package.json # configuration file of the project
└── package-lock.json
└── node-modules # folder storing all the node modules used in the project


# API Usage
## POST: /send-email
### Send an email using the service.

Body (JSON):
  {
  "id": "102",
  "email": {
    "to": "email@example.com",
    "subject": "Hello",
    "body": "Welcome!"
    }
  }
Response:
{
"status":"Success with ProviderA",
"result":"ProviderA sent email to email@example.com"
}

# Cloud Deployment:
  ### goto AWS site create acoount
  ### choose a machine to configure 
  ### launch an EC2 instacnce 
  ### setup security
  ### install node js on the server
  ### install express js on server 
  ### deploy the project on the server

  
# Note : 
  ## you can change rate limit in EmailService.js
  ## You can easily modify any thing according to requirement from EmailService.js
  ## You can also add other routes in server.js
