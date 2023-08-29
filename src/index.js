import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UsercontextProvider from './context/UserContext';
import TestcontextProvider from './context/TestContext';
import QuestionContextProvider from './context/QuestionContext';
import AuthcontextProvider from './context/AuthContext';
import LeaderboardContextProvider from './context/LeaderboardContext';
import TimerContextProvider from './context/TimerContext';
import StoptimeContextProvider from './context/StoptimeContext';
import AnswersProvider from './context/AnswersContext';
import 'bootstrap/dist/css/bootstrap.min.css';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsercontextProvider>
      <TestcontextProvider>
        <QuestionContextProvider>
          <AuthcontextProvider>
            <LeaderboardContextProvider>
              <TimerContextProvider>
                <StoptimeContextProvider>
                  <AnswersProvider>
                    <App />
                  </AnswersProvider>
                </StoptimeContextProvider>
              </TimerContextProvider>
            </LeaderboardContextProvider>
          </AuthcontextProvider>
        </QuestionContextProvider>
      </TestcontextProvider>
    </UsercontextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
