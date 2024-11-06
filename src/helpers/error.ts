import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class CustomError extends Error {
  status: number = 500;
  message: string = "Internal Server Error";

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export function formatError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: error.issues[0].message },
      { status: 400 }
    );
  } else if (error instanceof CustomError) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
