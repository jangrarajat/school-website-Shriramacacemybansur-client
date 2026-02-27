import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {

    const nav = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {

        e.preventDefault()

        const res = await fetch(

            "https://school-website-shriramacacemybansur.onrender.com/admin/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,
                    password

                })

            }

        )

        const data = await res.json()


        if (data.success) {

            localStorage.setItem(

                "token",
                data.token

            )

            nav("/admin")

        } else {

            alert("Wrong Login")

        }

    }


    return (

        <div className="loginPage">

            <h1>

                Admin Login

            </h1>


            <form
                onSubmit={login}
                className="loginBox"
            >


                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button>

                    Login

                </button>


            </form>

        </div>

    )

}