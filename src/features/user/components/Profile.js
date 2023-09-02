import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserInfo, updateUserAsync } from '../userSlice'
import EditProfile from './EditProfile';

function Profile() {
    // TODO : we have to upload image url
    const profileImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

    const [editMode, setEditMode] = useState(false);
    const [indexValue, setIndexValue] = useState(null);   // yhan main (-1) leke karta to acchha hota 

    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    let name = "New User"
    let phone = 9999999999
    const email = user.email
    const address = user.address
    if (address.length) {
        name = user.address[0].fullName
        phone = user.address[0].phone
    }
    if(user.role=="admin"){
        name = "Admin"
    }

    function handleEdit(e,index){
        setIndexValue(index)
        setEditMode(true)
    }

    function handleRemove(e,index){
        const newUser = { ...user, address: [...user.address] }
        newUser.address.splice(index, 1)
        dispatch(updateUserAsync(newUser))
    }
    function handleIndex(index){
        setIndexValue(index)
    }

    return (
        <>
            {editMode &&
                <EditProfile
                    indexValue = {indexValue}
                    handleIndex={handleIndex}
                    editMode={editMode}
                    setEditMode={setEditMode} >
                </EditProfile>
            }

            {!editMode &&
                <div className='flex w-full justify-center items-center'>

                    <div className="w-1/2 pt-4  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                        <div className="flex flex-col items-center pt-6 pb-10">
                            <img className="w-28 h-28 mb-3 rounded-full shadow-lg" src={profileImage} alt="Bonnie image" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{phone}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                           { user.role=="admin" && <span className="text-sm text-red-500 font-bold dark:text-gray-400">Role : {user.role}</span> }
                            <hr class="h-px w-full my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                            {
                                address.length > 0 && <h5 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Your saved Addresses</h5>
                            }

                            {/* <ul role="list">
                                {address.map((address, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between mb-1 px-5 py-5 lg:w-full border-solid border-2 border-gray-200 sm:w-80 sm:px-1 sm:py-3"
                                    >
                                        <div className="flex mb-1 w-96  gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm text-left font-semibold leading-6 text-gray-900">
                                                    {address.fullName}
                                                </p>
                                                <p className="mt-1 truncate text-left text-xs leading-5 text-gray-500">
                                                    {address.street}
                                                </p>
                                                <p className="mt-1 truncate text-left text-xs leading-5 text-gray-500">
                                                    {address.postalcode}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">
                                                Phone: {address.phone}
                                            </p>
                                            <p className="text-sm leading-6 text-gray-500">
                                                {address.city}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul> */}

                            {address.map((address, index) => (
                                <div className="flex justify-between mb-1 gap-x-6 px-5 py-2 border-solid border-2 border-gray-200">
                                    <div className="flex gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {address.fullName}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {address.street}
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {address.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">
                                            Phone: {address.phone}
                                        </p>
                                        <p className="text-sm leading-6 text-gray-500">
                                            {address.city}
                                        </p>
                                    </div>
                                    <div className=" flex flex-col ml-4 items-center justify-end gap-x-6">
                                        <button
                                            type="button"
                                            onClick={(e) => handleRemove(e,index)}
                                            className="text-sm font-semibold leading-6 text-gray-700"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleEdit(e,index)}
                                            className="text-sm mt-2 text-blue-700 font-semibold leading-6 "
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>))}





                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Your Profile</button>
                            </div>
                        </div>
                    </div>

                </div>}
        </>
    )
}

export default Profile