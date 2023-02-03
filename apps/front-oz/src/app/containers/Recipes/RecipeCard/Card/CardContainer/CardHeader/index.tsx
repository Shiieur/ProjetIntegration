import { CardMedia } from '@mui/material';
import React from 'react';

interface IProps {
  image: string;
  height: string;
  width: string;
  alt: string;
}

export const CardHeader = ({ image, height, alt, width }: IProps) => {
  return (
    <CardMedia
      component="img"
      height={height}
      width={width}
      image={image}
      alt={alt}
    />
  );
};
export default CardHeader;
