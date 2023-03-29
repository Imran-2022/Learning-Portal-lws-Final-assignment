import React from 'react';

const LeaderBoardCard = ({dt={},idx}) => {
    const {name,sum_of_Quiz_mark,sum_of_Assignment_mark}=dt;
    return (
        <tr className="border-b border-slate-600/50">
            <td className="table-td text-center">{idx}</td>
            <td className="table-td text-center">{name}</td>
            <td className="table-td text-center">{sum_of_Quiz_mark||"-"}</td>
            <td className="table-td text-center">{sum_of_Assignment_mark||"-"}</td>
            <td className="table-td text-center">{(sum_of_Quiz_mark||0)+(sum_of_Assignment_mark||0)}</td>
        </tr>
    );
};

export default LeaderBoardCard;