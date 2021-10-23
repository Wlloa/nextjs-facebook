import { createContext, Dispatch, ReactNode, useState } from "react";
import { Person } from "../models/person";

export interface PersonDto extends Omit<Person, "id" | "password"> {}

interface IPersonContext {
  person: Person;
  setPerson: Dispatch<any>;
}

interface IProvider {
  children: ReactNode;
}

const contextInitialState: IPersonContext = {
  person: undefined,
  setPerson: undefined,
};

export const PersonContext = createContext<IPersonContext | null>(null);

export const PersonContextProvider = ({ children }: IProvider) => {
  const [person, setPerson] = useState(undefined);

  const value: IPersonContext = {
    person,
    setPerson,
  };

  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};
