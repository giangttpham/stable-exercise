import MailItemCard from "../MailItem/MailItemCard";
import { Row, CardDeck } from "reactstrap";
import { useState } from "react";
import CustomPagination from "../CustomPagination/Pagination";
import { useQuery, gql } from "@apollo/client";

const Mails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mailsPerPage] = useState(6);

  // Get mail items from the GraphQL server
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

  // Get the posts to be displayed on the current page
  const indexOfLastPost = currentPage * mailsPerPage;
  const indexOfFirstPost = indexOfLastPost - mailsPerPage;
  const currentMailItems = data.getAllMailItems.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const mailCards = currentMailItems.map((mailItem) => {
    return <MailItemCard key={mailItem.id} data={mailItem} />;
  });

  return (
    <div>
      <Row>
        <CardDeck>{mailCards}</CardDeck>
      </Row>
      <Row className="justify-content-between pl-3 pr-3">
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

export default Mails;
