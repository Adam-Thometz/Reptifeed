import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from "../home/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";

import Profile from "../user/Profile";
import EditUserForm from "../user/EditUserForm";
import Todos from "../user/Todos";

import Reptiles from "../reptile/Reptiles";
import NewReptileForm from "../reptile/NewReptileForm";
import EditReptileForm from "../reptile/EditReptileForm";
import Reptile from "../reptile/Reptile";

import Foods from "../food/Foods";
import Pantry from "../pantry/Pantry";

import AdminUsers from "../admin/AdminUsers";
import RequireAuth from "./RequireAuth";
import NotFound from "../common/NotFound";
import AdminReptiles from "../admin/AdminReptiles";

const ReptifeedRoutes = ({ login, register }) => {
  return (
    <div id="main">
      <Routes>
        {/* Home page */}
        <Route index element={<Home />} />

        {/***************/}
        {/* AUTH ROUTES */}
        {/***************/}

        {/* Login page */}
        <Route path="login" element={<Login login={login} />} />
        {/* Registration page */}
        <Route path="register" element={<Register register={register} />} />

        {/***************/}
        {/* MAIN ROUTES */}
        {/***************/}

        {/* PRIVATE ROUTE: Profile page */}
        <Route path="users/:id" element={<RequireAuth><Profile /></RequireAuth>} />
        {/* PRIVATE ROUTE: Edit profile */}
        <Route path="users/:id/edit" element={<RequireAuth><EditUserForm /></RequireAuth>} />
        {/* PRIVATE ROUTE: Todo list */}
        <Route path="users/:id/todos" element={<RequireAuth><Todos /></RequireAuth>} />

        {/******************/}
        {/* REPTILE ROUTES */}
        {/******************/}

        {/* PRIVATE ROUTE: View reptiles */}
        <Route path="users/:id/reptiles" element={<RequireAuth><Reptiles /></RequireAuth>} />
        {/* PRIVATE ROUTE: Add a new reptile */}
        <Route path="users/:id/reptiles/add" element={<RequireAuth><NewReptileForm /></RequireAuth>} />
        {/* PRIVATE ROUTE: View a specific reptile */}
        <Route path="users/:id/reptiles/:reptileId" element={<RequireAuth><Reptile /></RequireAuth>} />
        {/* PRIVATE ROUTE: Edit a specific reptile */}
        <Route path="users/:id/reptiles/:reptileId/edit" element={<RequireAuth><EditReptileForm /></RequireAuth>} />

        {/**********************/}
        {/* FOOD/PANTRY ROUTES */}
        {/**********************/}
        
        {/* View all available foods for reptiles */}
        <Route path="foods" element={<RequireAuth><Foods /></RequireAuth>} />
        {/* PRIVATE ROUTE: View pantry */}
        <Route path="users/:id/pantry" element={<RequireAuth><Pantry /></RequireAuth>} />

        {/****************/}
        {/* ADMIN ROUTES */}
        {/****************/}

        {/* ADMIN ONLY ROUTE: View all users on website */}
        <Route path="admin-users" element={<RequireAuth adminOnly><AdminUsers /></RequireAuth>} />
        {/* ADMIN ONLY ROUTE: View all reptiles on website */}
        <Route path="admin-reptiles" element={<RequireAuth adminOnly><AdminReptiles /></RequireAuth>} />

        {/* GENERAL 404 HANDLER */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default ReptifeedRoutes;