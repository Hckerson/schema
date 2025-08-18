import LoginPage from "@/app/login/loginPage";

export const metadata = {
  title: "Login | FinAdvise Financial Services",
  description:
    "Login to your account to access your account information.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
export default async function Login(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;
  const error = searchParams.error;
  return (
    <>
      <LoginPage error={error as string} />
    </>
  );
}
