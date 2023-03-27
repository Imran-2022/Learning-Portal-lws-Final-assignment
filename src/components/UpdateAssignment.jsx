import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleAssignmentQuery, useUpdateAssignmentMutation } from '../features/adminPortal/assignments/assignmentApi';
import { useGetVideosQuery } from '../features/adminPortal/videos/videosApi';
import AdminNav from './AdminNav';
const UpdateAssignment = () => {
    const {updateAssignmentId}=useParams();
    // console.log(updateAssignmentId);
    const navigate = useNavigate()
    const { data: videos } = useGetVideosQuery();
    const {data:singleAssignment}=useGetSingleAssignmentQuery(updateAssignmentId)
    const [updateAssignment,{isSuccess}]=useUpdateAssignmentMutation();
    const [title, setTitle] = useState('')
    const [video_id, setVideo_id] = useState('')
    const [video_title, setVideo_title] = useState('')
    const [totalMark,setTotalMark]=useState('')

    const handleSelectChange=(dt)=>{
        const myObject = JSON.parse(dt);
        setVideo_id(myObject.id)
        setVideo_title(myObject.title)
    }
    const handleAddAssignment=(e)=>{
        e.preventDefault();
        const data={totalMark,video_id,video_title,title};
        updateAssignment({id:updateAssignmentId,data});
    }
    useEffect(()=>{
        // console.log(singleAssignment);
        setTitle(singleAssignment?.title)
        setTotalMark(singleAssignment?.totalMark)
        setVideo_title(singleAssignment?.video_title)
        setVideo_id(singleAssignment?.video_id)
    },[singleAssignment])

    useEffect(()=>{
        if(isSuccess) navigate('/dashboard/assignment')
    },[isSuccess])
    return (
        <div>   
            <AdminNav/>
            <form onSubmit={handleAddAssignment}>
                    <div className="border-b border-gray-900/10 pb-12 bg-white w-8/12 m-auto p-4 mt-16">
                        <div className=" grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-6 ">
                            <div className="sm:col-span-4">
                                <label htmlFor="assignment" className="block text-sm font-medium leading-6 text-gray-900">
                                    Assignment Title :
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={title||""}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                        id="assignment"
                                        name="assignment"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="video_title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Choose Video :
                                </label>
                                <div className="mt-2">
                                    <select
                                        required
                                        onChange={(e) => handleSelectChange(e.target.value)}
                                        id="video_title"
                                        name="video_title"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                    ><option selected hidden disabled  value={JSON.stringify({video_id,video_title})}>{video_title}</option>
                                        {
                                            videos && videos.map(dt => <option value={JSON.stringify(dt)} key={dt.id}>
                                                {dt.title}
                                            </option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="marks" className="block text-sm font-medium leading-6 text-gray-900">
                                   Total marks :
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={totalMark||""}
                                        onChange={e => setTotalMark(e.target.value)}
                                        required
                                        id="marks"
                                        name="marks"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="rounded-md text-black mt-5 w-full py-2 px-3 border"
                        >
                            Save
                        </button>
                    </div>
                </form>
        </div>
    );
};

export default UpdateAssignment;