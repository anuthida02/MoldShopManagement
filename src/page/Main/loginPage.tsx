import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { login } from '../../store/loginSlice';
import { useForm } from 'react-hook-form';
import type { UserAuth } from '../../types/User.interface';
import { useNavigate } from 'react-router-dom';
import Logo_Daikin from '../../assets/image/Logo_Daikin.png'

function loginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<UserAuth>();
    const isLogin = useSelector((state: RootState) => state.login);
    const BASE = import.meta.env.VITE_BASE;
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLogin.isLogin == true) {
            navigate(`../${BASE}`)
        }
    }, [isLogin])

    const handleLogin = async (data: UserAuth) => {
        if (!data.username || !data.password) {
            setServerError('Please fill in both username and password');
            return;
        }

        setIsLoading(true);
        setServerError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.get(
                `http://websrv01.dci.daikin.co.jp/BudgetCharts/BudgetRestService/api/authen?username=${data.username}&password=${encodeURIComponent(data.password)}`
            );

            if (response.data[0]?.FullName) {
                dispatch(
                    login({
                        user: {
                            name: response.data[0].ShortName,
                            surn: response.data[0].FullName.substring(response.data[0].FullName.indexOf(' ')),
                            code: response.data[0].EmpCode,
                            fullname: response.data[0].FullName,
                            Dept: response.data[0].DEPT_Short,
                            Sect: response.data[0].SECT_Short,
                            position: response.data[0].Position
                        },
                    })
                );
                setSuccessMessage('Login successful!');
            } else {
                setServerError('ไม่พบผู้ใช้งานหรือรหัสผ่านผิดพลาด กรุณากรอกข้อมูลใหม่');
            }
        } catch (error) {
            setServerError('An error occurred during login. Please try again.');
            console.error('Login Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div
            className="min-h-screen flex justify-end bg-cover bg-center"
            style={{
                backgroundImage: "url('https://www.dci.co.th/upload/project/unit_28042023-095842-01.webp')"
            }}
        >
            <div className="bg-white bg-opacity-80 shadow-lg p-8 w-full min-h-screen max-w-md flex flex-col justify-between items-center">
                <div className="mt-8 w-full flex flex-col items-center">
                    <img src={Logo_Daikin} alt="Logo" className="my-10" />
                    <h2 className="text-3xl font-bold text-blue-900 my-4">MAINTERNANCE SYSTEM</h2>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">SIGN IN</h3>
                    <p className="mb-3 flex justify-center text-red-500 font-bold">
                        Username & Password login computer
                    </p>

                    <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register("username", { required: true })}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.username && (
                                <span className="text-red-500 text-sm">กรุณากรอก Username</span>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password", { required: true })}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">กรุณากรอก Password</span>
                            )}
                        </div>

                        {serverError && (
                            <div className="mb-2 text-red-600 text-center">{serverError}</div>
                        )}
                        {successMessage && (
                            <div className="mb-2 text-green-600 text-center">{successMessage}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>
                    </form>
                </div>
                <footer className="mt-6">
                    <p className="text-gray-600 text-sm text-center">
                        ©2025 Daikin Compressor Industries Ltd. | All rights reserved
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default loginPage