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

    const studentQuizMarks = []
    const studentAssignmentMarks = []

    const userMap = {};

    for (let i = 0; i < userAssignmentMakrs?.length; i++) {
        const user = userAssignmentMakrs[i];
        if (!userMap[user.student_id]) {
            userMap[user.student_id] = [];
        }
        userMap[user.student_id].push(user);
    }

    for (const property in userMap) {
        let sum = userMap[property].reduce(function (accumulator, curValue) {

            return accumulator + Number(curValue.mark)

        }, 0)

        studentQuizMarks.push({ id: userMap[property]?.[0].student_id, sum_of_Assignment_mark: sum })

    }

    const userMapMark = {};


    for (let i = 0; i < quizMark?.length; i++) {
        const user = quizMark[i];
        if (!userMapMark[user.student_id]) {
            userMapMark[user.student_id] = [];
        }
        userMapMark[user.student_id].push(user);
    }


    for (const property in userMapMark) {
        let sum = userMapMark[property].reduce(function (accumulator, curValue) {

            return accumulator + Number(curValue.mark)

        }, 0)

        studentAssignmentMarks.push({ id: userMapMark[property]?.[0].student_id, sum_of_Quiz_mark: sum })

    }


    //  work here ........ 

    const studentUsers = allUsers?.filter(dt => dt.role == 'student')
    // console.log("all students", studentUsers);
    // console.log("all Quiz Marks", studentQuizMarks);
    // console.log("all Assignments Marks", studentAssignmentMarks);


    const mergedArray = studentUsers?.map(obj1 => {
        const obj2 = studentQuizMarks.find(obj2 => obj2.id === obj1.id);
        const obj3 = studentAssignmentMarks.find(obj3 => obj3.id === obj1.id);
        return { ...obj1, ...obj2, ...obj3 };
    });
    const sortedArray = mergedArray?.sort((a, b) => (Number((b?.sum_of_Assignment_mark || 1)) + Number((b?.sum_of_Quiz_mark || 1))) - ((Number(a?.sum_of_Assignment_mark || 1)) + Number((a?.sum_of_Quiz_mark || 1)))).slice(0, 20);

    const mergedTotalArray = [];
    sortedArray?.forEach((item) => {
        const totalValue = (Number(item?.sum_of_Assignment_mark || 0)) + Number((item?.sum_of_Quiz_mark || 0));
        if (!mergedTotalArray[totalValue]) {
            mergedTotalArray[totalValue] = [item];
        } else {
            mergedTotalArray[totalValue].push(item);
        }
    });
    const newA=mergedTotalArray?.filter(Boolean).reverse();
    // console.log(newA);

    // only user Position - 

    const userBoard = sortedArray?.find(dt => dt.id == user?.id)
    const { name, sum_of_Quiz_mark, sum_of_Assignment_mark } = userBoard || {};
    // console.log(userBoard);

    // user rank

    let userRank = 0;
    newA?.map((dt, idx) => {
        return dt.map((d,ix)=>{
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
                                    newA?.map((dt, idx) => {
                                        return dt.map((d,ix)=>{
                                            return <LeaderBoardCard key={d.id} d={d} ix={idx + 1} user={user} />
                                        })
                                    })
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