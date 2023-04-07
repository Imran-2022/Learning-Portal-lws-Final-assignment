import React, { useEffect, useState } from 'react';
import { useGetAssignmentMarksQuery } from '../features/adminPortal/assignmentMarks/assignmentMarksApi';

const AssignmentStatus = () => {
  // Destructure the variables from the useGetAssignmentMarksQuery hook
  const { data: assignmentsMarks } = useGetAssignmentMarksQuery();

  const [totalAssignments, setTotalAssignments] = useState(0);
  const [pendingAssignments, setPendingAssignments] = useState(0);
  const [markedAssignments, setMarkedAssignments] = useState(0);

  useEffect(() => {
    if (assignmentsMarks) {
      // Set the total number of assignments
      setTotalAssignments(assignmentsMarks.length);

      // Calculate the number of pending assignments
      const numPendingAssignments = assignmentsMarks.reduce((total, current) => {
        return total + (current.status === 'pending' ? 1 : 0);
      }, 0);
      setPendingAssignments(numPendingAssignments);

      // Calculate the number of assignments that have been marked
      const numMarkedAssignments = assignmentsMarks.reduce((total, current) => {
        return total + (current.status !== 'pending' ? 1 : 0);
      }, 0);
      setMarkedAssignments(numMarkedAssignments);
    }
  }, [assignmentsMarks]);

  return (
    <ul className="assignment-status">
      <li>
        Total <span>{totalAssignments}</span>
      </li>
      <li>
        Pending <span>{pendingAssignments}</span>
      </li>
      <li>
        Mark Sent <span>{markedAssignments}</span>
      </li>
    </ul>
  );
};

export default AssignmentStatus;
