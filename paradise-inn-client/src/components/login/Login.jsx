import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle, AiOutlineGithub } from "react-icons/ai";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Login = () => {

    const currLocation = useLocation();
    // console.log("Login Previous Location (state) ", currLocation.state);
    const { signIn, googleSignIn, githubSignIn, createUserMongoDB, setTitle } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setTitle("Login");
    }, [setTitle])

    const handlerLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);


        signIn(email, password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Login successful.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(currLocation?.state ? currLocation?.state : "/");
            })
            .catch(error => {
                if (error.code.toString() == "auth/invalid-login-credentials")
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "email or password doesn't match",
                        showConfirmButton: false,
                        timer: 1500
                    });

                else
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${error.code}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
            })
    }
    const handlerGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                createUserMongoDB();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Login successful.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(currLocation?.state ? currLocation?.state : "/");
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.code}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                // alert(error.message);
            })
    }

    const handlerGithubSignIn = () => {
        githubSignIn()
            .then(() => {
                createUserMongoDB();
                alert('login successful');
                navigate(currLocation?.state ? currLocation?.state : "/");
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.code}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (

        <div className="min-h-screen">
            <div
                className="hero max-md:min-h-screen carousel-item "
                style={{ backgroundImage: `url(https://cozystay.loftocean.com/island-resort/wp-content/uploads/sites/3/2023/03/img-74-3.jpg)` }}
            >
                <div className="hero-overlay bg-black bg-opacity-30"></div>
                <div className="hero-content w-full text-center text-neutral-content mt-24">
                    <div
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-80 my-28"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                    >
                        <form onSubmit={handlerLogin} className="card-body text-black">
                            <h1 className="text-5xl text-center mb-8 font-light ">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-outline font-light">Login</button>
                            </div>
                            <div className="form-control pt-4">
                                <div className="w-full space-y-2">
                                    <p className="text-center">log in with one of these options</p>
                                    <div className="flex justify-center text-3xl gap-4">
                                        <span onClick={handlerGoogleSignIn}>
                                            <AiFillGoogleCircle ></AiFillGoogleCircle>
                                        </span>
                                        <span onClick={handlerGithubSignIn}>
                                            <AiOutlineGithub ></AiOutlineGithub>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="form-control">
                                <label className="text-center">
                                    <div className="label-text-alt">
                                        {`Don't have an account? `}
                                        <Link state={currLocation?.state} to={"/register"} className="font-bold  link link-hover">Register</Link>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Login;