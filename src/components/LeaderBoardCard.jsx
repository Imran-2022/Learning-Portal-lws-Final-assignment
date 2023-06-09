import React from 'react';

const LeaderBoardCard = ({data={},rank,user}) => {
    const {name,sum_of_Quiz_mark,sum_of_Assignment_mark,id}=data;
    // console.log(user);
    return (
        <tr className={`${user.id==id?"border-2 border-cyan":"border-b border-slate-600/50 "}`}>
            <td className="table-td text-center">{rank}</td>
            <td className="table-td text-center">{name}</td>
            <td className="table-td text-center">{sum_of_Quiz_mark||"-"}</td>
            <td className="table-td text-center">{sum_of_Assignment_mark||"-"}</td>
            <td className="table-td text-center">{(sum_of_Quiz_mark||0)+(sum_of_Assignment_mark||0)}</td>
        </tr>
    );
};

export default LeaderBoardCard;