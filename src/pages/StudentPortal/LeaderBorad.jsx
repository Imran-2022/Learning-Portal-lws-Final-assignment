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

        studentQuizMarks.push({ id: userMap[property]?.[0].student_id, sum_of_Quiz_mark: sum })

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

        studentAssignmentMarks.push({ id: userMapMark[property]?.[0].student_id, sum_of_Assignment_mark: sum })

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


    const sortedArray = mergedArray?.sort((a, b) => ((b?.sum_of_Assignment_mark || 1) * (b?.sum_of_Quiz_mark || 1)) - ((a?.sum_of_Assignment_mark || 1) * (a?.sum_of_Quiz_mark || 1))).slice(0, 5);;
    // console.log(sortedArray);


    // only user Position - 

    const userBoard = sortedArray?.find(dt => dt.id == user?.id)
    const {name,sum_of_Quiz_mark,sum_of_Assignment_mark}=userBoard||{};
    console.log(userBoard);

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
                                    <td className="table-td text-center">{userBoard?.idx||0}</td>
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
                                    sortedArray?.map((dt, idx) => {
                                        return <LeaderBoardCard key={dt.id} dt={dt} idx={idx + 1} />
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