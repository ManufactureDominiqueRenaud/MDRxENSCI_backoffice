"use client";

import { client } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

//*------------------*//
//Get all users
//*------------------*//
export const useGetAllUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.users.getAll["$get"]();
      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return { data };
    },
  });
  return query;
};

//*------------------*//
//Get one user by id
//*------------------*//
export const useGetUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await client.api.users.getById[":userId"]["$get"]({
        param: {
          userId: id,
        },
      });
      console.log("response", response);
      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};

//*------------------*//
//Get all users by ids
//*------------------*//
type useGetUsersByIdsResponseType = InferResponseType<
  (typeof client.api.users.getByIds)["$post"]
>;
type useGetUsersByIdsRequestType = InferRequestType<
  (typeof client.api.users.getByIds)["$post"]
>["json"];
export const useGetUsersByIds = () => {
  const mutation = useMutation<
    useGetUsersByIdsResponseType,
    Error,
    useGetUsersByIdsRequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.users.getByIds["$post"]({ json });
      return await response.json();
    },
  });

  return mutation;
};
