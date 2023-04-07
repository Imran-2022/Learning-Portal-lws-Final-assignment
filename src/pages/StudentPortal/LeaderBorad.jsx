import React, { useState } from 'react'
import LeaderBoardCard from '../../components/LeaderBoardCard';
import StudentNav from '../../components/StudentNav';
import { useGetAssignmentMarksQuery } from '../../features/adminPortal/assignmentMarks/assignmentMarksApi'
import { useGetquizMarksQuery } from '../../features/adminPortal/quizMark/quizMarkApi'
import { useGetUsersQuery } from '../../features/auth/authApi';
import useUser from '../../hooks/useUser';

function LeaderBorad() {
    const user = useUser();
    const { data: userAssignmentMakrs } = useGetAssignmentMarksQuery();
    const { data: quizMark } = useGetquizMarksQuery();
    const { data: allUsers } = useGetUsersQuery()

    // Initialize arrays to store student marks
    const studentQuizMarks = []
    const studentAssignmentMarks = []

    // Create a map of user assignment marks
    const userMap = {};
    for (let i = 0; i < userAssignmentMakrs?.length; i++) {
        const user = userAssignmentMakrs[i];
        if (!userMap[user.student_id]) {
            userMap[user.student_id] = [];
        }
        userMap[user.student_id].push(user);
    }

    // Calculate total mark for each student from assignment marks
    for (const property in userMap) {
        let sum = userMap[property].reduce(function (accumulator, curValue) {
            return accumulator + Number(curValue.mark)
        }, 0)

        studentQuizMarks.push({ id: userMap[property]?.[0].student_id, sum_of_Assignment_mark: sum })
    }

    // Create a map of user quiz marks
    const userMapMark = {};
    for (let i = 0; i < quizMark?.length; i++) {
        const user = quizMark[i];
        if (!userMapMark[user.student_id]) {
            userMapMark[user.student_id] = [];
        }
        userMapMark[user.student_id].push(user);
    }

    // Calculate total mark for each student from quiz marks
    for (const property in userMapMark) {
        let sum = userMapMark[property].reduce(function (accumulator, curValue) {
            return accumulator + Number(curValue.mark)
        }, 0)

        studentAssignmentMarks.push({ id: userMapMark[property]?.[0].student_id, sum_of_Quiz_mark: sum })
    }

    // Filter out non-student users and merge quiz and assignment marks into one array
    const studentUsers = allUsers?.filter(dt => dt.role == 'student')
    const mergedArray = studentUsers?.map(obj1 => {
        const obj2 = studentQuizMarks.find(obj2 => obj2.id === obj1.id);
        const obj3 = studentAssignmentMarks.find(obj3 => obj3.id === obj1.id);
        return { ...obj1, ...obj2, ...obj3 };
    });

    // Sort students by their total mark and get top 20 students
    const sortedArray = mergedArray?.sort((a, b) => (Number((b?.sum_of_Assignment_mark || 1)) + Number((b?.sum_of_Quiz_mark || 1))) - ((Number(a?.sum_of_Assignment_mark || 1)) + Number((a?.sum_of_Quiz_mark || 1)))).slice(0, 20);

    // Group students with the same total mark together
    const mergedTotalArray = [];
    sortedArray?.forEach((item) => {
        const totalValue = (Number(item?.sum_of_Assignment_mark || 0)) + Number((item?.sum_of_Quiz_mark || 0));
        if (!mergedTotalArray[totalValue]) {
            mergedTotalArray[totalValue] = [item];
        } else {
            mergedTotalArray[totalValue].push(item);
        }
    });

    // Reverse the array and filter out empty arrays
    const newA = mergedTotalArray?.filter(Boolean).reverse();

    // Get the position of the current user in the leaderboard
    const userBoard = sortedArray?.find(dt => dt.id == user?.id)
    const { name, sum_of_Quiz_mark, sum_of_Assignment_mark } = userBoard || {};

    // Get the rank of the current user in the leaderboard
    let userRank = 0;
    newA?.map((dt, idx) => {
        return dt.map((d, ix) => {
            if (d.id == user?.id) {
                userRank = idx + 1;
            }
        })
    })


    return (
        <div>
            <StudentNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div>
                        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr>
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr className="border-2 border-cyan">
                                    <td className="table-td text-center">{userRank || 0}</td>
                                    <td className="table-td text-center">{name}</td>
                                    <td className="table-td text-center">{sum_of_Quiz_mark || "-"}</td>
                                    <td className="table-td text-center">{sum_of_Assignment_mark || "-"}</td>
                                    <td className="table-td text-center">{(sum_of_Quiz_mark || 0) + (sum_of_Assignment_mark || 0)}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className="my-8">
                        <h3 className="text-lg font-bold">Top 20 Result</h3>
                        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                            <thead>
                                <tr className="border-b border-slate-600/50">
                                    <th className="table-th !text-center">Rank</th>
                                    <th className="table-th !text-center">Name</th>
                                    <th className="table-th !text-center">Quiz Mark</th>
                                    <th className="table-th !text-center">Assignment Mark</th>
                                    <th className="table-th !text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    newA.flatMap((dt, idx) => dt?.map((d, ix) => (
                                        <LeaderBoardCard key={d.id} data={d} rank={idx + 1} user={user} />
                                    )) || [])
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LeaderBorad