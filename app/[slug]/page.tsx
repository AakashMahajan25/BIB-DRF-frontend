"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const updateVisits = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}url/all/shorts/${params?.slug}/update/`);
    } catch (error) {
      console.log(error);
    }
  };

  const getUrl = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}url/all/shorts/${params?.slug}/`);
      window.location.href = response?.data?.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateVisits();
    getUrl();
  }, [params]);

  if (loading) {
    return <div className="h-screen bg-black text-white flex justify-center item-center relative">
      <p className="absolute top-1/2 left-1/2 text-xl -translate-x-1/2">Redirecting...</p>
      </div>;
  }

  return null;
};

export default Page;