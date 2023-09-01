import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';

function EditProfile({ editMode, setEditMode,indexValue, handleIndex,}) {
  const { register, setValue, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  // console.log(setValueIndex)

  useEffect(() => {
    if (indexValue!=null && indexValue >= 0) {
      console.log(indexValue)
      const info = user.address[indexValue]
      setValue('fullName', info.fullName)
      setValue('email', info.email)
      setValue('phone', info.phone)
      setValue('street', info.street)
      setValue('city', info.city)
      setValue('state', info.state)
      setValue('postalcode', info.postalcode)
    }
  }, [])
  return (
    <div className='flex w-screen justify-center items-center px-5' >

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1">
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit(data => {
              if (indexValue!=null && indexValue >= 0) {
                console.log(indexValue)
                const newUser = { ...user, address: [...user.address] }
                newUser.address[indexValue] = data
                dispatch(updateUserAsync(newUser))
                handleIndex(null)
                console.log(indexValue,  "Hiiiiiii")
              } else {
                dispatch(updateUserAsync({ ...user, address: [...user.address, data] }))
              }
              reset()
              setEditMode(false)
              console.log(user)
            })}
            className="bg-white px-10 py-12 mt-12">
            <div className="space-y-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Update Your Profile
              </h2>
              <div className="border-b border-t border-gray-900/10 pb-12">


                <div className="col-span-full mt-8">
                  <label htmlFor="photo" className="block text-left text-sm font-medium leading-6 text-gray-900">
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-left pt-2 text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                  </label>
                  <div className="mt-2 w-3/4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>



                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="first-name"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("fullName",
                          {
                            required: 'full name is required',
                          })}
                        id="full-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-left">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email",
                          {
                            required: 'email is required',
                          })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-left">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone",
                          {
                            required: 'phone number is required',
                          })} type='tel'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-left">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street",
                          {
                            required: 'street is required',
                          })} id="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.street && (
                      <p className="text-red-500 text-left">
                        {errors.street.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city",
                          {
                            required: 'city is required',
                          })}
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.city && (
                      <p className="text-red-500 text-left">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state",
                          {
                            required: 'state is required',
                          })}
                        id="region"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.state && (
                      <p className="text-red-500 text-left">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("postalcode",
                          {
                            required: 'postal code is required',
                          })}
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.postalcode && (
                      <p className="text-red-500 text-left">
                        {errors.postalcode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => { 
                    if(indexValue!=null && indexValue >= 0) {
                      handleIndex(null)
                    }
                    setEditMode(false)
                  }}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {(indexValue!=null && indexValue >= 0) ? "Update" : "Add Details"}
                  {/* Update */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default EditProfile