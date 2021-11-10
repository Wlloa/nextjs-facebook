import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Person } from "../models/person";

export interface PersonDto extends Omit<Person, "id" | "password"> {}

interface IPersonContext {
  person: Person;
  fetchUser: () => void;
}

interface IProvider {
  children: ReactNode;
}

export const PersonContext = createContext<IPersonContext | null>(null);

export const PersonContextProvider = ({ children }: IProvider) => {
  const [person, setPerson] = useState(undefined);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!person && status === "authenticated") {
      fetchUser();
    }
  }, [person, session, status]);

  const fetchUser = async (): Promise<void> => {
    if (session) {
      const personData = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/person?email=${session?.user.email}`
      );
      const person = await personData.json();
      setPerson(person);
    }
  };

  const value: IPersonContext = {
    person,
    fetchUser,
  };

  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export const usePersonContext = (): IPersonContext => {
  return useContext(PersonContext);
};
