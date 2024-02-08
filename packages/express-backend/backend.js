import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;


const findUserByName = (name) => {
    return userServices.findUserByName(name);
};

const findUserById = (_id) =>
    userServices.findUserById(_id);

const findUserByJob = (job) =>
    userServices.findUserByJob(job);

const addUser = (user) => {
    console.log(user);
    if (user["_id"] == undefined){
        const _id = Math.random().toString();
        user._id = _id;
    }

    userServices.addUser(user);
    return user;
};

const deleteUser = (_id) => {
    userServices.deleteUser(_id);
};

app.use(cors());
app.use(express.json());

  


  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userServices.getUsers(name, job).then((result) => {
      res.send({users_list: result})
    }).catch((error) => {console.error(error); });

});

app.get("/users/:id", (req, res) => {
    const _id = req.params["id"]; //or req.params.id
    console.log(_id);
    userServices.findUserById(_id).then((result) => {
      res.send({users_list: result});
    }).catch((error) => {console.error(error); });
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    //userServices.addUser(userToAdd).then(res.status(201).send(res.body))
    //  .catch((error) => { console.log(error); });
      userServices.addUser(userToAdd).then((result) => {
        res.status(201).send(result.body);
      }).catch((error) => {console.error(error); });
});

app.delete("/users", (req, res) => {
    const userToRemove = req.body._id;
    userServices.deleteUser(userToRemove).then((result) => {
      res.status(204).send();
    }).catch((error) => {console.error(error); });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users?name:name&job=:job", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  console.log(req.query.name);
  console.log(req.query.job);
  userServices.getUsers(name, job).then((result) => {
    res.send({users_list: result})
  }).catch((error) => {console.error(error); });
});