import React from 'react';
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';

const CustomPagination = ({
  mailsPerPage,
  totalMailCount,
  paginate,
  currentPage,
}) => {
  const totalPageCount = Math.ceil(totalMailCount / mailsPerPage);
  const handleClick = (direction) => {
    const newActivePage = direction === 1 ? currentPage + 1 : currentPage - 1;
    if (newActivePage < 1 || newActivePage > totalPageCount) return;
    paginate(newActivePage);
  };
  return (
    <Pagination>
      <PaginationItem
        key='Previous'
        onClick={() => handleClick(0)}
        disabled={currentPage <= 1}
      >
        <PaginationLink>Previous</PaginationLink>
      </PaginationItem>
      <PaginationItem
        key='Next'
        onClick={() => handleClick(1)}
        disabled={currentPage >= totalPageCount}
      >
        <PaginationLink>Next</PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
