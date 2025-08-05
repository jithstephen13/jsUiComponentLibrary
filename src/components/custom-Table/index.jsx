/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, {
  useEffect, useState, useMemo, useRef
} from 'react';
import {
  Table,
  Tr,
  Td,
  Spinner,
  Box
} from '@chakra-ui/react';
import { debounce } from 'lodash-es';

import Pagination from '../Pagination';
import AdvancedTableHead from './AdvancedTableHead';
import AdvancedTableBody from './AdvancedTableBody';

const DEFAULT_ITEMS_PER_PAGE = 10;
const AdvancedTable = ({
  columns = [],
  tableData = [],
  pagination = true,
  scrollPagination = false,
  itemsPerPage: defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  fetchData,
  totalPages = 1,
  onRowClick = () => {},
  onRowCheck = () => {},
  onRowRadioSelected = () => {},
  rowDisabled = [],
  rowDisabledOptionKey = '',
  rowValues = () => {},
  footer = [],
  sortHandler = () => {},
  paginationPosition = 'end',
  tableSize = 'md',
  isExpandable = false,
  activeRows = []
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultItemsPerPage);
  const [filterValues, setFilterValues] = useState({});
  const [filteredData, setFilteredData] = useState(tableData);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ field: '', direction: '' });
  const [radioSelectedIndex, setRadioSelectedIndex] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [expandedRows, setExpandedRows] = useState([]);

  const headerRefs = useRef({});
  const cellRefs = useRef({});
  const [columnWidths, setColumnWidths] = useState({});

  const paginatedData = useMemo(() => {
    if (!pagination || scrollPagination) return filteredData;
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage, pagination, scrollPagination]);

  const checkedItems = paginatedData.map((row) => Array.from(selectedRows).some((item) => JSON.stringify(item) === JSON.stringify(row)));

  useEffect(() => {
    const widths = {};
    columns.forEach((col) => {
      const headerWidth = headerRefs.current[col.field]?.offsetWidth || 0;
      const cellWidth = cellRefs.current[col.field]?.offsetWidth || 0;
      widths[col.field] = Math.max(headerWidth, cellWidth);
    });
    setColumnWidths(widths);
  }, [columns, tableData]);

  const handleFilterChange = debounce((filters) => {
    let tempData = [...tableData];
    Object.entries(filters).forEach(([field, { type, value }]) => {
      if (!value) return;
      tempData = tempData.filter((row) => {
        const rowVal = row[field];
        if (type === 'text') return rowVal?.toString().toLowerCase().includes(value.toLowerCase());
        if (type === 'select') return rowVal === value;
        if (type === 'date') return rowVal?.startsWith(value);
        return true;
      });
    });
    setFilteredData(tempData);
  }, 300);

  const onFilterInput = (field, type, value) => {
    const updatedFilters = {
      ...filterValues,
      [field]: {
        ...(filterValues[field] || {}),
        type,
        value,
        visible: true
      }
    };
    setFilterValues(updatedFilters);
    handleFilterChange(updatedFilters);
  };

  useEffect(() => {
    setFilteredData(tableData);
    setSelectedRows(new Set(activeRows));
  }, [tableData]);

  useEffect(() => {
    if (!scrollPagination || page >= totalPages || !fetchData) return;
    const fetch = async () => {
      setLoading(true);
      try {
        await fetchData(page);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [scrollPagination, page, totalPages, fetchData]);

  const handleScroll = (e) => {
    if (
      scrollPagination
      && e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 5
      && page < totalPages
      && !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSort = (field) => {
    const direction = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field, direction });
    sortHandler({ field, direction });
  };

  const handleIndividualCheck = (e, index, row) => {
    const newSet = new Set(selectedRows);

    if (e.target.checked) {
      newSet.add(row);
    } else {
      Array.from(newSet).forEach((item) => {
        if (JSON.stringify(item) === JSON.stringify(row)) {
          newSet.delete(item);
        }
      });
    }

    setSelectedRows(newSet);

    if (onRowCheck) {
      onRowCheck({
        elementCheck: e.target.checked,
        selectedRow: row,
        selectedRows: Array.from(newSet)
      });
    }
  };

  const handleAllCheck = () => {
    const allChecked = checkedItems.every(Boolean);
    const newSet = new Set(selectedRows);

    tableData.forEach((row) => {
      if (!allChecked) {
        newSet.add(row);
      } else {
        Array.from(newSet).forEach((item) => {
          if (JSON.stringify(item) === JSON.stringify(row)) {
            newSet.delete(item);
          }
        });
      }
    });

    setSelectedRows(newSet);

    onRowCheck({
      elementCheck: !allChecked,
      selectedRow: null,
      selectedRows: Array.from(newSet)
    });
  };

  const handleRadioSelect = (index, row) => {
    setRadioSelectedIndex(index);
    onRowRadioSelected(row);
  };

  const radioSelected = (index) => index === radioSelectedIndex;

  return (
    <Box
      borderRadius="8px"
      overflowX="scroll"
      overflowY="hidden"
      borderTop="1px solid #E2E8F0"
      borderBottom="1px solid #E2E8F000"
    >
      <AdvancedTableHead
        tableSize={tableSize}
        columns={columns}
        columnWidths={columnWidths}
        checkedItems={checkedItems}
        handleAllCheck={handleAllCheck}
        sortConfig={sortConfig}
        handleSort={handleSort}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        onFilterInput={onFilterInput}
        headerRefs={headerRefs}
      />

      <Box
        onScroll={handleScroll}
        maxH={scrollPagination ? '400px' : 'auto'}
        overflowY={scrollPagination ? 'auto' : 'visible'}
      >
        <Table size={tableSize} tableLayout="fixed" width="100%">
          <AdvancedTableBody
            paginatedData={paginatedData}
            columns={columns}
            tableSize={tableSize}
            checkedItems={checkedItems}
            handleIndividualCheck={handleIndividualCheck}
            handleRadioSelect={handleRadioSelect}
            radioSelected={radioSelected}
            rowDisabled={rowDisabled}
            rowDisabledOptionKey={rowDisabledOptionKey}
            rowValues={rowValues}
            onRowClick={onRowClick}
            footer={footer}
            columnWidths={columnWidths}
            isExpandable={isExpandable}
            expandedRows={expandedRows}
            setExpandedRows={setExpandedRows}
          />

          {footer.length > 0 && (
            <tfoot>
              <Tr>
                {columns.map((col, idx) => {
                  const match = footer.find((f) => f.field === col.field);
                  return (
                    <Td
                      key={`foot-${idx}`}
                      width={`${columnWidths[col.field] || 160}px`}
                      minW={`${columnWidths[col.field] || 160}px`}
                      maxW={`${columnWidths[col.field] || 160}px`}
                      textAlign={col.alignment || 'left'}
                      fontWeight="bold"
                    >
                      {match?.value || ''}
                    </Td>
                  );
                })}
              </Tr>
            </tfoot>
          )}
        </Table>
      </Box>

      {loading && <Spinner mt={4} />}

      {!scrollPagination && pagination && (
        <div
          className="front-pagination"
          style={{
            display: 'flex',
            justifyContent: paginationPosition || 'flex-end',
            marginTop: '10px'
          }}
        >
          <Pagination
            currentPage={page}
            itemsPerPage={rowsPerPage}
            totalItems={tableData?.length || 0}
            handlePageChange={(newPage) => setPage(newPage)}
            handleRowsPerPageChange={(newLimit) => {
              setRowsPerPage(newLimit);
              setPage(1);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </div>
      )}
    </Box>
  );
};

export default AdvancedTable;
