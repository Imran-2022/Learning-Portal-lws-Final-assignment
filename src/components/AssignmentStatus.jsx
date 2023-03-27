import React, { useEffect, useState } from 'react';
import { useGetAssignmentMarksQuery } from '../features/adminPortal/assignmentMarks/assignmentMarksApi';
const AssignmentStatus = () => {
    const { data: assignmentsMarks} = useGetAssignmentMarksQuery();

    const [total,setTotal]=useState(0)
    const [pending,setPending]=useState(0)
    const [markSent,setMarksent]=useState(0)

    useEffect(()=>{
        if(assignmentsMarks){
            setTotal(assignmentsMarks.length)
            const statusPending= assignmentsMarks.filter(dt=>dt.status==='pending').length;
            setPending(statusPending);
            const markSentTotal=assignmentsMarks.length-statusPending;
            setMarksent(markSentTotal)
        }

    },[assignmentsMarks])

    return (
        <ul className="assignment-status">
            <li>Total <span>{total}</span></li>
            <li>Pending <span>{pending}</span></li>
            <li>Mark Sent <span>{markSent}</span></li>
        </ul>
    );
};

export default AssignmentStatus;