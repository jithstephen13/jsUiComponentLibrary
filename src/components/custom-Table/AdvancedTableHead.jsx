/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
  Table,
  Thead,
  Tr,
  Th,
  Flex,
  Checkbox,
  Text,
  Box,
  Input,
  Select
} from '@chakra-ui/react';
import {
  CalendarIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon
} from '@chakra-ui/icons';
import React from 'react';

const AdvancedTableHead = ({
  tableSize,
  columns,
  columnWidths,
  checkedItems,
  handleAllCheck,
  sortConfig,
  handleSort,
  filterValues,
  setFilterValues,
  onFilterInput,
  headerRefs
}) => {
  return (
    <Table size={tableSize} tableLayout="fixed" width="100%">
      <Thead>
        <Tr>
          {columns.map((col) => {
            return (
              <Th
                key={col.field}
                ref={(el) => (headerRefs.current[col.field] = el)}
                bg="#09327B"
                color="white"
                p="2"
                textAlign="center"
                minWidth={col.type === 'multi-select' ? '90px' : (col.width || (columnWidths[col.field] ? `${columnWidths[col.field]}px` : 'auto'))}
                width={col.type === 'multi-select' ? '90px' : (col.width || (columnWidths[col.field] ? `${columnWidths[col.field]}px` : 'auto'))}
                maxW={col.type === 'multi-select' ? '90px' : (col.width || (columnWidths[col.field] ? `${columnWidths[col.field]}px` : 'auto'))}
              >
                <Flex direction="column" align="center" justify="center" gap={1} width="100%">
                  <Flex align="center" justify="center" width="100%" gap={1}>
                    {col.type === 'multi-select' ? (
                      <Checkbox
                        isChecked={checkedItems.length > 0 && checkedItems.every(Boolean)}
                        isIndeterminate={checkedItems.some(Boolean) && !checkedItems.every(Boolean)}
                        onChange={handleAllCheck}
                        colorScheme="yellow"
                        size="md"
                      />
                    ) : (
                      <Text
                        fontSize="sm"
                        textAlign="center"
                        isTruncated
                        whiteSpace="nowrap"
                        fontWeight="medium"
                        color="white"
                      >
                        {col.header}
                      </Text>
                    )}
                    {col.sort && (
                    <Flex direction="column" ml={1} cursor="pointer" onClick={() => handleSort(col.field)} align="center">
                      <ChevronUpIcon
                        fontSize="xs"
                        color={sortConfig.field === col.field && sortConfig.direction === 'asc' ? 'yellow.300' : 'white'}
                      />
                      <ChevronDownIcon
                        fontSize="xs"
                        color={sortConfig.field === col.field && sortConfig.direction === 'desc' ? 'yellow.300' : 'white'}
                      />
                    </Flex>
                    )}
                  </Flex>

                  {/* Filter */}
                  <Box width="100%" textAlign="center">
                    {!filterValues[col.field]?.visible ? (
                      <Box
                        as="span"
                        cursor="pointer"
                        display="inline-block"
                        onClick={() => setFilterValues((prev) => ({
                          ...prev,
                          [col.field]: {
                            type: col.filterType || 'text',
                            value: '',
                            visible: true
                          }
                        }))}
                      >
                        {!col.type && col.filterType === 'date' && <CalendarIcon color="white" boxSize={4} />}
                        {!col.type && col.filterType === 'select' && <ChevronDownIcon color="white" boxSize={4} />}
                        {(!col.type && (!col.filterType || col.filterType) === 'text') && <SearchIcon color="white" boxSize={4} />}
                      </Box>
                    ) : (
                      <>
                        {(!col.filterType || col.filterType === 'text') && (
                        <Input
                          size="sm"
                          variant="unstyled"
                          placeholder=""
                          textAlign="center"
                          width="100%"
                          value={filterValues[col.field]?.value || ''}
                          onChange={(e) => onFilterInput(col.field, 'text', e.target.value)}
                          _placeholder={{ color: 'white', opacity: 0.8 }}
                        />
                        )}
                        {col.filterType === 'select' && (
                        <Select
                          placeholder="All"
                          options={col?.options?.map((item) => ({ code: item, name: item }))}
                          optionKey="code"
                          onChange={(e) => onFilterInput(col.field, 'select', String(e.code))}
                        />

                        )}
                        {col.filterType === 'date' && (
                        <Input
                          type="date"
                          size="sm"
                          variant="unstyled"
                          textAlign="center"
                          width="100%"
                          value={filterValues[col.field]?.value || ''}
                          onChange={(e) => onFilterInput(col.field, 'date', e.target.value)}
                        />
                        )}
                      </>
                    )}
                  </Box>
                </Flex>
              </Th>
            );
          })}
        </Tr>
      </Thead>
    </Table>
  );
};

export default AdvancedTableHead;
