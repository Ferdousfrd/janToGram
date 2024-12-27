import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse } from "@/types";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import img1 from "@/assets/images/img1.jpg";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLikesOnPost } from "@/repository/post.service";

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likeInfo, setLikeInfo] = React.useState<{
    likes: number;
    isLike: boolean;
  }>({
    likes: data.likes,
    isLike: data.userLikes?.includes(user?.uid) ? true : false,
  });

  const updateLike = async (isVal: boolean) => {
    setLikeInfo({
      likes: isVal ? likeInfo.likes + 1 : likeInfo.likes - 1,
      isLike: !likeInfo.isLike,
    });
    if (isVal) {
      data.userLikes?.push(user!.uid);
    } else {
      data.userLikes?.splice(data.userLikes.indexOf(user!.uid), 1);
    }

    await updateLikesOnPost(
      data.id!,
      data.userLikes!,
      isVal ? likeInfo.likes + 1 : likeInfo.likes - 1
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex justify-start items-center">
          <span className="mr-2">
            <img
              src={img1}
              className="w-10 h-10 rounded-full border-slate-800 object-cover"
            />
          </span>
          <span>Guest user</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <img src={data.photos ? data.photos[0].cdnUrl : ""} />
      </CardContent>

      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likeInfo.isLike ? "fill-red-500" : "fill-none"
            )}
            onClick={() => updateLike(!likeInfo.isLike)}
          />
          <MessageCircle className="mr-3" />
        </div>
        <div className="w-full text-sm">{likeInfo.likes} likes</div>
        <div className="w-full text-sm">
          <span>Guest_user</span>: {data.caption}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
