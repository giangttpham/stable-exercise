import React from "react";
import { PaginationItem, PaginationLink, Pagination } from "reactstrap";

/**
 * Front-end pagination component using reactstrap's Pagination components.
 * The user can navigate to the Next or Previous page while the current page is being tracked by the underlying logic. *
 */
const CustomPagination = ({
  mailsPerPage,
  totalMailCount,
  paginate,
  currentPage,
}) => {
  const totalPageCount = Math.ceil(totalMailCount / mailsPerPage);

  // Directions: '0' is sent when Previous button is clicked and '1' for the Next button
  const handleClick = (direction) => {
    const newActivePage = direction === 1 ? currentPage + 1 : currentPage - 1;
    // Only update the current page if the destination page is valid
    if (newActivePage < 1 || newActivePage > totalPageCount) return;
    paginate(newActivePage);
  };

  return (
    <Pagination>
      <PaginationItem
        key="Previous"
        onClick={() => handleClick(0)}
        disabled={currentPage <= 1}
      >
        <PaginationLink>Previous</PaginationLink>
      </PaginationItem>
      <PaginationItem
        key="Next"
        onClick={() => handleClick(1)}
        disabled={currentPage >= totalPageCount}
      >
        <PaginationLink>Next</PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
