import React, { useState } from 'react'
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

        studentQuizMarks.push({ name: userMap[property]?.[0].student_name, sum_of_Quiz_mark: sum })

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

        studentAssignmentMarks.push({ name: userMapMark[property]?.[0].student_name, sum_of_Assignment_mark: sum })

    }


    //  work here ........ 

    const studentUsers = allUsers?.filter(dt => dt.role == 'student')
    console.log("all students",studentUsers);
    console.log("all Quiz Marks",studentQuizMarks);
    console.log("all Assignments Marks",studentAssignmentMarks);


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
                                    <td className="table-td text-center font-bold">4</td>
                                    <td className="table-td text-center font-bold">Saad Hasan</td>
                                    <td className="table-td text-center font-bold">50</td>
                                    <td className="table-td text-center font-bold">50</td>
                                    <td className="table-td text-center font-bold">100</td>
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
                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-b border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>

                                <tr className="border-slate-600/50">
                                    <td className="table-td text-center">4</td>
                                    <td className="table-td text-center">Saad Hasan</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">50</td>
                                    <td className="table-td text-center">100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LeaderBorad