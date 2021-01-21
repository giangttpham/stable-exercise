import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import Mails from './components/Mails/Mails'
import { Container, Navbar} from 'reactstrap'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Navbar className='border-bottom mb-5'>
          <img className='logo' src='assets/stable-logo.svg'></img>
        </Navbar>
        <Container>
          <p className='app__title mb-0'>All Mails</p>
          <p className='app_subtitle mb-4'>
            Here are all of the pieces of mail you’ve received at your Stable
            address.
          </p>
          <Mails />
        </Container>
      </div>
    </ApolloProvider>
  );
};

export default App;
