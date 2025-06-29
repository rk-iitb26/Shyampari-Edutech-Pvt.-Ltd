import NavBar from "../Components/NavBar";

import LoginBox from "../Components/Hero";

function MainPage() {
    return(
         <div
        className="w-screen h-screen overflow-hidden ... bg-cover bg-center" style={{ backgroundImage: "url('/backg.jpg')" }}>
        <NavBar />
        <LoginBox />
    </div>
    )
}
export default MainPage;