import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import MailItemCard from './components/MailItem/MailItemCard';
import { Row, Col, CardDeck, Container, Navbar } from 'reactstrap';
import { useState } from 'react';
import CustomPagination from './components/Pagination';
import PaginationComponent from 'react-reactstrap-pagination';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
});

const AllMailItems = () => {
  const [mails, setMails] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mailsPerPage] = useState(6);
  const { loading, error, data } = useQuery(gql`
    {
      getAllMailItems {
        id
        businessRecipient
        forward {
          status
        }
        from
        imageUrl
        individualRecipient
        scan {
          status
        }
        shred {
          status
        }
        timestamp
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // setMails(data);
  // Get current posts
  const indexOfLastPost = currentPage * mailsPerPage;
  const indexOfFirstPost = indexOfLastPost - mailsPerPage;
  const currentMailItems = data.getAllMailItems.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // return data.getAllMailItems.map(({ id, from }) => (
  //   <div key={id}>
  //     <p>
  //       {id}: {from}
  //     </p>
  //   </div>
  // ));

  let mailCards = currentMailItems.map((mailItem) => {
    return (
      <Col sm='4'>
        <MailItemCard key={mailItem.id} data={mailItem} />
      </Col>
    );
  });
  return (
    <div>
      <Row>
        <CardDeck>{mailCards}</CardDeck>
      </Row>
      {/* <Row>
        <PaginationComponent
          totalItems={data.getAllMailItems.length}
          pageSize={6}
          onSelect={paginate}
        />
      </Row> */}

      <Row className='justify-content-between pl-3 pr-3'>
        <p>
          <strong>{data.getAllMailItems.length}</strong> mail items
        </p>
        <CustomPagination
          mailsPerPage={mailsPerPage}
          totalMailCount={data.getAllMailItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Row>
    </div>
  );
};

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
          <AllMailItems />
        </Container>
      </div>
    </ApolloProvider>
  );
};

export default App;
