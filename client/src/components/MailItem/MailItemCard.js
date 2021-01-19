import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Col,
  Row,
} from 'reactstrap';
import './MailItemCard.css';

const MailItemCard = ({ data }) => {
  console.log(data.imageUrl);
  const date = new Date(data.timestamp);
  return (
    <div>
      <Card className='card__top__level mb-4'>
        <div className='border-bottom text-center'>
          <CardImg
            src={data.imageUrl}
            alt='Card image cap'
            className='card__img'
            style={{ width: 90 + '%' }} // Need to figure out how to do this with the width attribute or through css
          />
        </div>
        <CardBody className='pl-2'>
          <CardTitle className='card__title'>{data.from}</CardTitle>

          {data.businessRecipient && (
            <p className='card__text'>
              <img className='icon' src='assets/company.svg'></img>{' '}
              {data.businessRecipient}
            </p>
          )}
          {data.individualRecipient && (
            <p className='card__text'>
              <img className='icon' src='assets/recipient.svg'></img>{' '}
              {data.individualRecipient}
            </p>
          )}
          {data.scan && (
            <p className='card__text'>
              <img className='icon' src='assets/scan.svg'></img>{' '}
              {data.scan.status === 'processing'
                ? 'Scan Processing'
                : 'Scanned'}
            </p>
          )}
          {data.forward && (
            <p className='card__text'>
              <img className='icon' src='assets/forward.svg'></img>{' '}
              {data.forward && data.forward.status === 'processing'
                ? 'Forward Processing'
                : 'Forwarded'}
            </p>
          )}
          {data.shred && (
            <p className='card__text'>
              <img className='icon' src='assets/shred.svg'></img>{' '}
              {data.shred && data.shred.status === 'processing'
                ? 'Shred Processing'
                : 'Shredded'}
            </p>
          )}
        </CardBody>
        <CardFooter className='text-right card__date bg-transparent'>
          {date.toLocaleString('default', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MailItemCard;
