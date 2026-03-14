SuperstoreWeb - Tableau Embedded Analytics
This application demonstrates a secure integration of the Tableau Sample Superstore dashboard using the Tableau Embedding API v3 and Connected Apps (JWT) authentication.

Local Development Setup

1. Prerequisites
Node.js installed.

A Tableau Cloud or Tableau Server instance with a Connected App configured.

2. Installation
    Bash
    git clone https://github.com/fujic/SuperstoreWeb.git
    cd SuperstoreWeb
    npm install
3. Environment Configuration (.env)
You must create a .env file in the root directory to store your Tableau Connected App credentials. These are used by app.js to generate a secure JSON Web Token (JWT).

Create a file named .env and add your credentials:

    # Credentials from your Tableau Connected App settings
    TABLEAU_CLIENT_ID=your_client_id_here
    TABLEAU_SECRET_ID=your_secret_id_here
    TABLEAU_SECRET_VALUE=your_secret_value_here


4. Run the App
    node app.js
The server will start locally, usually at http://localhost:3000.
