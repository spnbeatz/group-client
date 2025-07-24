import { RootState } from "@/state/store";
import { Panel, PanelLabel } from "../Panel";
import { Image } from "@heroui/image";
import { useSelector } from "react-redux";


export const ImageList = () => {
    const posts = useSelector((state: RootState) => state.post);
  
    return (
      <Panel>
        <PanelLabel label="Images" />
        <div className="grid grid-cols-3 gap-2">
          {posts.map((image, index) => {
            return image.content.attachments?.map((attachment, attachmentIndex) => (
              <div
                key={image.createdAt + "2131" + index + attachmentIndex}
                className="w-full aspect-square rounded-md overflow-hidden object-contain flex justify-center items-center"
              >
                <img
                  src={`https://cloud.appwrite.io/v1/storage/buckets/67d09acc002a190d5e59/files/${attachment.id}/view?project=67d09abf000b0d7f12a5`}
                  className="object-cover h-full"
                  alt="attachment"
                />
              </div>
            ));
          })}
        </div>
      </Panel>
    );
  };