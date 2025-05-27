import Form from "./Form";
import { ContextProvider } from "./ApiProvider";

const Home = () => {
  return (
    <ContextProvider>
      <Form />
    </ContextProvider>
  );
};

export default Home;
