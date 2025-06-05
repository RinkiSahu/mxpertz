import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cards() {
    const [stories, setStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const storiesPerPage = 9;
    const maxStories = 50;

    useEffect(() => {
        setLoading(true);
        axios.get("https://mxpertztestapi.onrender.com/api/sciencefiction")
            .then((response) => {
                // Extract necessary details from API response
                const extractedStories = response.data.map(story => ({
                    id: story._id,
                    title: story.Storyadvenure?.Storytitle || "Untitled",
                    image: story.Image?.[0] || story.Image?.[1] || "", // Use first image if available
                }));

                setStories(extractedStories.slice(0, maxStories)); // Limit to 100 stories
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching stories:", error);
                setLoading(false);
            });
    }, []);

    const totalPages = Math.ceil(stories.length / storiesPerPage);
    const displayedStories = stories.slice(currentPage * storiesPerPage, (currentPage + 1) * storiesPerPage);

    return (
        <div className="">
            <h1 className="mb-6 text-3xl font-bold text-center">Science Fiction Stories</h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {displayedStories.map((story) => (
                            <div key={story.id} className="card max-w-sm rounded-lg overflow-hidden shadow-lg p-3 bg-gradient-to-r from-blue-600  to-blue-300">
                                {story.image && <img src={`https://ik.imagekit.io/dev24/${story.image}`} alt={story.title} className="w-full" />}
                                <h2 className="font-bold text-xl mb-2">{story.title}</h2>
                                <Link to={`/story/${story.id}`} className="mt-3 outline-none focus-within:outline-none w-full rounded-full px-4 py-1 my-3 d-flex justify-center align-center flex text-blue-700" style={{ backgroundColor: '#fff',  borderRadius: '15px', display:'block' }}>View Details</Link>
                            </div>
                        ))}
                    </div>
                    <div className="pagination flex justify-between mt-4 w-full ">
                        <button style= {{backgroundColor: "transparent", outline :"none"}}   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                            Previous
                        </button>
                        <button style= {{backgroundColor: "transparent" ,outline :"none"}}  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cards;