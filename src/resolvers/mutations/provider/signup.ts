import { validate } from "isemail";
import bcrypt from "bcrypt";

import { IContext } from "../../types";
import { ISignupProviderArgs } from "./types";
import { mailContent } from "../../../utils";
import { transport } from "../../../utils";

const messagingApi = require("@cmdotcom/text-sdk");

export const signupProviderMutation = async (
  _: any,
  signupProviderInput: ISignupProviderArgs,
  ctx: IContext
) => {
  const { fullName, phoneNumber } = signupProviderInput;

  let { email, password } = signupProviderInput;

  const cmMessageApi = new messagingApi.MessageApiClient(
    process.env.CM_SMS || ""
  );

  try {
    // is email empty
    if (!email || email.length < 1) {
      throw new Error("Email is required.");
    }

    // is email format correct and meets the minimu requirement
    if (!validate(email)) {
      throw new Error("Provided email is invalid.");
    }

    // password is empty
    if (!password) {
      throw new Error("Password is required");
    }

    // Password should be at least 5 charectors long.
    if (password.length < 5) {
      throw new Error("Password must be 5 charectors long.");
    }

    // Make email lower case and trim the white spaces.
    email = email.toLocaleLowerCase().trim();

    // Check if the user already exists.
    if (
      await ctx.prisma.provider.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new Error(
        "Service provider already exists, navigate to signing in."
      );
    }

    // Hash password before stored in the database.
    password = await bcrypt.hash(password, 10);

    // A service provider address is not required at signing up
    // but a service provider can update his/her address
    // hence why we create as blank on sign up.
    const address = await ctx.prisma.address.create({
      data: {},
    });

    const provider = await ctx.prisma.provider.create({
      data: {
        email,
        fullName,
        password,
        phoneNumber,
        addressId: address.id,
      },
    });

    const serviceProviderEmailMessage = `You recently signed up to Groomzy.<br />
			This email serves to confirm that your detailes were captured.<br />
		`;

    if (!provider) {
      throw new Error(
        "Something went wrong when signing up, please try again later."
      );
    }

    let providerSendEmailErrorMessage = "";

    const serviceProviderContentEmail = mailContent(
      provider.fullName,
      serviceProviderEmailMessage
    );

    try {
      const serviceProviderEmail = {
        from: "info@groomzy.co.za",
        html: serviceProviderContentEmail,
        subject: "Groomzy signup confirmation.",
        to: provider.email,
      };

      await transport.sendMail(serviceProviderEmail);
    } catch (e) {
      providerSendEmailErrorMessage = `We tried to send an email to ${email} but it failed.
			This may be due to an email provided not working.
			Please provide an active email address.

			The signing up was not complete!
			`;
    }

    let providerSendSMSErrorMessage = "";

    try {
      await cmMessageApi.sendTextMessage(
        [phoneNumber],
        "Groomzy",
        "Hello Groomzy!"
      );
    } catch (error) {
      providerSendSMSErrorMessage = `We tried to send an sms to ${phoneNumber} but it failed.
			This may be due to the phone number provided not working.
			Please provide an active phone number.

			The signing up was not complete!
			`;
    }

    if (
      providerSendEmailErrorMessage &&
      providerSendEmailErrorMessage.length > 0
    ) {
      await ctx.prisma.provider.delete({
        where: {
          email,
        },
      });

      throw new Error(providerSendEmailErrorMessage);
    }

    return {
      message: `All set. Now you can sign in using the credentials you provided sent to: ${provider.email}. Please check your spam folder if email not recieved and report it as "not spam".`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
