import { useState, useEffect } from "react";
import Title from "./subComponents/Title";

export default function ResetPassword() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {

    }, []);

    const resetPassword = (e) => {
        e.preventDefault();

        async function fetchUserByEmail() {
            const resp = await fetch("http://localhost/api/userByEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById("email").value
                }),
            });

            const data = await resp.json();

            if (!resp.ok) {
                setMessage(data.message || "User not found");
                return;
            }

            setUser(data);
            console.log(data);

            // ⚡ Enviar correo de recuperación
            const sendResp = await fetch("http://localhost/api/send-reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email
                }),
            });

            const sendData = await sendResp.json();

            if (!sendResp.ok) {
                setMessage(sendData.message || "Error sending email");
                return;
            }

            setMessage(sendData.message || "Correo de recuperación enviado");
        }

        fetchUserByEmail();
    };



    return (
        <div className="">
            <Title title="Reset Password" subtitle="Reset your account password" />

            <div className="flex justify-center " >
                <form className="min-w-100 min-h-100 bg-gray-100 p-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input className='w-full p-1 border border-gray-300 rounded' type="email" id="email" required />
                    </div>

                    <button type="submit" onClick={resetPassword} className="w-full bg-emerald-600 text-white p-2 rounded">Send Reset Link</button>
                </form>
            </div>
            <p>{message}</p>
        </div>
    );
}