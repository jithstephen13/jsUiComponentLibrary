/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState } from 'react';
import {
  Td, Tooltip, Box, OrderedList, ListItem
} from '@chakra-ui/react';

const EllipsisCell = ({
  value,
  row,
  columnIndex,
  rowIndex,
  col,
  expandedRows,
  maxWidth = 200 // fallback if not passed
}) => {
  const boxRef = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      setIsOverflowed(box.scrollWidth > box.clientWidth);
    }
  }, [value, maxWidth]);

  const isExpanded = expandedRows.includes(row.id);
  const items = Array.isArray(value) ? value : [];

  const renderExpandableList = () => (
    <OrderedList pl={4} spacing={1} textAlign="start" listStylePosition="inside">
      {items.map((item, i) => {
        const shouldShow = i === 0 || isExpanded;
        if (!shouldShow) return null;

        return (
          <ListItem
            key={i}
            py="1"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {item}
          </ListItem>
        );
      })}
    </OrderedList>
  );

  const content = col?.isExpandable
    ? renderExpandableList()
    : col?.cell
      ? col.cell({
        field: value, row, rowIndex, columnIndex
      })
      : value;

  const columnKey = col?.id || col?.accessor || columnIndex;

  return (
    <Td
      key={columnKey}
      textAlign={col.alignment || 'left'}
      width={`${maxWidth}px`}
      maxW={`${maxWidth}px`}
      minW={`${maxWidth}px`}
      isTruncated
    >
      {col?.type === 'isExpandable' ? (
        content
      ) : isOverflowed ? (
        <Tooltip label={value} hasArrow placement="top">
          <Box
            ref={boxRef}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW={`${maxWidth}px`}
          >
            {content}
          </Box>
        </Tooltip>
      ) : (
        <Box
          ref={boxRef}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxW={`${maxWidth}px`}
        >
          {content}
        </Box>
      )}
    </Td>
  );
};

export default EllipsisCell;

