import React from 'react'
import { useSession } from 'react-session-persist';
import LoginForm from './components/LoginForm'
import TodoList from './components/TodoList'

function App() {
  const { authenticated, session, saveSession, removeSession } = useSession(false);

  const handleLoggedIn = () => {
    saveSession({items: []})
  }

  if (authenticated) {
    return <TodoList saveSession={saveSession} session={session} removeSession={removeSession}/>;
  } else {
    return <LoginForm handleLoggedIn={handleLoggedIn} />;
  }
}

export default App;
