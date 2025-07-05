import NavBar from "../Components/NavBar";
import SignupBox from "../Components/SignHero";

function SignupPage() {
  return (
    <div
      className="w-screen h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/backg.jpg')" }}
    >
      <NavBar />
      <SignupBox />
    </div>
  );
}

export default SignupPage;