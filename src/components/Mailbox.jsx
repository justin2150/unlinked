// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { populateMail } from "../slices/idme";
// import { useState } from "react";
import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';

// const BASEURL = `http://127.0.0.1:3000`;
export default function Mailbox() {
  // const { mailbox, id } = useSelector((store) => store.idme);
  // const dispatch = useDispatch();
  // const { firstName } = user;
  // const password = "pass1234";
  // const domain = "kolawole.tech";

  // useEffect(function () {
  //   if (mailbox) return;
  //   async function createMailbox() {
  //     const res = await fetch(`${BASEURL}/api/v1/mailbox`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify({ id, firstName, password, domain }),
  //     });
  //     if (res.status !== 200) throw new Error("unhandled error occured");
  //     const { email } = await res.json();
  //     dispatch(populateMail(email));
  //   }
  //   createMailbox();
  // });
  return (
    <li>
      <Instruction>
        <StyledNum>1</StyledNum>
        <Text>
          <p>
            Click and open the link <a href="#">https://box.iirs.email/mail </a>
            in a new browser tab and login to your assigned mail account with
            the credentials below.
          </p>
          <p>
            <strong>Email: admin@iirs.email</strong>
          </p>
          <p>
            <strong>Password: Pass1234</strong>
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/mailbox-login.png'} />
    </li>
  );
}
