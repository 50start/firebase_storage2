import React from "react";
import { Stack, Image } from "@chakra-ui/react";

export const ImagePreview = (props) => {
  return (
    <Stack direction="row">
      <Image
        boxSize="180px"
        alt="プレビュー画像"
        src={props.path}
        border="solid 1px"
        onClick={() => props.delete(props.id)}
      />
    </Stack>
  );
};
