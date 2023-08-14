import dynamic from 'next/dynamic';
import HeadingLevelOne from './heading-level-one';
import HorizontalLine from './horizontal-line';
import Image from './image';
import Link from './link';
import Quote from './quote';
import Table from './table';

const DynamicCode = dynamic(() => import('./code'));

const Markdown = {
  Code: DynamicCode,
  HeadingLevelOne,
  HorizontalLine,
  Image,
  Link,
  Quote,
  Table,
};

export default Markdown;
