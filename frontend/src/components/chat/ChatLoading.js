import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      /*uniform fading of line */
      {/* <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/>
      <Skeleton height="25px" width="100%" fadeDuration={0.4 + i * 0.05}/> */}
      /*Dynamic fading of line */
      {Array.from({ length: 16 }).map((_, i) => (
        <Skeleton
          key={i}
          height="25px"
          width="100%"
          fadeDuration={0.4 + i * 0.05}
          startColor="gray.100"
          endColor="gray.300"
        />
      ))}
    </Stack>
  );
};

export default ChatLoading;
