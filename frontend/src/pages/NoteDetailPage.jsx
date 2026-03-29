import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try{
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      }catch(error){
        console.log("Error fetching notes: ",error)
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }
          toast.error("Failed to Fetch note ")
        
      }finally{
        setLoading(false);
      }
    }
    fetchNotes();
  }, [id]);

  if(loading){
    return(
      <Loading/>
    )
  };

  return <div>NoteDetailPage</div>;
};

export default NoteDetailPage;