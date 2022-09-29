import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { TablePagination } from '@mui/material';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  isTable,
  count = 0,
  onPageChange,
}) => {
  const keywordLink = keyword ? `search=${keyword}` : '';

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  return (
    pages > 1 &&
    (!isTable ? (
      <Stack spacing={2} sx={{ mx: 'auto', mt: 4 }}>
        <Pagination
          page={Number(page)}
          count={pages}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/${
                item.page === 1
                  ? `?${keywordLink}`
                  : keyword
                  ? `?${keywordLink}&page=${item.page}`
                  : `?page=${item.page}`
              }`}
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    ) : (
      <TablePagination
        component='div'
        rowsPerPageOptions={[2]}
        count={count}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={2}
      />
    ))
  );
};

export default Paginate;
