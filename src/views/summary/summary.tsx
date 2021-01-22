import React from 'react';
import useRanking from '../../hooks/useRanking';
import { Result, UserInfo } from '../../types';
import classNames from 'classnames';
import CustoButton from '../../components/custom-button/custom-button';

import './summary.css';

import { formatSeconds } from '../../utils';

function Summary(props: Props) {
  const { userInfo, result } = props;
  const { ranking, position } = useRanking(userInfo, result);

  return (
    <div className="summary-contianer">
      <div className="congrats-messaage">
        <span>Congratulations, You've completed the trivia!</span>
        <span>
          You got {result.correctAnswers} correct answers in{' '}
          {formatSeconds(result.time)}
        </span>
      </div>
      <table className="ranking-table">
        <caption className="table-title">
          Global Ranking (on your pc xd)
        </caption>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Country</th>
            <th>Correct Answers</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((record, index) => (
            <tr
              key={index}
              className={classNames('ranking-record', {
                'current-user': index === position,
              })}
            >
              <td>{index + 1}</td>
              <td>{record.name}</td>
              <td>{record.country}</td>
              <td>{record.correctAnswers}</td>
              <td>{formatSeconds(record.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustoButton onClick={() => window.location.reload()}>
        Restart Trivias
      </CustoButton>
    </div>
  );
}

type Props = {
  userInfo: UserInfo;
  result: Result;
};

export default Summary;
