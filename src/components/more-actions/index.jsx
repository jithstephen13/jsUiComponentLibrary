import React from 'react';
import {
  Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { ActionIcon } from '../../assets/components';

const MoreActions = (props) => {
  const { actionData, rowData } = props;

  return actionData.length === 1 ? (
    <Menu>
      {actionData.map(({
        onClick: onItemClick, label, icon, id
      }) => (
        <MenuButton
          key={label}
          as="button"
          onClick={() => {
            onItemClick(rowData || id);
          }}
        >
          {icon}
        </MenuButton>
      ))}
    </Menu>
  ) : (
    <Menu placement="left">
      <MenuButton as="button" className="menu-btn">
        <ActionIcon />
      </MenuButton>
      <MenuList>
        {actionData.map(({
          onClick: onItemClick, label, icon, id
        }) => (
          <MenuItem
            key={label}
            as="button"
            onClick={() => {
              onItemClick(rowData || id);
            }}
          >
            {icon} {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MoreActions;
