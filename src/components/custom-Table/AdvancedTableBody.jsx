/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Tr, Td, Text, Checkbox, Radio, Tbody, Button
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import EllipsisCell from './EllipsisCell';
import MoreActions from '../more-actions';

const AdvancedTableBody = ({
  paginatedData = [],
  columns = [],
  checkedItems = [],
  handleIndividualCheck = () => {},
  handleRadioSelect = () => {},
  radioSelected = () => false,
  rowDisabled = [],
  rowDisabledOptionKey = '',
  rowValues = () => {},
  onRowClick = () => {},
  columnWidths = {},
  expandedRows = [],
  setExpandedRows = () => {}
}) => {
  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };
  return (
    <Tbody>
      {paginatedData.length === 0 ? (
        <Tr>
          <Td colSpan={columns.length}>
            <Text textAlign="center" py={4}>No Data Found</Text>
          </Td>
        </Tr>
      ) : (
        paginatedData.map((row, index) => (
          <Tr
            borderLeft="1px solid #E2E8F0"
            borderRight="1px solid #E2E8F0"
            key={row.id || `row-${index}`}
            onClick={() => onRowClick({ row, index })}
            _hover={onRowClick ? { bg: 'gray.50' } : {}}
            cursor={onRowClick ? 'pointer' : 'default'}
            bg={checkedItems[index] ? 'green.100' : index % 2 === 0
              ? '#F9FAFB'
              : 'white'}
          >
            {columns.map((col, columnIndex) => {
              const value = row[col.field];
              const columnKey = `${index}-${columnIndex}`;

              if (col.type === 'multi-select' || col.type === 'select') {
                const isDisabled = rowDisabled.some(
                  (item) => item[rowDisabledOptionKey] === row[rowDisabledOptionKey]
                ) && checkedItems[index];
                return (
                  <Td key={columnKey} textAlign={col.alignment}>
                    <Checkbox
                      isChecked={checkedItems[index]}
                      onChange={(e) => handleIndividualCheck(e, index, row)}
                      isDisabled={isDisabled}
                    />
                  </Td>
                );
              }

              if (col.type === 'radio') {
                return (
                  <Td key={columnKey} textAlign={col.alignment}>
                    <Radio
                      value={index}
                      isChecked={radioSelected(row)}
                      onClick={() => handleRadioSelect(row)}
                    />
                  </Td>
                );
              }

              if (col.type === 'actions') {
                return (
                  <Td
                    key={columnKey}
                    textAlign={col.alignment}
                    onClick={(e) => rowValues(e, row)}
                  >
                    <MoreActions actionData={col.actions} rowData={row} />
                  </Td>
                );
              }
              if (col.type === 'isExpandable') {
                return (
                  <Td
                    key={columnKey}
                    textAlign={col.alignment}
                    onClick={(e) => rowValues(e, row)}
                  >
                    <Button
                      variant="unstyled"
                      onClick={() => toggleRow(row.id)}
                    >
                      {expandedRows.includes(row.id) ? (
                        <MinusIcon variant="ghost" className="bg-none" />
                      ) : (
                        <AddIcon color="pink.500" className="bg-none" />
                      )}
                    </Button>
                  </Td>
                );
              }

              return (
                <EllipsisCell
                  columnKey={columnKey}
                  col={col}
                  value={value}
                  row={row}
                  rowIndex={index}
                  columnIndex={columnIndex}
                  maxWidth={columnWidths[col.field] || 160}
                  expandedRows={expandedRows}
                />
              );
            })}
          </Tr>
        ))
      )}
    </Tbody>
  );
};

export default AdvancedTableBody;
