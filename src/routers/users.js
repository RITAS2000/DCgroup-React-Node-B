import { Router } from "express";
// import express from 'express';
import { getAllUsersController } from "../controllers/users.js";


export const usersRouter = Router();
// const jsonParser = express.json();

usersRouter.get('/', getAllUsersController);