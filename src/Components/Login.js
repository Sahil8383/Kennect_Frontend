import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/Context";

export function Login() {

    const { setUserId } = useContext(UserContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        const response = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        localStorage.setItem("userId", data.userId);
        console.log(response.status);
        console.log(data);
        if(response.status === 200) {
            navigate("/");
        }
    }

    return (
        <>
            <div
                className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 px-4 sm:px-6 lg:px-8"
            >
                <Card className="w-96">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input 
                            label="Email" 
                            size="lg" 
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                        <Input 
                            label="Password" 
                            size="lg" 
                            type="password"
                            value={userInfo.password}
                            onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                        />
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth onClick={handleLogin}>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="/signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}