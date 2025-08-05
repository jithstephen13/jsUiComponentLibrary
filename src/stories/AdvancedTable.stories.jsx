import React from 'react';
import { AdvancedTable } from '../components/custom-Table';

export default {
  title: 'Components/AdvancedTable',
  component: AdvancedTable
};

const mockColumns = [
  {
    header: 'Select',
    type: 'multi-select',
    alignment: 'center',
    width: '20'
  },
  {
    header: 'Expandable',
    type: 'isExpandable',
    alignment: 'start',
    width: '10%'
  },
  {
    field: 'id', header: 'ID', sort: true, alignment: 'center', filterType: 'text'
  },
  {
    field: 'name', header: 'Name', sort: true, alignment: 'center', filterType: 'text'
  },
  {
    field: 'status', header: 'Status', filterType: 'select', alignment: 'center', options: ['Active', 'Inactive']
  },
  {
    field: 'date', header: 'Date', alignment: 'center', filterType: 'date'
  },
  {
    header: 'List',
    field: 'list2',
    alignment: 'center',
    isExpandable: true,
    width: '30%'
  }
];

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  date: `2024-07-${String(i + 1).padStart(2, '0')}`,
  list2: ['Sale of Agricultural Implements', 'Machineries', 'Acupuncture Clinic']
}));

const Template = (args) => <AdvancedTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: mockColumns,
  tableData: mockData,
  pagination: true,
  scrollPagination: false,
  footer: [
    { field: 'name', alignment: 'center', value: 'Total Users' },
    { field: 'id', alignment: 'center', value: mockData.length.toString() }
  ]
};
