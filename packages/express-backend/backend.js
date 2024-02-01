import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (id) => {
    users["users_list"] = users["users_list"].filter(user => user.id !== id);
};

app.use(cors());
app.use(express.json());

  


  
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    console.log(result);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    console.log(userToAdd);
    addUser(userToAdd);
    res.send();
});

app.delete("/users", (req, res) => {
    const userToRemove = req.body.id;
    console.log(userToRemove);
    deleteUser(userToRemove);
    res.send();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users?name=:name/:id", (req, res) => {
    console.log("Tryna get user by name and id\n");
    const name = req.query.name;
    const id = req.query.id;
    if (name != undefined && id != undefined) {
        result = users["users_list"].filter(user => user.name !== name);
        result = result.filter(user => user.id !== id);
        res.send(result);
    } else {
        res.send(users);
    }
});