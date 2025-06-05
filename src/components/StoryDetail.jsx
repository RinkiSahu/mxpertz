import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function StoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://mxpertztestapi.onrender.com/api/sciencefiction`)
            .then((response) => {
                const selectedStory = response.data.find(item => item._id === id);
                setStory(selectedStory);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching story:", error);
                setLoading(false);
            });
    }, [id]);
    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Story Details</h1>
        {loading ? (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        ) : story ? (
            <>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Parent Image */}
                <div className="w-full md:w-1/3 flex justify-center">
                    {story.Image?.[0] && (
                          <div className="w-full flex flex-col items-center rounded-lg p-4 bg-gradient-to-r from-blue-600  to-blue-400">

                        <img key="" src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}  alt={story.Storyadvenure?.Storytitle}
                        className="rounded-lg shadow-lg w-full h-full object-cover" />
                        <h2 className="text-xl font-semibold text-center mb-3">{story.Storyadvenure?.Storytitle}</h2>
                        </div>
               )}
           </div>

           {/* Child Images in Cards */}
           <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {story.Storyadvenure?.content.map((item, index) => (
                   <div key={index} className="shadow-lg rounded-lg p-4 bg-gradient-to-r from-blue-600  to-blue-400">
                       {item.Storyimage?.length > 0 && (
                           <img src={`https://ik.imagekit.io/dev24/${item.Storyimage[0]}`}
                                alt="Story scene"
                                className="rounded-md w-full h-48 object-cover mb-3" />
                       )}
                       <div className="text-white-700">
                           {item.Paragraph?.map((para, idx) => (
                               <p key={idx} className="text-sm">{para}</p>
                           ))}
                       </div>
                   </div>
               ))}
           </div>


       </div>
       <button
       onClick={() => navigate(-1)}
       className=" text-white px-4 py-2 rounded-md mb-4 text-2xl">
       &lt;
   </button>
   </>
   ) : (
       <p className="text-center text-red-500">Story not found.</p>
   )}
</div>
   );
}

export default StoryDetail;