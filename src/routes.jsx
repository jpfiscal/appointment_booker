import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import Services from "./Services";
import PersonalInfo from "./PersonalInfo";
import Appointments from "./Appointments";
import Availabilities from "./Availabilities";
import AppointmentConfirm from "./AppointmentConfirm";

function AppRoutes({ login, signup }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login login={login} signup={signup}/>} />
            <Route path="/signup" element={<SignUpForm signup={signup} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id/availability" element={<Availabilities />} />
            <Route path="/about" element={<SignUpForm signup={signup} />} />
            <Route path="/accountInfo" element={<PersonalInfo />} />
            <Route path="/appointments/history" element={<Appointments />} />
            <Route path="/appointment/confirm" element={<AppointmentConfirm />} />
        </Routes>
    )
}

export default AppRoutes;