import Auth from "../Auth/Auth";

type HomeProps = {
  auth: Auth
}
export default function Home({ auth }: HomeProps): React.ReactElement {
  return (
    <>
      <h1>Home Screen</h1>
      <button onClick={() => auth.login()}>Log me in!</button>
    </>
  );
}
