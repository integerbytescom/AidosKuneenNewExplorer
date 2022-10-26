import React from 'react';
import './PaginateItemMore.css';
import {Pagination} from "react-bootstrap";

const PaginateItemMore = ({allPages,currentPage,setCurrentPage}) => {
    return (
        <div className={`PaginateItemMore`}>
            <Pagination>
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                />

                {
                    currentPage > 1 &&
                    <>
                        <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>
                        <Pagination.Ellipsis />
                    </>
                }

                <Pagination.Item active>{currentPage}</Pagination.Item>

                {
                    currentPage !== allPages &&
                    <>
                        <Pagination.Ellipsis />
                        <Pagination.Item
                            onClick={() => setCurrentPage(allPages)}
                        >
                            {allPages}
                        </Pagination.Item>
                    </>
                }

                <Pagination.Next
                    disabled={currentPage === allPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            </Pagination>
        </div>
    );
};

export default PaginateItemMore;