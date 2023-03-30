import React from 'react';
import ReactPaginate from 'react-paginate'
const Pagination = ({
  pageCount,
  handlePageClick,
  pageRangeDisplayed,
  setCurrentPagination
}) => {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={pageCount}
      onPageChange={(selected) => handlePageClick(selected)}
      containerClassName={'pagination-container'}
      previousLinkClassName={'previous-label-class'}
      nextLinkClassName={'next-label-class'}
      disabledClassName={'pagination__link--disabled'}
      activeClassName={'activePage-listing-class'}
      
      pageRangeDisplayed={pageRangeDisplayed}
      // marginPagesDisplayed={2}
    />
  )
}

export default Pagination
