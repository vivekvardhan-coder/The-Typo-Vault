import React, { useState, useEffect } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { VoiceAuth } from './components/VoiceAuth';
import { UserSelection } from './components/UserSelection';
import { Layout } from './components/Layout';
import { TypoLogbook } from './components/TypoLogbook';
import { AddTypo } from './components/AddTypo';
import { Leaderboard } from './components/Leaderboard';

type AppState = 'welcome' | 'auth' | 'userSelect' | 'main';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('logbook');

  useEffect(() => {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setAppState('main');
    }
  }, []);

  const handleEnterVault = () => {
    setAppState('auth');
  };

  const handleAuthenticated = () => {
    setAppState('userSelect');
  };

  const handleUserSelected = (user: any) => {
    setCurrentUser(user);
    setAppState('main');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setAppState('welcome');
    setCurrentPage('logbook');
  };

  const handleTypoAdded = () => {
    setCurrentPage('logbook');
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'logbook':
        return <TypoLogbook currentUser={currentUser} />;
      case 'add':
        return <AddTypo currentUser={currentUser} onTypoAdded={handleTypoAdded} />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <TypoLogbook currentUser={currentUser} />;
    }
  };

  if (appState === 'welcome') {
    return <WelcomePage onEnter={handleEnterVault} />;
  }

  if (appState === 'auth') {
    return <VoiceAuth onAuthenticated={handleAuthenticated} />;
  }

  if (appState === 'userSelect') {
    return <UserSelection onUserSelected={handleUserSelected} />;
  }

  return (
    <Layout
      currentUser={currentUser}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderMainContent()}
    </Layout>
  );
}

export default App;