import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "you are not authenticated"));
  }
  jwt.verify(token, process.env.jwt, (err, user) => {
    if (err) return next(createError(403, "token is not valid"));
    req.user = user;
    next();
  });
};

//verify user if user wants to delete its id
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized "));
    }
  });
};

//verify admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
