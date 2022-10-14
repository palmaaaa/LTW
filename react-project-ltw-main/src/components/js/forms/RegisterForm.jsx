import React, {useState, useContext} from 'react';
import '../../css/forms/RegisterForm.css'
import logo from "../../../assets/img/logo.png";
import {pages} from "../../../enums/pages";
import {sendRequest} from "../../../scripts/serverInteraction";
import {views} from "../../../enums/views";
import WrongInputError from "../utility/WrongInputError";
import {PageContext} from "../../../context/context";

const RegisterForm = (props) => {
    const {page, setPage} = useContext(PageContext)

    const [formErrors, setFormErrors] = useState({});


    const handleLogIn = (e) => {
        setPage({page: pages.LOGIN});
    }


    const handleSubmit = (e) => {

        e.preventDefault();
        let error = {}
        let fieldValues = {}

        let username = document.getElementById("username").value;
        let name = document.getElementById("name").value;
        let surname = document.getElementById("surname").value;
        let birthDate = document.getElementById("birthDate").value;
        let sex = document.getElementById("gender").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;


        fieldValues["username"] = username;
        fieldValues["name"] = name;
        fieldValues["surname"] = surname;
        fieldValues["birthDate"] = birthDate;
        fieldValues["sex"] = sex;
        fieldValues["email"] = email;
        fieldValues["password"] = password;
        fieldValues["confirmPassword"] = confirmPassword;


        error["username"] = username.length < 4 ;
        error["name"] = name === "";
        error["surname"] = surname === "";
        error["birthDate"] = birthDate === "";
        error["sex"] = sex === "Gender...";
        error["email"] = !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        error["password"] = !password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
        error["confirmPassword"] = confirmPassword !== password;

        setFormErrors(error);

        let cantSend = error["username"] || error["name"] || error["surname"] || error["birthDate"] || error["sex"]
            || error["email"] || error["password"] || error["confirmPassword"];

        if (!cantSend) {
            sendRegistration(fieldValues).then();
        }
    };

    async function sendRegistration(form) {
        let registerObject = {
            ...form,
            request: "NEW_USER",
            state: "Stato Default",
            region: "Regione Default",
            province: "Provincia Default",
            city: "Cittá Default",
            street: "Via Default",
            houseNumber: "Civico default",
            cap: "0000",
        }

        let response = await sendRequest('POST', 'newrequest', registerObject);

        if (response.status < 300) {
            setPage({page: pages.LOGIN});
        }
    }

    return (
        <div className="container-fluid h-100 scrollable-content d-flex flex-column justify-content-center">
            <div className="row">
                <div className="col">
                    <div className="containter-fluid d-flex justify-content-center"
                         style={{marginTop: '1rem', marginBottom: '2rem'}}>
                        <h1><img src={logo} width={33} height={33}/> Waveshare
                            <p style={{fontSize: 'medium', marginTop: '10px'}}> Join our community in few steps! </p>
                        </h1>

                    </div>
                </div>
            </div>

            <form >
                <div className="row">
                    <div className="col">
                        <div className="container-fluid">
                            <form>
                                <div className="row waveshare-row mb-3">
                                    <div className="col-8 col-md-4">
                                        <div className="input-group mb-1">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                            <input type="text" className="form-control" placeholder="username"
                                                   id="username"/>
                                        </div>
                                        <WrongInputError vis={formErrors["username"]}
                                                         errorMessage={"Username must be at least 4 characters long"} />
                                    </div>
                                </div>


                                <div className="row waveshare-row">
                                    <div className="col-8  col-md-2 mb-3">
                                        <input type="text" className="form-control" name={"given-name"} id="name"
                                               placeholder="Name" autocomplete />
                                        <WrongInputError vis={formErrors["name"]} errorMessage={"Name can't be empty"} />
                                    </div>

                                    <div className="col-8 col-md-2">
                                        <input type="text" className="form-control" name={"family-name"} id="surname" placeholder="Surname"
                                               autocomplete />
                                        <WrongInputError vis={formErrors["surname"]} errorMessage={"Surname can't be empty"} />
                                    </div>

                                </div>

                                <div className="row waveshare-row mb-2">
                                    <div className="col-8 col-md-2 mb-3">
                                        <input type="date" className="form-control " id="birthDate"/>
                                        <WrongInputError vis={formErrors["birthDate"]} errorMessage={"Select a valid date"} />
                                    </div>


                                    <div className="col-8 col-md-2 ">
                                        <div className="input-group mb-1">
                                            <select className="form-select" id="gender" >
                                                <option >Gender...</option>
                                                <option >Female</option>
                                                <option >Male</option>
                                                <option >Other</option>
                                            </select>
                                        </div>
                                        <WrongInputError vis={formErrors["sex"]} errorMessage={"Select a Gender"} />
                                    </div>
                                </div>

                                <div className="row waveshare-row mb-3">
                                    <div className="col-8 col-md-4 ">
                                        <div className="input-group mb-1">
                                            <input type="text" className="form-control" placeholder="Your email"
                                                   id="email" />
                                            <span className="input-group-text">Email</span>
                                        </div>
                                        <WrongInputError vis={formErrors["email"]} errorMessage={"Insert a valid email"} />
                                    </div>
                                </div>

                                <div className="row waveshare-row mb-3">
                                    <div className="col-8 col-md-4 ">
                                        <div className="input-group mb-1">
                                            <input type="password" className="form-control" placeholder="Password"
                                                   id="password"/>
                                            <span className="input-group-text">Password</span>
                                        </div>
                                        <WrongInputError vis={formErrors["password"]}
                                                         errorMessage={"Password must contain 8 characters,"+
                                            "at least 1 number, 1 lower case letter, 1 uppercase letter and at least 1"+
                                            " special character"} />
                                    </div>
                                </div>

                                <div className="row waveshare-row mb-3">
                                    <div className="col-8 col-md-4 ">
                                        <div className="input-group mb-1">
                                            <input type="password" className="form-control"
                                                   placeholder="Confirm password" id="confirmPassword"/>
                                        </div>
                                        <WrongInputError vis={formErrors["confirmPassword"]}
                                                         errorMessage={"Passwords don't match"} />
                                    </div>
                                </div>
                            </form>

                            <div className="row waveshare-row">
                                <button type="submit" onClick={handleSubmit}
                                        className="btn btn-dark w-25 register-btn">Register
                                </button>
                            </div>
                            <p style={{display: 'flex', marginTop: '1rem', justifyContent: 'center'}}> You already have
                                an
                                account?
                                <button onClick={handleLogIn}
                                        style={{
                                            color: 'white',
                                            border: 'none',
                                            background: 'none',
                                            marginLeft: '0.5rem',
                                            fontWeight: '550'
                                        }}>
                                    Log in!</button></p>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
export default RegisterForm