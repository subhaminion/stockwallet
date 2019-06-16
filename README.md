# Stock Wallet

## Running the App

### Dependencies:
    Python 3.6.7
    Node 8.10.0
    NPM 3.5.2
    Yarn

## Running the App Locally

### Running the Frontend
    cd frontend
    yarn install
    yarn start
The app will be live at `localhost:3000`

### Running the Backend
    cd backend
    pip3 install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
The Python app server will be live at `localhost:8000`
