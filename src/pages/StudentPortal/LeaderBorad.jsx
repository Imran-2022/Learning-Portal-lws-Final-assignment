import React from 'react'
import lwsL from '../../assets/image/learningportal.svg'
import StudentNav from '../../components/StudentNav';
import { useGetAssignmentMarksQuery } from '../../features/adminPortal/assignmentMarks/assignmentMarksApi'
import { useGetquizMarksQuery } from '../../features/adminPortal/quizMark/quizMarkApi'
import useUser from '../../hooks/useUser';

function LeaderBorad() {
    const user = useUser();
    const { data: userAssignmentMakrs } = useGetAssignmentMarksQuery();
    const { data: quizMark } = useGetquizMarksQuery();

    // const userAssignmentMakrs = assignmentMarks?.filter(dt => dt?.student_id == user.id)
    // const userQuizMarks = quizMark?.filter(dt => dt?.student_id == user.id)

    // console.log('assignmentMarks', userAssignmentMakrs);
    // console.log('quiz marks', userQuizMarks);

    
    const userMap = {};

    for (let i = 0; i < userAssignmentMakrs?.length; i++) {
        const user = userAssignmentMakrs[i];
        if (!userMap[user.student_id]) {
            userMap[user.student_id] = [];
        }
        userMap[user.student_id].push(user);
    }

    console.log(userMap);

    const userMapMark = {};

    for (let i = 0; i < quizMark?.length; i++) {
        const user = quizMark[i];
        if (!userMapMark[user.student_id]) {
            userMapMark[user.student_id] = [];
        }
        userMapMark[user.student_id].push(user);
    }

    console.log(userMapMark);

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