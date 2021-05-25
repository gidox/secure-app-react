const express = require("express");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
const checkScope = require("express-jwt-authz");
require("dotenv").config();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.REACT_APP_API_AUDENCIE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

const app = express();

app.use(jwtCheck);

app.get("/public", function (req, res) {
  res.json({
    message: "helloooo",
  });
});
app.get("/private", jwtCheck, function (req, res) {
  res.json({
    message: "private api resource",
  });
});
app.get(
  "/courses",
  jwtCheck,
  checkScope(["read:courses"]),
  function (req, res) {
    res.json({
      courses: [
        { id: 1, title: "Securing react aps" },
        { id: 2, title: "Reanimated 2" },
      ],
    });
  }
);
function checkRole(role) {
  return function (req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
}
app.get("/admin", jwtCheck, checkRole("admin"), function (req, res) {
  res.json({
    message: "hello from admin api resource",
  });
});
app.listen(3001);
console.log("API listening on ", process.env.REACT_APP_API_AUDENCIE);
