import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from "../home/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
import EditUserForm from "../user/EditUserForm";
import Reptiles from "../reptile/Reptiles";
import NewReptileForm from "../reptile/NewReptileForm";

import Foods from "../food/Foods";
import Pantry from "../pantry/Pantry";
import NotFound from "../common/NotFound";
import Reptile from "../reptile/Reptile";
import EditReptileForm from "../reptile/EditReptileForm";
import RequireAuth from "./RequireAuth";

const ReptifeedRoutes = ({ login, register }) => {
  return (
    <div className="Routes">
      <Routes>
        {/* Home page */}
        <Route index element={<Home />} />

        {/***************/}
        {/* AUTH ROUTES */}
        {/***************/}

        {/* Login page */}
        <Route path="/login" element={<Login login={login} />} />
        {/* Registration page */}
        <Route path="/register" element={<Register register={register} />} />

        {/***************/}
        {/* USER ROUTES */}
        {/***************/}

        {/* PRIVATE ROUTE: Profile page */}
        <Route path="/users/:id" element={<RequireAuth><Profile /></RequireAuth>} />
        {/* PRIVATE ROUTE: Edit profile */}
        <Route path="/users/:id/edit" element={<RequireAuth><EditUserForm /></RequireAuth>} />

        {/******************/}
        {/* REPTILE ROUTES */}
        {/******************/}

        {/* PRIVATE ROUTE: View reptiles */}
        <Route path="/users/:id/reptiles" element={<RequireAuth><Reptiles /></RequireAuth>} />
        {/* PRIVATE ROUTE: Add a new reptile */}
        <Route path="/users/:id/reptiles/add" element={<RequireAuth><NewReptileForm /></RequireAuth>} />
        {/* PRIVATE ROUTE: View a specific reptile */}
        <Route path="/users/:id/reptiles/:reptileId" element={<RequireAuth><Reptile /></RequireAuth>} />
        {/* PRIVATE ROUTE: Edit a specific reptile */}
        <Route path="/users/:id/reptiles/:reptileId/edit" element={<RequireAuth><EditReptileForm /></RequireAuth>} />

        {/**********************/}
        {/* FOOD/PANTRY ROUTES */}
        {/**********************/}
        
        {/* PRIVATE ROUTE: View all available foods for reptiles */}
        <Route path="/foods" element={<Foods />} />
        {/* PRIVATE ROUTE: View pantry */}
        <Route path="/users/:id/pantry" element={<RequireAuth><Pantry /></RequireAuth>} />

        {/* GENERAL 404 HANDLER */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default ReptifeedRoutes;