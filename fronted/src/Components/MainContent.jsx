function MainContent() {
    return (
        <div className="absolute inset-0 flex items-center justify-start  p-4 sm:p-8 text-white"> {/* Centering content */}
            <div className="text-center sm:text-left max-w-sm sm:max-w-2xl w-full p-6 sm:p-8 bg-tr rounded-lg"> {/* Added a semi-transparent background for readability */}
                <h1 className="text-xl mt-10 p-10 sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Empowering Futures with Quality Education</h1>
                <p className="text-base sm:text-lg mb-6 sm:mb-8">
                    At Shampari Edutech, we bridge knowledge and innovation providing personalized learning solutions, expert mentorship, and real-world skills to help learners thrive in a digital-first world.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto">
                        Explore Courses
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto">
                        Join Now
                    </button>
                </div>
            </div>
        </div>
    )

}

export default MainContent