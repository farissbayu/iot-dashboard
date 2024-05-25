/* eslint-disable react/prop-types */
import InfoIcon from "../icon/InfoIcon";
import EditIcon from "../icon/EditIcon";
import DeleteIcon from "../icon/DeleteIcon";

const buttonConfigs = [
  { type: "detail", background: "bg-secondary", icon: <InfoIcon /> },
  { type: "edit", background: "bg-buttonGreen", icon: <EditIcon /> },
  { type: "delete", background: "bg-buttonRed", icon: <DeleteIcon /> },
];

export default function IconButton({ buttonType, ...props }) {
  const buttonConfig =
    buttonConfigs.find((config) => config.type === buttonType) || {};

  return (
    <button
      className={`${
        buttonConfig.background || ""
      } p-1 rounded-lg opacity-80 hover:opacity-100`}
      {...props}
    >
      {buttonConfig.icon}
    </button>
  );
}
