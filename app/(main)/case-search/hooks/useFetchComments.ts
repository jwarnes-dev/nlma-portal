'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import mockComments from "../mock/mock.comments.json"
import { Comment } from "@common/types"

interface UseFetchCommentsReturn {
  comments: Comment[] | null;
  loading: boolean;
  error: string | null;
  submitComment: (comment: Comment) => void;
}

// const commentsEndpoint = 'http://localhost:3030/case/c12345/comments'

function useFetchComments()  {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData =  async () => {
      try {
        setLoading(true);

        const fresponse: Comment[] = mockComments.sort( (a,b) => a.date < b.date ? 1 : -1)

        setComments(fresponse);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitComment = (comment: Comment): void => {
    setComments((prevComments) => [...(prevComments ?? []), comment]);
}

  return { comments, submitComment, setComments, loading, error };
}

export default useFetchComments;