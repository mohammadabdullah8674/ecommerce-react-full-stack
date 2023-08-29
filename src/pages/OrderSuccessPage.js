import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/OrderSlice";

function OrderSuccessPage() {
    const user = useSelector(selectLoggedInUser)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(resetCartAsync(user.id))
        dispatch(resetOrder())


    }, [dispatch, user]);

    return (
        <>
            {!params.id && <Navigate to="/" replace={true}></Navigate>}

            <section class="bg-white dark:bg-gray-900 ">
                <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div class="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p class="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" fill="currentColor" /></svg>
                        </p>

                        <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Order Successfully Placed</h1>
                        <p class="mt-4 text-gray-500 dark:text-gray-400">Dear Customer Your order gets placed we will get back to you.... Thankyou!</p>
                        <p class="mt-2 font-bold text-blue-400 dark:text-gray-400">Your Order id is #{params.id}</p>

                        <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                            <button
                                onClick={() => navigate(-1)}
                                class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:rotate-180">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>


                                <span>Go back</span>
                            </button>

                            <Link to="/" class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                Take me home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>);
}

export default OrderSuccessPage;