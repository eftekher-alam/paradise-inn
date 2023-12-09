import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle, AiOutlineGithub } from "react-icons/ai";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const Register = () => {

    const { createUser, googleSignIn, githubSignIn, updateUserProfile, createUserMongoDB, setTitle } = useContext(AuthContext);
    const navigate = useNavigate();
    const currLocation = useLocation();


    // console.log("Previous location ", currLocation.state);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTitle("Home");
    }, [setTitle])

    const handlerRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photourl = e.target.photourl.value ? e.target.photourl.value : null;
        const email = e.target.email.value;
        const password = e.target.password.value;


        // validations
        if (password.length < 6) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Password can't be less than 6 characters",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        if (!(/[A-Z]/.test(password))) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Password doesn't have capital letter",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        if (!(/\W|_/g.test(password))) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Password doesn't have a special character",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photourl)
                    .then(() => {
                        createUserMongoDB();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: 'Account created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(currLocation?.state ? currLocation?.state : "/");
                        window.location.reload();
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

    const handlerGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                createUserMongoDB();
                alert('account created successfully');
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

    const handlerGithubSignIn = () => {
        githubSignIn()
            .then(() => {
                createUserMongoDB();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Account created successfully',
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
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white bg-opacity-90 my-28 text-black"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                    >
                        <form onSubmit={handlerRegister} className="card-body">
                            <h1 className="text-5xl  font-light mb-8 text-center">Register</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url (optional)</span>
                                </label>
                                <input type="text" name="photourl" placeholder="photo url" className="input input-bordered" />
                            </div>
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
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-outline font-light">Register</button>
                            </div>
                            <div className="form-control pt-4">
                                <div className="w-full space-y-2">
                                    <p className="text-center">or use one of these options</p>
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
                            <div className="form-control pt-4">
                                <label className="text-center">
                                    <div className="label-text-alt">
                                        {`Don't have an account? `}
                                        <Link to={"/login"} className="font-bold  link link-hover">Log In</Link>
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

export default Register;