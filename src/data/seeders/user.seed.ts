import { UserInterface } from "../../interfaces";

const userSeeds: Partial<UserInterface>[] = [
  {
    id:1,
    name:"usuario 1",
    email:"user1@mail.com",
    password:"1234567",
    role_id:4,
  },
  {
    id:2,
    name:"usuario 2",
    email:"user2@mail.com",
    password:"1234567",
    role_id:3,
  },
];

export{
    userSeeds
}
