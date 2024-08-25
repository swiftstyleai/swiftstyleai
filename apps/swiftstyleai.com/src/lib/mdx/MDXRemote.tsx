// https://github.com/hashicorp/next-mdx-remote#mdx-provider

// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';
// import Icon from '@mui/material/Icon';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Link from 'next/link';
import Image from 'next/image';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import { Tweet } from 'react-tweet';

// import React from 'react';
// import DescriptionList from 'ui-common/DescriptionList/DescriptionList';
// import DescriptionListItems from 'ui-common/DescriptionList/DescriptionListItems';
// import GridColumns from 'ui-common/GridColumns';
// // import { PostImage } from 'ui-post';
// import { H3 } from 'ui-typography';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// export const components: any = {
// // p: Box,
// // list
// List,
// ListItem,
// ListItemButton,
// ListItemIcon,
// ListItemText,
// // grid
// Grid,
// // icon
// Icon,
// DoneOutlinedIcon,
// ClearOutlinedIcon,
// ArrowForwardIosOutlinedIcon,
// // cards
// Card,
// CardHeader,
// CardMedia,
// CardActions,
// Box,
// Typography,
// Button,
// // PostImage,
// DescriptionList,
// DescriptionListItems,
// H3,
// Table,
// TableBody,
// TableCell,
// TableContainer,
// TableHead,
// TableRow,
// StyledTableCell,
// StyledTableRow,
// GridColumns,
// Stack,
// // links
// Link,
// // wrapper(props: any) {
// //   const { components, ...rest } = props
// //   return React.createElement('div', rest)
// // }
// };

// https://github.com/hashicorp/next-mdx-remote/blob/main/src/index.tsx#L42C48-L42C59
export type MDXRemoteProps = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  scope: any;
};

// const MDXRemote = ({ source, scope }: MDXRemoteProps) => {
//   return <NextMDXRemote {...source} components={components} scope={scope} />;
// };

// export default MDXRemote;

// Define the props type for the Callout component.
interface CalloutProps {
  emoji: React.ReactNode; // Can be string or any React element
  children: React.ReactNode; // The content inside the callout
}

// Apply the props type to the Callout component.
function Callout({ emoji, children }: CalloutProps) {
  return (
    <div className='px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8'>
      <div className='flex items-center w-4 mr-4'>{emoji}</div>
      <div className='w-full callout'>{children}</div>
    </div>
  );
}

const components = {
  Callout,
  Image: ({
    alt,
    width,
    height,
    ...props
  }: React.ComponentProps<typeof Image>) => (
    <Image {...props} alt={alt} width={width} height={height} />
  ),
  Tweet,
};

// https://github.com/hashicorp/next-mdx-remote/issues/366
export function CustomMDX(props: any) {
  return (
    /* @ts-expect-error Async Server Component */
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
