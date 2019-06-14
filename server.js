const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    //blog route renders the code inside index.js file
    server.get("/blog", (req, res) => app.render(req, res, "/"));

    //setting up the redirect to enforce users to go to blog
    server.get("/", (req, res) => res.redirect(301, "/blog"));

    //setup links for our blog posts
    server.get("/blog/:id", (req, res) => {
        return app.render(
            req,
            res,
            "/post",
            Object.assign({ id: req.param.id }, req.query)
        );
    });

    //config for handly call the post route if there id - redirect to blog post if no id redirect to home page
    server.get("/post", (req, res) => {
        if (req.query.id) return res.redirect(`/blog/${req.query.id}`);
        req.redirect(301, "/blog");
    });

    //we are handling any known request that are made to our server with *
    server.get("/*", (req, res) => handle(req, res));

    //we are listening to specified port and throw an error in case of it
    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Read on http://localhost:${port}`);
    });
});