# Message Display Application

A simple web application that displays messages with code highlighting.

## Project Structure

```
message-display-app/
├── public/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment to Render

### Steps to deploy:

1. Create a new account or log in to [Render](https://render.com).

2. From the dashboard, click on "New" and select "Web Service".

3. Connect your GitHub repository or upload the files directly.

4. Configure the following settings:
   - **Name**: message-display-app (or your preferred name)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Under the "Environment Variables" section, add:
   - `API_KEY`: Your secure API key (optional, default is provided in server.js)

6. Click "Create Web Service" to deploy your application.

## Environment Variables

- `PORT`: The port on which the server will run (default: 3000)
- `API_KEY`: API key for authentication (default provided in server.js)

## Technologies Used

- Express.js - Server framework
- Tailwind CSS - UI styling
- Prism.js - Code syntax highlighting