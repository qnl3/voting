import React from 'react';
import ReactDom from 'react-dom';
import Voting from './feature/voting-client/components/Voting';
import { hot } from 'react-hot-loader';

const pair = ['Trainspotting','28 Days Later'];

ReactDom.render(
    <Voting pair={pair} />,
    document.getElementById('app')
);