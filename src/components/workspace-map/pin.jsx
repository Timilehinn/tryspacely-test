import * as React from 'react';
import Price from './Price'

const Pin = ({onClick, amount}) => {
  return <Price onClick={onClick} amount={amount} />
}

export default React.memo(Pin);
