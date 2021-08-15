import React, { useState } from "react";
import "./App.css";
import { DownloadIcon } from "@chakra-ui/icons";
import { storage } from "./firebase/firebase";
import { Stack, Box } from "@chakra-ui/react";
import { ImagePreview } from "./components/image/ImagePreview";

function App() {
  const [images, setImages] = useState([]);

  const deleteImage = async (id) => {
    //id クリックされた画像のid
    const ret = window.confirm("この画像を削除しますか？");
    if (!ret) {
      return false;
    } else {
      const newImages = images.filter((image) => image.id !== id);
      //imagesは配列　filterメソッドを使って指定された画像以外を抽出するような条件が書いてある
      //idと一致しない画像だけを抽出する　それが配列newImagesに代入　setImage関数にて更新
      setImages(newImages);
      return storage.ref("images").child(id).delete(); //storageから削除
    }
  };

  const uploadImage = (event) => {
    //eventでfileの情報を受け取る
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg" }); //Blobオブジェクトに変換

    // Generate random 16 digits strings
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    const uploadRef = storage.ref("images").child(fileName);
    const uploadTask = uploadRef.put(blob); //作ったblobをputメソッドでアップロード
    uploadTask.then(() => {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //uploadが終わったらdownloadURLを取得してstateに渡す
        const newImage = { id: fileName, path: downloadURL }; //id: fileName=１６桁のURL
        setImages((prevState) => [...prevState, newImage]);
        //stateを更新　prevState=>配列やオブジェクトを更新するとき前回の値更新前のstateをprevStateという形で使うことができる
        //スプレット構文を使い新しく配列を生成しつつ前回の配列を展開しつつ　新しい配列の要素を追加した値をsetImagesに渡す　配列の更新がより便利にできる
      });
    });
  };

  return (
    <>
      <div>
        <Box fontSize={20}>画像をダウンロード</Box>
        <label>
          <DownloadIcon w={30} h={30} pl={10} />
          <input
            className="u-display-none"
            type="file"
            id="image"
            onChange={(event) => uploadImage(event)}
          />
        </label>
      </div>

      <Stack display="flex" direction="row" mt={30}>
        {images.length > 0 &&
          images.map((image) => (
            //オブジェクトの形のnewImage　id=>fileName(ランダム生成された16桁の文字列) path=>downloadURL
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </Stack>
    </>
  );
}

export default App;
