const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const app = express();

const PORT =
  process.env.PORT || 3000;


/* ================= MIDDLEWARE ================= */

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);


/* ================= SESSION ================= */

app.use(
  session({

    secret:
      process.env.SESSION_SECRET ||
      "GROUP7-HUB-CHANGE-THIS-SECRET",

    resave: false,

    saveUninitialized: false,

    cookie: {

      httpOnly: true,

      sameSite: "lax",

      secure: false,

      maxAge:
        1000 *
        60 *
        60 *
        24 *
        7

    }

  })
);


/* ================= DATABASE ================= */

const db =
  new sqlite3.Database(
    "./group7.db"
  );


db.serialize(() => {

  db.run(`

    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      name TEXT NOT NULL,

      email TEXT NOT NULL UNIQUE,

      password_hash TEXT NOT NULL,

      registered_at
        DATETIME
        DEFAULT CURRENT_TIMESTAMP

    )

  `);

});


/* ================= FRONTEND ================= */

app.use(
  express.static(
    path.join(__dirname)
  )
);


/* ================= REGISTER ================= */

app.post(
  "/api/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;


      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill in every field."

        });

      }


      if (
        password.length < 6
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Password must be at least 6 characters."

        });

      }


      const cleanName =
        name.trim();

      const cleanEmail =
        email
          .trim()
          .toLowerCase();


      db.get(

        `
        SELECT id
        FROM users
        WHERE email = ?
        `,

        [cleanEmail],

        async (
          error,
          existingUser
        ) => {

          if (error) {

            console.error(error);

            return res.status(500).json({

              success: false,

              message:
                "Database error."

            });

          }


          if (existingUser) {

            return res.status(409).json({

              success: false,

              message:
                "That email is already registered."

            });

          }


          const passwordHash =
            await bcrypt.hash(
              password,
              12
            );


          db.run(

            `
            INSERT INTO users
            (name, email, password_hash)
            VALUES (?, ?, ?)
            `,

            [
              cleanName,
              cleanEmail,
              passwordHash
            ],

            function(error) {

              if (error) {

                console.error(error);

                return res.status(500).json({

                  success: false,

                  message:
                    "Registration failed."

                });

              }


              req.session.user = {

                id:
                  this.lastID,

                name:
                  cleanName,

                email:
                  cleanEmail

              };


              res.json({

                success: true,

                user:
                  req.session.user

              });

            }

          );

        }

      );

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Server error."

      });

    }

  }
);


/* ================= LOGIN ================= */

app.post(
  "/api/login",
  (req, res) => {

    const {
      email,
      password
    } = req.body;


    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter your email and password."

      });

    }


    const cleanEmail =
      email
        .trim()
        .toLowerCase();


    db.get(

      `
      SELECT *
      FROM users
      WHERE email = ?
      `,

      [cleanEmail],

      async (
        error,
        user
      ) => {

        if (error) {

          console.error(error);

          return res.status(500).json({

            success: false,

            message:
              "Database error."

          });

        }


        if (!user) {

          return res.status(401).json({

            success: false,

            message:
              "No account found with that email."

          });

        }


        const validPassword =
          await bcrypt.compare(
            password,
            user.password_hash
          );


        if (!validPassword) {

          return res.status(401).json({

            success: false,

            message:
              "Incorrect password."

          });

        }


        req.session.user = {

          id:
            user.id,

          name:
            user.name,

          email:
            user.email

        };


        res.json({

          success: true,

          user:
            req.session.user

        });

      }

    );

  }
);


/* ================= CURRENT USER ================= */

app.get(
  "/api/me",
  (req, res) => {

    if (!req.session.user) {

      return res.json({

        loggedIn: false

      });

    }


    res.json({

      loggedIn: true,

      user:
        req.session.user

    });

  }
);


/* ================= LOGOUT ================= */

app.post(
  "/api/logout",
  (req, res) => {

    req.session.destroy(
      error => {

        if (error) {

          console.error(error);

          return res.status(500).json({

            success: false,

            message:
              "Logout failed."

          });

        }


        res.clearCookie(
          "connect.sid"
        );


        res.json({

          success: true

        });

      }
    );

  }
);


/* ================= START ================= */

app.listen(
  PORT,
  () => {

    console.log(
      `GROUP 7 HUB running at http://localhost:${PORT}`
    );

  }
);
